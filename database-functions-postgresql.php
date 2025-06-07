<?php
/**
 * Funciones de base de datos para Talento Pinolero - PostgreSQL
 * 
 * Este archivo contiene todas las funciones necesarias para interactuar
 * con la base de datos PostgreSQL de la aplicación Talento Pinolero.
 */

// Configuración de la base de datos PostgreSQL
class DatabaseConfig {
    const HOST = 'localhost';
    const PORT = '5432';
    const DBNAME = 'talento_pinolero';
    const USERNAME = 'talento_user';
    const PASSWORD = 'tu_password_seguro';
    
    // Configuración de conexión
    const OPTIONS = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
        PDO::ATTR_PERSISTENT => true
    ];
}

class TalentoPinoleroDatabase {
    private static $instance = null;
    private $pdo;
    
    private function __construct() {
        try {
            $dsn = sprintf(
                "pgsql:host=%s;port=%s;dbname=%s;options='--client_encoding=UTF8'",
                DatabaseConfig::HOST,
                DatabaseConfig::PORT,
                DatabaseConfig::DBNAME
            );
            
            $this->pdo = new PDO($dsn, DatabaseConfig::USERNAME, DatabaseConfig::PASSWORD, DatabaseConfig::OPTIONS);
            
            // Configurar zona horaria
            $this->pdo->exec("SET timezone = 'America/Managua'");
            
        } catch(PDOException $e) {
            error_log("Error de conexión a PostgreSQL: " . $e->getMessage());
            throw new Exception("Error de conexión a la base de datos");
        }
    }
    
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    public function getConnection() {
        return $this->pdo;
    }
    
    // Prevenir clonación
    private function __clone() {}
    
    // Prevenir deserialización
    public function __wakeup() {
        throw new Exception("Cannot unserialize singleton");
    }
}

/**
 * Clase principal para manejo de talentos
 */
class TalentoManager {
    private $db;
    
    public function __construct() {
        $this->db = TalentoPinoleroDatabase::getInstance()->getConnection();
    }
    
    /**
     * Obtener todos los talentos con filtros opcionales
     */
    public function obtenerTalentos($categoria = null, $ciudad = null, $verificado = null, $limite = null, $offset = 0) {
        try {
            $sql = "SELECT * FROM vista_talentos_activos WHERE 1=1";
            $params = [];
            
            if ($categoria && $categoria !== 'todos') {
                $sql .= " AND categoria = :categoria";
                $params['categoria'] = $categoria;
            }
            
            if ($ciudad) {
                $sql .= " AND ciudad = :ciudad";
                $params['ciudad'] = $ciudad;
            }
            
            if ($verificado !== null) {
                $sql .= " AND verificado = :verificado";
                $params['verificado'] = $verificado;
            }
            
            $sql .= " ORDER BY fecha_registro DESC";
            
            if ($limite) {
                $sql .= " LIMIT :limite OFFSET :offset";
                $params['limite'] = $limite;
                $params['offset'] = $offset;
            }
            
            $stmt = $this->db->prepare($sql);
            
            // Bind de parámetros con tipos específicos
            foreach ($params as $key => $value) {
                if ($key === 'limite' || $key === 'offset') {
                    $stmt->bindValue(":$key", $value, PDO::PARAM_INT);
                } elseif ($key === 'verificado') {
                    $stmt->bindValue(":$key", $value, PDO::PARAM_BOOL);
                } else {
                    $stmt->bindValue(":$key", $value, PDO::PARAM_STR);
                }
            }
            
            $stmt->execute();
            return $stmt->fetchAll();
            
        } catch (PDOException $e) {
            error_log("Error al obtener talentos: " . $e->getMessage());
            throw new Exception("Error al obtener la lista de talentos");
        }
    }
    
