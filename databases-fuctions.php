<?php
// Configuración de la base de datos
$host = 'localhost';
$dbname = 'talento_pinolero';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}

// Función para obtener todos los talentos
function obtenerTalentos($categoria = null) {
    global $pdo;
    
    if ($categoria && $categoria !== 'todos') {
        $stmt = $pdo->prepare("SELECT * FROM vista_talentos_activos WHERE categoria = ? ORDER BY fecha_registro DESC");
        $stmt->execute([$categoria]);
    } else {
        $stmt = $pdo->query("SELECT * FROM vista_talentos_activos ORDER BY fecha_registro DESC");
    }
    
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// Función para agregar un nuevo talento
function agregarTalento($datos) {
    global $pdo;
    
    $sql = "INSERT INTO talentos (nombre, edad, ciudad, categoria, descripcion, cursos, titulos, experiencia, contacto, foto) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $pdo->prepare($sql);
    
    return $stmt->execute([
        $datos['nombre'],
        $datos['edad'],
        $datos['ciudad'],
        $datos['categoria'],
        $datos['descripcion'],
        $datos['cursos'],
        $datos['titulos'],
        $datos['experiencia'],
        $datos['contacto'],
        $datos['foto']
    ]);
}

// Función para obtener un talento específico
function obtenerTalentoPorId($id) {
    global $pdo;
    
    $stmt = $pdo->prepare("SELECT * FROM vista_talentos_activos WHERE id = ?");
    $stmt->execute([$id]);
    
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

// Función para buscar talentos
function buscarTalentos($termino) {
    global $pdo;
    
    $sql = "SELECT * FROM vista_talentos_activos 
            WHERE nombre LIKE ? OR descripcion LIKE ? OR ciudad LIKE ?
            ORDER BY fecha_registro DESC";
    
    $stmt = $pdo->prepare($sql);
    $termino = "%$termino%";
    $stmt->execute([$termino, $termino, $termino]);
    
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// Función para obtener estadísticas
function obtenerEstadisticas() {
    global $pdo;
    
    $stats = [];
    
    // Total de talentos
    $stmt = $pdo->query("SELECT COUNT(*) as total FROM talentos WHERE activo = TRUE");
    $stats['total_talentos'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'];
    
    // Categoría más popular
    $stmt = $pdo->query("SELECT categoria, COUNT(*) as count FROM talentos WHERE activo = TRUE GROUP BY categoria ORDER BY count DESC LIMIT 1");
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $stats['categoria_popular'] = $result ? $result['categoria'] : 'N/A';
    
    // Ciudad más activa
    $stmt = $pdo->query("SELECT ciudad, COUNT(*) as count FROM talentos WHERE activo = TRUE GROUP BY ciudad ORDER BY count DESC LIMIT 1");
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $stats['ciudad_activa'] = $result ? $result['ciudad'] : 'N/A';
    
    return $stats;
}

// API endpoints
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action'])) {
    header('Content-Type: application/json');
    
    switch ($_GET['action']) {
        case 'obtener_talentos':
            $categoria = $_GET['categoria'] ?? null;
            echo json_encode(obtenerTalentos($categoria));
            break;
            
        case 'obtener_talento':
            $id = $_GET['id'] ?? null;
            if ($id) {
                echo json_encode(obtenerTalentoPorId($id));
            } else {
                echo json_encode(['error' => 'ID requerido']);
            }
            break;
            
        case 'buscar':
            $termino = $_GET['q'] ?? '';
            echo json_encode(buscarTalentos($termino));
            break;
            
        case 'estadisticas':
            echo json_encode(obtenerEstadisticas());
            break;
            
        default:
            echo json_encode(['error' => 'Acción no válida']);
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    header('Content-Type: application/json');
    
    if ($_POST['action'] === 'agregar_talento') {
        $resultado = agregarTalento($_POST);
        if ($resultado) {
            echo json_encode(['success' => true, 'message' => 'Talento agregado exitosamente']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al agregar talento']);
        }
    }
    exit;
}
?>
