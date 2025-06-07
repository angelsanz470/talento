-- Crear base de datos para Talento Pinolero en PostgreSQL
-- Ejecutar como superusuario primero:
-- CREATE DATABASE talento_pinolero;
-- CREATE USER talento_user WITH PASSWORD 'tu_password_seguro';
-- GRANT ALL PRIVILEGES ON DATABASE talento_pinolero TO talento_user;

-- Conectar a la base de datos talento_pinolero
\c talento_pinolero;

-- Crear extensiones útiles
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- Tabla principal de talentos
CREATE TABLE talentos (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    edad INTEGER NOT NULL CHECK (edad >= 15 AND edad <= 100),
    ciudad VARCHAR(50) NOT NULL,
    categoria VARCHAR(30) NOT NULL,
    descripcion TEXT NOT NULL,
    cursos TEXT,
    titulos TEXT,
    experiencia VARCHAR(20),
    contacto VARCHAR(200),
    foto VARCHAR(500),
    fecha_registro TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE,
    verificado BOOLEAN DEFAULT FALSE
);

-- Tabla de categorías (para normalización y control)
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT,
    icono VARCHAR(50),
    color VARCHAR(7), -- Para códigos de color hex
    activa BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de ciudades nicaragüenses
CREATE TABLE ciudades (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    departamento VARCHAR(50) NOT NULL,
    region VARCHAR(30),
    activa BOOLEAN DEFAULT TRUE
);