    /**
     * Agregar un nuevo talento
     */
    public function agregarTalento($datos) {
        try {
            // Validar datos requeridos
            $camposRequeridos = ['nombre', 'edad', 'ciudad', 'categoria', 'descripcion'];
            foreach ($camposRequeridos as $campo) {
                if (empty($datos[$campo])) {
                    throw new Exception("El campo '$campo' es requerido");
                }
            }
            
            // Validar que la categoría existe
            if (!$this->categoriaExiste($datos['categoria'])) {
                throw new Exception("La categoría especificada no es válida");
            }
            
            // Validar que la ciudad existe
            if (!$this->ciudadExiste($datos['ciudad'])) {
                throw new Exception("La ciudad especificada no es válida");
            }
            
            $sql = "INSERT INTO talentos (nombre, edad, ciudad, categoria, descripcion, cursos, titulos, experiencia, contacto, foto) 
                    VALUES (:nombre, :edad, :ciudad, :categoria, :descripcion, :cursos, :titulos, :experiencia, :contacto, :foto)
                    RETURNING id, uuid";
            
            $stmt = $this->db->prepare($sql);
            
            $resultado = $stmt->execute([
                'nombre' => trim($datos['nombre']),
                'edad' => (int)$datos['edad'],
                'ciudad' => $datos['ciudad'],
                'categoria' => $datos['categoria'],
                'descripcion' => trim($datos['descripcion']),
                'cursos' => !empty($datos['cursos']) ? trim($datos['cursos']) : null,
                'titulos' => !empty($datos['titulos']) ? trim($datos['titulos']) : null,
                'experiencia' => !empty($datos['experiencia']) ? $datos['experiencia'] : null,
                'contacto' => !empty($datos['contacto']) ? trim($datos['contacto']) : null,
                'foto' => !empty($datos['foto']) ? $datos['foto'] : null
            ]);
            
            if ($resultado) {
                $nuevoTalento = $stmt->fetch();
                return [
                    'success' => true,
                    'id' => $nuevoTalento['id'],
                    'uuid' => $nuevoTalento['uuid'],
                    'message' => 'Talento agregado exitosamente'
                ];
            }
            
            return ['success' => false, 'message' => 'Error al agregar el talento'];
            
        } catch (PDOException $e) {
            error_log("Error al agregar talento: " . $e->getMessage());
            throw new Exception("Error al guardar el talento en la base de datos");
        }
    }
    
    /**
     * Obtener un talento específico por ID o UUID
     */
    public function obtenerTalentoPorId($identificador) {
        try {
            // Determinar si es UUID o ID numérico
            $campo = is_numeric($identificador) ? 'id' : 'uuid';
            
            $sql = "SELECT * FROM vista_talentos_activos WHERE $campo = :identificador";
            $stmt = $this->db->prepare($sql);
            $stmt->execute(['identificador' => $identificador]);
            
            return $stmt->fetch();
            
        } catch (PDOException $e) {
            error_log("Error al obtener talento: " . $e->getMessage());
            throw new Exception("Error al obtener la información del talento");
        }
    }
    
    /**
     * Buscar talentos usando búsqueda de texto completo
     */
    public function buscarTalentos($termino, $limite = 20) {
        try {
            if (empty(trim($termino))) {
                return [];
            }
            
            $sql = "SELECT * FROM buscar_talentos(:termino) LIMIT :limite";
            $stmt = $this->db->prepare($sql);
            $stmt->bindValue(':termino', trim($termino), PDO::PARAM_STR);
            $stmt->bindValue(':limite', $limite, PDO::PARAM_INT);
            $stmt->execute();
            
            return $stmt->fetchAll();
            
        } catch (PDOException $e) {
            error_log("Error en búsqueda: " . $e->getMessage());
            throw new Exception("Error al realizar la búsqueda");
        }
    }
    
    /**
     * Actualizar un talento existente
     */
    public function actualizarTalento($id, $datos) {
        try {
            // Verificar que el talento existe
            $talentoExistente = $this->obtenerTalentoPorId($id);
            if (!$talentoExistente) {
                throw new Exception("El talento especificado no existe");
            }
            
            $camposActualizables = ['nombre', 'edad', 'ciudad', 'categoria', 'descripcion', 'cursos', 'titulos', 'experiencia', 'contacto', 'foto'];
            $setClause = [];
            $params = ['id' => $id];
            
            foreach ($camposActualizables as $campo) {
                if (isset($datos[$campo])) {
                    $setClause[] = "$campo = :$campo";
                    $params[$campo] = $datos[$campo];
                }
            }
            
            if (empty($setClause)) {
                throw new Exception("No hay campos para actualizar");
            }
            
            $sql = "UPDATE talentos SET " . implode(', ', $setClause) . " WHERE id = :id";
            $stmt = $this->db->prepare($sql);
            
            return $stmt->execute($params);
            
        } catch (PDOException $e) {
            error_log("Error al actualizar talento: " . $e->getMessage());
            throw new Exception("Error al actualizar el talento");
        }
    }
    
