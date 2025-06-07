-- Crear base de datos para Talento Pinolero
CREATE DATABASE IF NOT EXISTS talento_pinolero;
USE talento_pinolero;

-- Tabla principal de talentos
CREATE TABLE talentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    edad INT NOT NULL,
    ciudad VARCHAR(50) NOT NULL,
    categoria VARCHAR(30) NOT NULL,
    descripcion TEXT NOT NULL,
    cursos TEXT,
    titulos TEXT,
    experiencia VARCHAR(20),
    contacto VARCHAR(200),
    foto VARCHAR(500),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE
);

-- Tabla de categorías (opcional para normalización)
CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT,
    icono VARCHAR(50)
);

-- Insertar categorías predefinidas
INSERT INTO categorias (nombre, descripcion, icono) VALUES
('musica', 'Música y composición', 'fas fa-music'),
('arte', 'Arte y diseño visual', 'fas fa-palette'),
('tecnologia', 'Desarrollo y tecnología', 'fas fa-laptop-code'),
('educacion', 'Educación y enseñanza', 'fas fa-chalkboard-teacher'),
('deportes', 'Deportes y fitness', 'fas fa-running'),
('cocina', 'Gastronomía y cocina', 'fas fa-utensils'),
('artesania', 'Artesanías tradicionales', 'fas fa-hammer'),
('danza', 'Danza y baile', 'fas fa-music'),
('literatura', 'Literatura y escritura', 'fas fa-book'),
('fotografia', 'Fotografía y video', 'fas fa-camera');

-- Insertar datos de ejemplo
INSERT INTO talentos (nombre, edad, ciudad, categoria, descripcion, cursos, titulos, experiencia, contacto, foto) VALUES
('María Elena Gutiérrez', 28, 'Managua', 'musica', 
'Cantante y compositora especializada en música folclórica nicaragüense. He participado en festivales nacionales e internacionales.',
'Curso de Canto Lírico - Conservatorio Nacional, Taller de Composición Musical, Curso de Guitarra Clásica',
'Licenciatura en Música - UNAN Managua',
'5-10',
'maria.gutierrez@email.com | @MariaMusic',
'/placeholder.svg?height=150&width=150'),

('Carlos Alberto Mendoza', 35, 'León', 'arte',
'Pintor y muralista especializado en arte contemporáneo con temática social. Mis obras han sido expuestas en galerías de Centroamérica.',
'Taller de Pintura al Óleo, Curso de Arte Digital, Seminario de Historia del Arte Latinoamericano',
'Maestría en Artes Visuales - Universidad Nacional Autónoma de Nicaragua',
'10+',
'carlos.mendoza.art@gmail.com | Instagram: @CarlosArtNica',
'/placeholder.svg?height=150&width=150'),

('Ana Sofía Morales', 24, 'Granada', 'tecnologia',
'Desarrolladora Full Stack especializada en aplicaciones web modernas. Apasionada por crear soluciones tecnológicas para problemas locales.',
'Bootcamp de Desarrollo Web Full Stack, Certificación en React y Node.js, Curso de Bases de Datos',
'Ingeniería en Sistemas - UCA',
'3-5',
'ana.morales.dev@outlook.com | LinkedIn: Ana Sofía Morales',
'/placeholder.svg?height=150&width=150'),

('Roberto José Hernández', 42, 'Masaya', 'educacion',
'Profesor de matemáticas con metodologías innovadoras. He desarrollado programas educativos que han mejorado el rendimiento académico en escuelas rurales.',
'Diplomado en Pedagogía Moderna, Curso de Tecnología Educativa, Taller de Matemática Recreativa',
'Licenciatura en Matemáticas - UNAN León, Maestría en Educación',
'10+',
'roberto.hernandez.edu@yahoo.com',
'/placeholder.svg?height=150&width=150'),

('Gabriela Patricia Vega', 30, 'Chinandega', 'deportes',
'Entrenadora personal y especialista en fitness. Campeona nacional de atletismo y promotora del deporte femenino en Nicaragua.',
'Certificación Internacional de Entrenamiento Personal, Curso de Nutrición Deportiva, Taller de Primeros Auxilios',
'Licenciatura en Educación Física - UNAN Managua',
'5-10',
'gaby.fitness@gmail.com | @GabyFitNica',
'/placeholder.svg?height=150&width=150'),

('Luis Fernando Castillo', 38, 'Matagalpa', 'cocina',
'Chef especializado en cocina tradicional nicaragüense con toques modernos. Propietario de restaurante y promotor de la gastronomía local.',
'Curso de Alta Cocina Internacional, Taller de Repostería Artesanal, Seminario de Administración Gastronómica',
'Técnico Superior en Gastronomía - Instituto Gastronómico',
'10+',
'chef.castillo@restaurante.com | Facebook: Chef Luis Castillo',
'/placeholder.svg?height=150&width=150'),

('Carmen Lucía Flores', 26, 'Estelí', 'artesania',
'Artesana especializada en cerámica y alfarería tradicional. Mis piezas combinan técnicas ancestrales con diseños contemporáneos.',
'Taller de Cerámica Tradicional, Curso de Diseño Artesanal, Seminario de Comercialización de Artesanías',
'Técnico en Artes Aplicadas',
'3-5',
'carmen.ceramica@artesanos.org',
'/placeholder.svg?height=150&width=150'),

('Diego Alejandro Ruiz', 29, 'Jinotega', 'danza',
'Bailarín y coreógrafo especializado en danzas folclóricas nicaragüenses. Director de grupo de danza juvenil y promotor cultural.',
'Taller de Danza Contemporánea, Curso de Coreografía, Seminario de Danzas Tradicionales Centroamericanas',
'Licenciatura en Artes Escénicas',
'5-10',
'diego.danza@cultura.gob.ni | @DiegoDanzaNica',
'/placeholder.svg?height=150&width=150');

-- Tabla para estadísticas y métricas
CREATE TABLE estadisticas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    total_talentos INT DEFAULT 0,
    categoria_mas_popular VARCHAR(50),
    ciudad_mas_activa VARCHAR(50),
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insertar estadísticas iniciales
INSERT INTO estadisticas (total_talentos, categoria_mas_popular, ciudad_mas_activa) 
VALUES (8, 'musica', 'Managua');

-- Índices para mejorar rendimiento
CREATE INDEX idx_categoria ON talentos(categoria);
CREATE INDEX idx_ciudad ON talentos(ciudad);
CREATE INDEX idx_activo ON talentos(activo);
CREATE INDEX idx_fecha_registro ON talentos(fecha_registro);

-- Vista para consultas frecuentes
CREATE VIEW vista_talentos_activos AS
SELECT 
    t.id,
    t.nombre,
    t.edad,
    t.ciudad,
    t.categoria,
    c.nombre as categoria_nombre,
    t.descripcion,
    t.experiencia,
    t.contacto,
    t.foto,
    t.fecha_registro
FROM talentos t
JOIN categorias c ON t.categoria = c.nombre
WHERE t.activo = TRUE
ORDER BY t.fecha_registro DESC;