-- Tabla de estadísticas y métricas
CREATE TABLE estadisticas (
    id SERIAL PRIMARY KEY,
    total_talentos INTEGER DEFAULT 0,
    categoria_mas_popular VARCHAR(50),
    ciudad_mas_activa VARCHAR(50),
    fecha_actualizacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de logs para auditoría
CREATE TABLE logs_actividad (
    id SERIAL PRIMARY KEY,
    tabla_afectada VARCHAR(50),
    accion VARCHAR(20), -- INSERT, UPDATE, DELETE
    registro_id INTEGER,
    datos_anteriores JSONB,
    datos_nuevos JSONB,
    usuario_ip INET,
    fecha_accion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insertar categorías predefinidas
INSERT INTO categorias (nombre, descripcion, icono, color) VALUES
('musica', 'Música y composición musical', 'fas fa-music', '#FF6B6B'),
('arte', 'Arte visual y diseño gráfico', 'fas fa-palette', '#4ECDC4'),
('tecnologia', 'Desarrollo de software y tecnología', 'fas fa-laptop-code', '#45B7D1'),
('educacion', 'Educación y enseñanza', 'fas fa-chalkboard-teacher', '#96CEB4'),
('deportes', 'Deportes y actividad física', 'fas fa-running', '#FFEAA7'),
('cocina', 'Gastronomía y artes culinarias', 'fas fa-utensils', '#DDA0DD'),
('artesania', 'Artesanías y trabajos manuales', 'fas fa-hammer', '#98D8C8'),
('danza', 'Danza y expresión corporal', 'fas fa-theater-masks', '#F7DC6F'),
('literatura', 'Literatura y escritura creativa', 'fas fa-book', '#BB8FCE'),
('fotografia', 'Fotografía y artes visuales', 'fas fa-camera', '#85C1E9');

-- Insertar ciudades nicaragüenses
INSERT INTO ciudades (nombre, departamento, region) VALUES
-- Región Pacífico
('Managua', 'Managua', 'Pacífico'),
('León', 'León', 'Pacífico'),
('Granada', 'Granada', 'Pacífico'),
('Masaya', 'Masaya', 'Pacífico'),
('Chinandega', 'Chinandega', 'Pacífico'),
('Rivas', 'Rivas', 'Pacífico'),
('Carazo', 'Carazo', 'Pacífico'),
-- Región Central
('Matagalpa', 'Matagalpa', 'Central'),
('Estelí', 'Estelí', 'Central'),
('Jinotega', 'Jinotega', 'Central'),
('Nueva Segovia', 'Nueva Segovia', 'Central'),
('Madriz', 'Madriz', 'Central'),
('Boaco', 'Boaco', 'Central'),
('Chontales', 'Chontales', 'Central'),
-- Región Atlántico
('Bluefields', 'RACCS', 'Atlántico'),
('Puerto Cabezas', 'RACCN', 'Atlántico'),
-- Región Sur
('San Carlos', 'Río San Juan', 'Sur');

-- Insertar datos de ejemplo
INSERT INTO talentos (nombre, edad, ciudad, categoria, descripcion, cursos, titulos, experiencia, contacto, foto, verificado) VALUES
('María Elena Gutiérrez', 28, 'Managua', 'musica', 
'Cantante y compositora especializada en música folclórica nicaragüense. He participado en festivales nacionales e internacionales representando la cultura de nuestro país.',
'Curso de Canto Lírico - Conservatorio Nacional, Taller de Composición Musical, Curso de Guitarra Clásica, Seminario de Música Tradicional Centroamericana',
'Licenciatura en Música - UNAN Managua, Diplomado en Etnomusicología',
'5-10',
'maria.gutierrez@email.com | @MariaMusic | Tel: 8888-1234',
'/placeholder.svg?height=150&width=150',
true),

('Carlos Alberto Mendoza', 35, 'León', 'arte',
'Pintor y muralista especializado en arte contemporáneo con temática social. Mis obras han sido expuestas en galerías de Centroamérica y reflejan la realidad nicaragüense.',
'Taller de Pintura al Óleo, Curso de Arte Digital, Seminario de Historia del Arte Latinoamericano, Workshop de Muralismo Urbano',
'Maestría en Artes Visuales - Universidad Nacional Autónoma de Nicaragua, Licenciatura en Bellas Artes',
'10+',
'carlos.mendoza.art@gmail.com | Instagram: @CarlosArtNica | Facebook: Carlos Mendoza Arte',
'/placeholder.svg?height=150&width=150',
true),

('Ana Sofía Morales', 24, 'Granada', 'tecnologia',
'Desarrolladora Full Stack especializada en aplicaciones web modernas. Apasionada por crear soluciones tecnológicas para problemas locales y empoderar a las mujeres en tecnología.',
'Bootcamp de Desarrollo Web Full Stack, Certificación en React y Node.js, Curso de Bases de Datos, AWS Cloud Practitioner, Scrum Master Certification',
'Ingeniería en Sistemas - UCA, Técnico Superior en Programación',
'3-5',
'ana.morales.dev@outlook.com | LinkedIn: Ana Sofía Morales | GitHub: @anamorales',
'/placeholder.svg?height=150&width=150',
true),

('Roberto José Hernández', 42, 'Masaya', 'educacion',
'Profesor de matemáticas con metodologías innovadoras. He desarrollado programas educativos que han mejorado el rendimiento académico en escuelas rurales de Nicaragua.',
'Diplomado en Pedagogía Moderna, Curso de Tecnología Educativa, Taller de Matemática Recreativa, Certificación en Educación Virtual',
'Licenciatura en Matemáticas - UNAN León, Maestría en Educación, Especialización en Didáctica de las Matemáticas',
'10+',
'roberto.hernandez.edu@yahoo.com | WhatsApp: 8777-5678',
'/placeholder.svg?height=150&width=150',
true),

('Gabriela Patricia Vega', 30, 'Chinandega', 'deportes',
'Entrenadora personal y especialista en fitness. Campeona nacional de atletismo y promotora del deporte femenino en Nicaragua. Fundadora del programa Mujeres Fuertes.',
'Certificación Internacional de Entrenamiento Personal, Curso de Nutrición Deportiva, Taller de Primeros Auxilios, Especialización en Entrenamiento Funcional',
'Licenciatura en Educación Física - UNAN Managua, Técnico en Nutrición Deportiva',
'5-10',
'gaby.fitness@gmail.com | @GabyFitNica | Instagram: @MujeresFuertesNica',
'/placeholder.svg?height=150&width=150',
true),

('Luis Fernando Castillo', 38, 'Matagalpa', 'cocina',
'Chef especializado en cocina tradicional nicaragüense con toques modernos. Propietario del restaurante Sabores de Mi Tierra y promotor de la gastronomía local en ferias internacionales.',
'Curso de Alta Cocina Internacional, Taller de Repostería Artesanal, Seminario de Administración Gastronómica, Certificación en Seguridad Alimentaria',
'Técnico Superior en Gastronomía - Instituto Gastronómico, Diplomado en Administración de Restaurantes',
'10+',
'chef.castillo@restaurante.com | Facebook: Chef Luis Castillo | Tel: 8666-9012',
'/placeholder.svg?height=150&width=150',
true),

('Carmen Lucía Flores', 26, 'Estelí', 'artesania',
'Artesana especializada en cerámica y alfarería tradicional. Mis piezas combinan técnicas ancestrales con diseños contemporáneos, preservando la tradición alfarera de Estelí.',
'Taller de Cerámica Tradicional, Curso de Diseño Artesanal, Seminario de Comercialización de Artesanías, Workshop de Técnicas Ancestrales',
'Técnico en Artes Aplicadas, Certificación en Diseño Artesanal',
'3-5',
'carmen.ceramica@artesanos.org | Facebook: Carmen Flores Cerámica',
'/placeholder.svg?height=150&width=150',
true),

('Diego Alejandro Ruiz', 29, 'Jinotega', 'danza',
'Bailarín y coreógrafo especializado en danzas folclóricas nicaragüenses. Director del grupo de danza juvenil Raíces Pinoleras y promotor cultural en festivales nacionales.',
'Taller de Danza Contemporánea, Curso de Coreografía, Seminario de Danzas Tradicionales Centroamericanas, Workshop de Danza Folclórica',
'Licenciatura en Artes Escénicas, Técnico en Danza Folclórica',
'5-10',
'diego.danza@cultura.gob.ni | @DiegoDanzaNica | Instagram: @RaicesPinoleras',
'/placeholder.svg?height=150&width=150',
true),

('Patricia Isabel Moreno', 33, 'Rivas', 'literatura',
'Escritora y poetisa especializada en literatura contemporánea nicaragüense. Autora de tres libros de poesía y ganadora del Premio Nacional de Literatura Joven 2022.',
'Taller de Escritura Creativa, Seminario de Literatura Latinoamericana, Curso de Edición Literaria, Workshop de Poesía Contemporánea',
'Licenciatura en Letras y Literatura - UNAN Managua, Maestría en Literatura Hispanoamericana',
'5-10',
'patricia.moreno.escritora@gmail.com | @PatriciaPoesia | Blog: palabrasdetierra.com',
'/placeholder.svg?height=150&width=150',
true),

('Alejandro José Martínez', 27, 'Boaco', 'fotografia',
'Fotógrafo profesional especializado en fotografía de naturaleza y retratos. Documentalista de la biodiversidad nicaragüense y colaborador de National Geographic Nicaragua.',
'Curso de Fotografía Digital Avanzada, Taller de Fotografía de Naturaleza, Seminario de Edición Digital, Workshop de Fotografía Documental',
'Licenciatura en Comunicación Social - UCA, Técnico en Fotografía Profesional',
'3-5',
'alejandro.martinez.foto@outlook.com | Instagram: @AlejandroFotoNica | 500px: AlejandroMartinez',
'/placeholder.svg?height=150&width=150',
true),

('Silvia Esperanza Castillo', 31, 'Nueva Segovia', 'educacion',
'Maestra de educación primaria especializada en educación rural. Desarrolladora del programa Aprendiendo en el Campo que ha beneficiado a más de 500 niños rurales.',
'Diplomado en Educación Rural, Curso de Pedagogía Activa, Taller de Materiales Didácticos, Certificación en Educación Inclusiva',
'Licenciatura en Pedagogía - UNAN León, Especialización en Educación Rural',
'5-10',
'silvia.castillo.edu@mined.gob.ni | WhatsApp: 8555-3456',
'/placeholder.svg?height=150&width=150',
true),

('Fernando Antonio López', 40, 'Chontales', 'artesania',
'Maestro tallador especializado en trabajos en madera. Creador de muebles artesanales y esculturas que reflejan la fauna y flora nicaragüense.',
'Taller de Tallado en Madera, Curso de Diseño de Muebles, Seminario de Técnicas de Acabado, Workshop de Escultura en Madera',
'Técnico en Ebanistería, Certificación en Diseño de Muebles',
'10+',
'fernando.lopez.madera@gmail.com | Facebook: Tallados López | Tel: 8444-7890',
'/placeholder.svg?height=150&width=150',
true);

-- Insertar estadísticas iniciales
INSERT INTO estadisticas (total_talentos, categoria_mas_popular, ciudad_mas_activa) 
VALUES (12, 'educacion', 'Managua');

-- Crear índices para mejorar rendimiento
CREATE INDEX idx_talentos_categoria ON talentos(categoria);
CREATE INDEX idx_talentos_ciudad ON talentos(ciudad);
CREATE INDEX idx_talentos_activo ON talentos(activo);
CREATE INDEX idx_talentos_verificado ON talentos(verificado);
CREATE INDEX idx_talentos_fecha_registro ON talentos(fecha_registro);
CREATE INDEX idx_talentos_uuid ON talentos(uuid);

-- Índice para búsqueda de texto completo
CREATE INDEX idx_talentos_busqueda ON talentos USING gin(to_tsvector('spanish', nombre || ' ' || descripcion || ' ' || COALESCE(cursos, '') || ' ' || COALESCE(titulos, '')));

-- Crear vista para consultas frecuentes
CREATE VIEW vista_talentos_activos AS
SELECT 
    t.id,
    t.uuid,
    t.nombre,
    t.edad,
    t.ciudad,
    c.nombre as ciudad_completa,
    c.departamento,
    c.region,
    t.categoria,
    cat.nombre as categoria_nombre,
    cat.icono as categoria_icono,
    cat.color as categoria_color,
    t.descripcion,
    t.cursos,
    t.titulos,
    t.experiencia,
    t.contacto,
    t.foto,
    t.verificado,
    t.fecha_registro,
    t.fecha_actualizacion
FROM talentos t
JOIN categorias cat ON t.categoria = cat.nombre
LEFT JOIN ciudades c ON t.ciudad = c.nombre
WHERE t.activo = TRUE
ORDER BY t.fecha_registro DESC;

-- Función para actualizar estadísticas
CREATE OR REPLACE FUNCTION actualizar_estadisticas()
RETURNS VOID AS $$
DECLARE
    total_count INTEGER;
    categoria_popular VARCHAR(50);
    ciudad_activa VARCHAR(50);
BEGIN
    -- Contar total de talentos activos
    SELECT COUNT(*) INTO total_count FROM talentos WHERE activo = TRUE;
    
    -- Encontrar categoría más popular
    SELECT categoria INTO categoria_popular 
    FROM talentos 
    WHERE activo = TRUE 
    GROUP BY categoria 
    ORDER BY COUNT(*) DESC 
    LIMIT 1;
    
    -- Encontrar ciudad más activa
    SELECT ciudad INTO ciudad_activa 
    FROM talentos 
    WHERE activo = TRUE 
    GROUP BY ciudad 
    ORDER BY COUNT(*) DESC 
    LIMIT 1;
    
    -- Actualizar estadísticas
    UPDATE estadisticas 
    SET total_talentos = total_count,
        categoria_mas_popular = categoria_popular,
        ciudad_mas_activa = ciudad_activa,
        fecha_actualizacion = CURRENT_TIMESTAMP
    WHERE id = 1;
    
    -- Si no existe registro, insertarlo
    IF NOT FOUND THEN
        INSERT INTO estadisticas (total_talentos, categoria_mas_popular, ciudad_mas_activa)
        VALUES (total_count, categoria_popular, ciudad_activa);
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Función trigger para logs de auditoría
CREATE OR REPLACE FUNCTION log_cambios_talentos()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO logs_actividad (tabla_afectada, accion, registro_id, datos_nuevos)
        VALUES ('talentos', 'INSERT', NEW.id, row_to_json(NEW));
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO logs_actividad (tabla_afectada, accion, registro_id, datos_anteriores, datos_nuevos)
        VALUES ('talentos', 'UPDATE', NEW.id, row_to_json(OLD), row_to_json(NEW));
        
        -- Actualizar fecha de modificación
        NEW.fecha_actualizacion = CURRENT_TIMESTAMP;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO logs_actividad (tabla_afectada, accion, registro_id, datos_anteriores)
        VALUES ('talentos', 'DELETE', OLD.id, row_to_json(OLD));
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Crear triggers
CREATE TRIGGER trigger_log_talentos
    AFTER INSERT OR UPDATE OR DELETE ON talentos
    FOR EACH ROW EXECUTE FUNCTION log_cambios_talentos();

-- Trigger para actualizar estadísticas automáticamente
CREATE OR REPLACE FUNCTION trigger_actualizar_estadisticas()
RETURNS TRIGGER AS $$
BEGIN
    PERFORM actualizar_estadisticas();
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_stats_talentos
    AFTER INSERT OR UPDATE OR DELETE ON talentos
    FOR EACH STATEMENT EXECUTE FUNCTION trigger_actualizar_estadisticas();

-- Función para búsqueda de texto completo
CREATE OR REPLACE FUNCTION buscar_talentos(termino_busqueda TEXT)
RETURNS TABLE(
    id INTEGER,
    uuid UUID,
    nombre VARCHAR(100),
    edad INTEGER,
    ciudad VARCHAR(50),
    categoria VARCHAR(30),
    descripcion TEXT,
    ranking REAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        t.id,
        t.uuid,
        t.nombre,
        t.edad,
        t.ciudad,
        t.categoria,
        t.descripcion,
        ts_rank(to_tsvector('spanish', t.nombre || ' ' || t.descripcion || ' ' || COALESCE(t.cursos, '') || ' ' || COALESCE(t.titulos, '')), 
                plainto_tsquery('spanish', termino_busqueda)) as ranking
    FROM talentos t
    WHERE t.activo = TRUE
    AND to_tsvector('spanish', t.nombre || ' ' || t.descripcion || ' ' || COALESCE(t.cursos, '') || ' ' || COALESCE(t.titulos, ''))
        @@ plainto_tsquery('spanish', termino_busqueda)
    ORDER BY ranking DESC;
END;
$$ LANGUAGE plpgsql;

-- Ejecutar actualización inicial de estadísticas
SELECT actualizar_estadisticas();

-- Crear usuario específico para la aplicación (opcional)
-- CREATE ROLE talento_app_user WITH LOGIN PASSWORD 'password_seguro_aqui';
-- GRANT SELECT, INSERT, UPDATE ON talentos TO talento_app_user;
-- GRANT SELECT ON categorias, ciudades, vista_talentos_activos TO talento_app_user;
-- GRANT USAGE, SELECT ON SEQUENCE talentos_id_seq TO talento_app_user;

-- Comentarios en las tablas
COMMENT ON TABLE talentos IS 'Tabla principal que almacena información de talentos nicaragüenses';
COMMENT ON TABLE categorias IS 'Catálogo de categorías de talentos disponibles';
COMMENT ON TABLE ciudades IS 'Catálogo de ciudades y departamentos de Nicaragua';
COMMENT ON TABLE estadisticas IS 'Métricas y estadísticas generales de la plataforma';
COMMENT ON TABLE logs_actividad IS 'Registro de auditoría para cambios en la base de datos';

COMMENT ON COLUMN talentos.uuid IS 'Identificador único universal para referencias externas';
COMMENT ON COLUMN talentos.verificado IS 'Indica si el perfil ha sido verificado por administradores';
COMMENT ON COLUMN talentos.fecha_actualizacion IS 'Timestamp de la última modificación del registro';