    /**
     * Eliminar (desactivar) un talento
     */
    public function eliminarTalento($id) {
        try {
            $sql = "UPDATE talentos SET activo = FALSE WHERE id = :id";
            $stmt = $this->db->prepare($sql);
            return $stmt->execute(['id' => $id]);
            
        } catch (PDOException $e) {
            error_log("Error al eliminar talento: " . $e->getMessage());
            throw new Exception("Error al eliminar el talento");
        }
    }
    
    /**
     * Verificar si una categoría existe
     */
    private function categoriaExiste($categoria) {
        $sql = "SELECT COUNT(*) FROM categorias WHERE nombre = :categoria AND activa = TRUE";
        $stmt = $this->db->prepare($sql);
        $stmt->execute(['categoria' => $categoria]);
        return $stmt->fetchColumn() > 0;
    }
    
    /**
     * Verificar si una ciudad existe
     */
    private function ciudadExiste($ciudad) {
        $sql = "SELECT COUNT(*) FROM ciudades WHERE nombre = :ciudad AND activa = TRUE";
        $stmt = $this->db->prepare($sql);
        $stmt->execute(['ciudad' => $ciudad]);
        return $stmt->fetchColumn() > 0;
    }
    
    /**
     * Obtener todas las categorías disponibles
     */
    public function obtenerCategorias() {
        try {
            $sql = "SELECT * FROM categorias WHERE activa = TRUE ORDER BY nombre";
            $stmt = $this->db->query($sql);
            return $stmt->fetchAll();
            
        } catch (PDOException $e) {
            error_log("Error al obtener categorías: " . $e->getMessage());
            throw new Exception("Error al obtener las categorías");
        }
    }
    
    /**
     * Obtener todas las ciudades disponibles
     */
    public function obtenerCiudades() {
        try {
            $sql = "SELECT * FROM ciudades WHERE activa = TRUE ORDER BY departamento, nombre";
            $stmt = $this->db->query($sql);
            return $stmt->fetchAll();
            
        } catch (PDOException $e) {
            error_log("Error al obtener ciudades: " . $e->getMessage());
            throw new Exception("Error al obtener las ciudades");
        }
    }
    
    /**
     * Obtener estadísticas generales
     */
    public function obtenerEstadisticas() {
        try {
            $stats = [];
            
            // Estadísticas básicas
            $sql = "SELECT * FROM estadisticas ORDER BY fecha_actualizacion DESC LIMIT 1";
            $stmt = $this->db->query($sql);
            $statsBasicas = $stmt->fetch();
            
            if ($statsBasicas) {
                $stats = $statsBasicas;
            }
            
            // Estadísticas por categoría
            $sql = "SELECT c.nombre, c.descripcion, c.icono, c.color, COUNT(t.id) as total
                    FROM categorias c
                    LEFT JOIN talentos t ON c.nombre = t.categoria AND t.activo = TRUE
                    WHERE c.activa = TRUE
                    GROUP BY c.nombre, c.descripcion, c.icono, c.color
                    ORDER BY total DESC";
            $stmt = $this->db->query($sql);
            $stats['por_categoria'] = $stmt->fetchAll();
            
            // Estadísticas por ciudad
            $sql = "SELECT ciudad, COUNT(*) as total
                    FROM talentos
                    WHERE activo = TRUE
                    GROUP BY ciudad
                    ORDER BY total DESC
                    LIMIT 10";
            $stmt = $this->db->query($sql);
            $stats['por_ciudad'] = $stmt->fetchAll();
            
            // Estadísticas por región
            $sql = "SELECT c.region, COUNT(t.id) as total
                    FROM ciudades c
                    LEFT JOIN talentos t ON c.nombre = t.ciudad AND t.activo = TRUE
                    WHERE c.activa = TRUE
                    GROUP BY c.region
                    ORDER BY total DESC";
            $stmt = $this->db->query($sql);
            $stats['por_region'] = $stmt->fetchAll();
            
            return $stats;
            
        } catch (PDOException $e) {
            error_log("Error al obtener estadísticas: " . $e->getMessage());
            throw new Exception("Error al obtener las estadísticas");
        }
    }
    
    /**
     * Contar total de talentos con filtros
     */
    public function contarTalentos($categoria = null, $ciudad = null, $verificado = null) {
        try {
            $sql = "SELECT COUNT(*) FROM talentos WHERE activo = TRUE";
            $params = [];
            
            if ($categoria && $categoria !== 'todos') {
                $sql .= " AND categoria = :categoria";
                $params['categoria'] = $categoria;
            }
            
            if ($ciudad) {
                $sql .= " AND ciudad = :ciudad";
                $params['ciudad'] = $ciudad;
            }
            
            if ($verificado !== null) {
                $sql .= " AND verificado = :verificado";
                $params['verificado'] = $verificado;
            }
            
            $stmt = $this->db->prepare($sql);
            $stmt->execute($params);
            
            return (int)$stmt->fetchColumn();
            
        } catch (PDOException $e) {
            error_log("Error al contar talentos: " . $e->getMessage());
            throw new Exception("Error al contar los talentos");
        }
    }
}

// Funciones de utilidad para la API
function respuestaJSON($data, $codigo = 200) {
    http_response_code($codigo);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

function manejarError($mensaje, $codigo = 500) {
    error_log("Error en API: $mensaje");
    respuestaJSON(['error' => $mensaje, 'codigo' => $codigo], $codigo);
}

// API Endpoints
try {
    $talentoManager = new TalentoManager();
    
    // Manejar solicitudes GET
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $accion = $_GET['action'] ?? '';
        
        switch ($accion) {
            case 'obtener_talentos':
                $categoria = $_GET['categoria'] ?? null;
                $ciudad = $_GET['ciudad'] ?? null;
                $verificado = isset($_GET['verificado']) ? filter_var($_GET['verificado'], FILTER_VALIDATE_BOOLEAN) : null;
                $limite = isset($_GET['limite']) ? (int)$_GET['limite'] : null;
                $offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;
                
                $talentos = $talentoManager->obtenerTalentos($categoria, $ciudad, $verificado, $limite, $offset);
                $total = $talentoManager->contarTalentos($categoria, $ciudad, $verificado);
                
                respuestaJSON([
                    'talentos' => $talentos,
                    'total' => $total,
                    'limite' => $limite,
                    'offset' => $offset
                ]);
                break;
                
            case 'obtener_talento':
                $id = $_GET['id'] ?? null;
                if (!$id) {
                    manejarError('ID requerido', 400);
                }
                
                $talento = $talentoManager->obtenerTalentoPorId($id);
                if (!$talento) {
                    manejarError('Talento no encontrado', 404);
                }
                
                respuestaJSON($talento);
                break;
                
            case 'buscar':
                $termino = $_GET['q'] ?? '';
                $limite = isset($_GET['limite']) ? (int)$_GET['limite'] : 20;
                
                $resultados = $talentoManager->buscarTalentos($termino, $limite);
                respuestaJSON($resultados);
                break;
                
            case 'categorias':
                $categorias = $talentoManager->obtenerCategorias();
                respuestaJSON($categorias);
                break;
                
            case 'ciudades':
                $ciudades = $talentoManager->obtenerCiudades();
                respuestaJSON($ciudades);
                break;
                
            case 'estadisticas':
                $estadisticas = $talentoManager->obtenerEstadisticas();
                respuestaJSON($estadisticas);
                break;
                
            default:
                manejarError('Acción no válida', 400);
        }
    }
    
    // Manejar solicitudes POST
    elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $accion = $_POST['action'] ?? '';
        
        switch ($accion) {
            case 'agregar_talento':
                $resultado = $talentoManager->agregarTalento($_POST);
                respuestaJSON($resultado);
                break;
                
            case 'actualizar_talento':
                $id = $_POST['id'] ?? null;
                if (!$id) {
                    manejarError('ID requerido', 400);
                }
                
                $resultado = $talentoManager->actualizarTalento($id, $_POST);
                respuestaJSON(['success' => $resultado, 'message' => 'Talento actualizado exitosamente']);
                break;
                
            default:
                manejarError('Acción no válida', 400);
        }
    }
    
    // Manejar solicitudes DELETE
    elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        parse_str(file_get_contents("php://input"), $data);
        $id = $data['id'] ?? null;
        
        if (!$id) {
            manejarError('ID requerido', 400);
        }
        
        $resultado = $talentoManager->eliminarTalento($id);
        respuestaJSON(['success' => $resultado, 'message' => 'Talento eliminado exitosamente']);
    }
    
    else {
        manejarError('Método no permitido', 405);
    }
    
} catch (Exception $e) {
    manejarError($e->getMessage());
}
?>
