// Modificar la estructura de datos de talentosDB para incluir tarifa_hora
const talentosDB = [
  {
    id: 1,
    nombre: "María Elena Gutiérrez",
    edad: 28,
    ciudad: "Managua",
    categoria: "musica",
    descripcion:
      "Cantante y compositora especializada en música folclórica nicaragüense. He participado en festivales nacionales e internacionales representando la cultura de nuestro país.",
    cursos:
      "Curso de Canto Lírico - Conservatorio Nacional, Taller de Composición Musical, Curso de Guitarra Clásica, Seminario de Música Tradicional Centroamericana",
    titulos: "Licenciatura en Música - UNAN Managua, Diplomado en Etnomusicología",
    experiencia: "5-10",
    contacto: "maria.gutierrez@email.com | @MariaMusic | Tel: 8888-1234",
    foto: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    tarifa_hora: "$25",
    disponibilidad: "Fines de semana",
    habilidades: ["Canto", "Composición", "Guitarra", "Piano"],
  },
  {
    id: 2,
    nombre: "Carlos Alberto Mendoza",
    edad: 35,
    ciudad: "León",
    categoria: "arte",
    descripcion:
      "Pintor y muralista especializado en arte contemporáneo con temática social. Mis obras han sido expuestas en galerías de Centroamérica y reflejan la realidad nicaragüense.",
    cursos:
      "Taller de Pintura al Óleo, Curso de Arte Digital, Seminario de Historia del Arte Latinoamericano, Workshop de Muralismo Urbano",
    titulos: "Maestría en Artes Visuales - Universidad Nacional Autónoma de Nicaragua, Licenciatura en Bellas Artes",
    experiencia: "10+",
    contacto: "carlos.mendoza.art@gmail.com | Instagram: @CarlosArtNica | Facebook: Carlos Mendoza Arte",
    foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    tarifa_hora: "$30",
    disponibilidad: "Tiempo completo",
    habilidades: ["Pintura al óleo", "Muralismo", "Arte digital", "Diseño"],
  },
  {
    id: 3,
    nombre: "Ana Sofía Morales",
    edad: 24,
    ciudad: "Granada",
    categoria: "tecnologia",
    descripcion:
      "Desarrolladora Full Stack especializada en aplicaciones web modernas. Apasionada por crear soluciones tecnológicas para problemas locales y empoderar a las mujeres en tecnología.",
    cursos:
      "Bootcamp de Desarrollo Web Full Stack, Certificación en React y Node.js, Curso de Bases de Datos, AWS Cloud Practitioner, Scrum Master Certification",
    titulos: "Ingeniería en Sistemas - UCA, Técnico Superior en Programación",
    experiencia: "3-5",
    contacto: "ana.morales.dev@outlook.com | LinkedIn: Ana Sofía Morales | GitHub: @anamorales",
    foto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    tarifa_hora: "$35",
    disponibilidad: "Remoto / Tiempo completo",
    habilidades: ["React", "Node.js", "MongoDB", "AWS", "UI/UX"],
  },
  {
    id: 4,
    nombre: "Roberto José Hernández",
    edad: 42,
    ciudad: "Masaya",
    categoria: "educacion",
    descripcion:
      "Profesor de matemáticas con metodologías innovadoras. He desarrollado programas educativos que han mejorado el rendimiento académico en escuelas rurales de Nicaragua.",
    cursos:
      "Diplomado en Pedagogía Moderna, Curso de Tecnología Educativa, Taller de Matemática Recreativa, Certificación en Educación Virtual",
    titulos:
      "Licenciatura en Matemáticas - UNAN León, Maestría en Educación, Especialización en Didáctica de las Matemáticas",
    experiencia: "10+",
    contacto: "roberto.hernandez.edu@yahoo.com | WhatsApp: 8777-5678",
    foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    tarifa_hora: "$20",
    disponibilidad: "Tardes y fines de semana",
    habilidades: ["Matemáticas", "Pedagogía", "Educación virtual", "Tutoría"],
  },
  {
    id: 5,
    nombre: "Gabriela Patricia Vega",
    edad: 30,
    ciudad: "Chinandega",
    categoria: "deportes",
    descripcion:
      "Entrenadora personal y especialista en fitness. Campeona nacional de atletismo y promotora del deporte femenino en Nicaragua. Fundadora del programa 'Mujeres Fuertes'.",
    cursos:
      "Certificación Internacional de Entrenamiento Personal, Curso de Nutrición Deportiva, Taller de Primeros Auxilios, Especialización en Entrenamiento Funcional",
    titulos: "Licenciatura en Educación Física - UNAN Managua, Técnico en Nutrición Deportiva",
    experiencia: "5-10",
    contacto: "gaby.fitness@gmail.com | @GabyFitNica | Instagram: @MujeresFuertesNica",
    foto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    tarifa_hora: "$22",
    disponibilidad: "Flexible",
    habilidades: ["Entrenamiento personal", "Nutrición", "Fitness", "Atletismo"],
  },
  {
    id: 6,
    nombre: "Luis Fernando Castillo",
    edad: 38,
    ciudad: "Matagalpa",
    categoria: "cocina",
    descripcion:
      "Chef especializado en cocina tradicional nicaragüense con toques modernos. Propietario del restaurante 'Sabores de Mi Tierra' y promotor de la gastronomía local en ferias internacionales.",
    cursos:
      "Curso de Alta Cocina Internacional, Taller de Repostería Artesanal, Seminario de Administración Gastronómica, Certificación en Seguridad Alimentaria",
    titulos: "Técnico Superior en Gastronomía - Instituto Gastronómico, Diplomado en Administración de Restaurantes",
    experiencia: "10+",
    contacto: "chef.castillo@restaurante.com | Facebook: Chef Luis Castillo | Tel: 8666-9012",
    foto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    tarifa_hora: "$40",
    disponibilidad: "Eventos especiales",
    habilidades: ["Cocina tradicional", "Repostería", "Gestión de restaurantes", "Catering"],
  },
  {
    id: 7,
    nombre: "Carmen Lucía Flores",
    edad: 26,
    ciudad: "Estelí",
    categoria: "artesania",
    descripcion:
      "Artesana especializada en cerámica y alfarería tradicional. Mis piezas combinan técnicas ancestrales con diseños contemporáneos, preservando la tradición alfarera de Estelí.",
    cursos:
      "Taller de Cerámica Tradicional, Curso de Diseño Artesanal, Seminario de Comercialización de Artesanías, Workshop de Técnicas Ancestrales",
    titulos: "Técnico en Artes Aplicadas, Certificación en Diseño Artesanal",
    experiencia: "3-5",
    contacto: "carmen.ceramica@artesanos.org | Facebook: Carmen Flores Cerámica",
    foto: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
    tarifa_hora: "$18",
    disponibilidad: "Talleres grupales",
    habilidades: ["Cerámica", "Alfarería", "Diseño artesanal", "Técnicas ancestrales"],
  },
  {
    id: 8,
    nombre: "Diego Alejandro Ruiz",
    descripcion:
      "Artesana especializada en cerámica y alfarería tradicional. Mis piezas combinan técnicas ancestrales con diseños contemporáneos, preservando la tradición alfarera de Estelí.",
    cursos:
      "Taller de Cerámica Tradicional, Curso de Diseño Artesanal, Seminario de Comercialización de Artesanías, Workshop de Técnicas Ancestrales",
    titulos: "Técnico en Artes Aplicadas, Certificación en Diseño Artesanal",
    experiencia: "3-5",
    contacto: "carmen.ceramica@artesanos.org | Facebook: Carmen Flores Cerámica",
    foto: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
    tarifa_hora: "$18",
    disponibilidad: "Talleres grupales",
    habilidades: ["Cerámica", "Alfarería", "Diseño artesanal", "Técnicas ancestrales"],
  },
  {
    id: 8,
    nombre: "Diego Alejandro Ruiz",
    edad: 29,
    ciudad: "Jinotega",
    categoria: "danza",
    descripcion:
      "Bailarín y coreógrafo especializado en danzas folclóricas nicaragüenses. Director del grupo de danza juvenil 'Raíces Pinoleras' y promotor cultural en festivales nacionales.",
    cursos:
      "Taller de Danza Contemporánea, Curso de Coreografía, Seminario de Danzas Tradicionales Centroamericanas, Workshop de Danza Folclórica",
    titulos: "Licenciatura en Artes Escénicas, Técnico en Danza Folclórica",
    experiencia: "5-10",
    contacto: "diego.danza@cultura.gob.ni | @DiegoDanzaNica | Instagram: @RaicesPinoleras",
    foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    tarifa_hora: "$25",
    disponibilidad: "Clases grupales e individuales",
    habilidades: ["Danza folclórica", "Coreografía", "Dirección artística", "Enseñanza"],
  },
  {
    id: 9,
    nombre: "Patricia Isabel Moreno",
    edad: 33,
    ciudad: "Rivas",
    categoria: "literatura",
    descripcion:
      "Escritora y poetisa especializada en literatura contemporánea nicaragüense. Autora de tres libros de poesía y ganadora del Premio Nacional de Literatura Joven 2022.",
    cursos:
      "Taller de Escritura Creativa, Seminario de Literatura Latinoamericana, Curso de Edición Literaria, Workshop de Poesía Contemporánea",
    titulos: "Licenciatura en Letras y Literatura - UNAN Managua, Maestría en Literatura Hispanoamericana",
    experiencia: "5-10",
    contacto: "patricia.moreno.escritora@gmail.com | @PatriciaPoesia | Blog: palabrasdetierra.com",
    foto: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    tarifa_hora: "$28",
    disponibilidad: "Talleres literarios",
    habilidades: ["Poesía", "Narrativa", "Edición", "Crítica literaria"],
  },
  {
    id: 10,
    nombre: "Alejandro José Martínez",
    edad: 27,
    ciudad: "Boaco",
    categoria: "fotografia",
    descripcion:
      "Fotógrafo profesional especializado en fotografía de naturaleza y retratos. Documentalista de la biodiversidad nicaragüense y colaborador de National Geographic Nicaragua.",
    cursos:
      "Curso de Fotografía Digital Avanzada, Taller de Fotografía de Naturaleza, Seminario de Edición Digital, Workshop de Fotografía Documental",
    titulos: "Licenciatura en Comunicación Social - UCA, Técnico en Fotografía Profesional",
    experiencia: "3-5",
    contacto: "alejandro.martinez.foto@outlook.com | Instagram: @AlejandroFotoNica | 500px: AlejandroMartinez",
    foto: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
    tarifa_hora: "$32",
    disponibilidad: "Sesiones fotográficas",
    habilidades: ["Fotografía de naturaleza", "Retratos", "Edición digital", "Documentales"],
  },
  {
    id: 11,
    nombre: "Silvia Esperanza Castillo",
    edad: 31,
    ciudad: "Nueva Segovia",
    categoria: "educacion",
    descripcion:
      "Maestra de educación primaria especializada en educación rural. Desarrolladora del programa 'Aprendiendo en el Campo' que ha beneficiado a más de 500 niños rurales.",
    cursos:
      "Diplomado en Educación Rural, Curso de Pedagogía Activa, Taller de Materiales Didácticos, Certificación en Educación Inclusiva",
    titulos: "Licenciatura en Pedagogía - UNAN León, Especialización en Educación Rural",
    experiencia: "5-10",
    contacto: "silvia.castillo.edu@mined.gob.ni | WhatsApp: 8555-3456",
    foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
    tarifa_hora: "$18",
    disponibilidad: "Consultoría educativa",
    habilidades: ["Educación rural", "Pedagogía activa", "Materiales didácticos", "Educación inclusiva"],
  },
  {
    id: 12,
    nombre: "Fernando Antonio López",
    edad: 40,
    ciudad: "Chontales",
    categoria: "artesania",
    descripcion:
      "Maestro tallador especializado en trabajos en madera. Creador de muebles artesanales y esculturas que reflejan la fauna y flora nicaragüense.",
    cursos:
      "Taller de Tallado en Madera, Curso de Diseño de Muebles, Seminario de Técnicas de Acabado, Workshop de Escultura en Madera",
    titulos: "Técnico en Ebanistería, Certificación en Diseño de Muebles",
    experiencia: "10+",
    contacto: "fernando.lopez.madera@gmail.com | Facebook: Tallados López | Tel: 8444-7890",
    foto: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    tarifa_hora: "$27",
    disponibilidad: "Por proyecto",
    habilidades: ["Tallado en madera", "Ebanistería", "Escultura", "Diseño de muebles"],
  },
]

// Variables globales
let filtroActual = "todos"
let modalAbierto = false

// Inicialización cuando se carga la página
document.addEventListener("DOMContentLoaded", () => {
  cargarTalentos()
  configurarEventListeners()
  animarElementos()
  inicializarCarruseles()
})

// Configurar todos los event listeners
function configurarEventListeners() {
  // Filtros
  const filterButtons = document.querySelectorAll(".filter-btn")
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remover clase active de todos los botones
      filterButtons.forEach((b) => b.classList.remove("active"))
      // Agregar clase active al botón clickeado
      this.classList.add("active")

      filtroActual = this.dataset.filter
      cargarTalentos()
    })
  })

  // Formulario
  const form = document.getElementById("talento-form")
  if (form) {
    form.addEventListener("submit", manejarSubmitFormulario)
  }

  // Modal
  const modal = document.getElementById("modal")
  const closeBtn = document.querySelector(".close")

  if (closeBtn) {
    closeBtn.addEventListener("click", cerrarModal)
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        cerrarModal()
      }
    })
  }

  // Navegación suave
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href")

      // Si es un enlace externo (como .html), no hacer scroll
      if (href.includes(".html")) {
        return // Permitir navegación normal
      }

      // Si es un enlace interno (#), hacer scroll suave
      if (href.startsWith("#")) {
        e.preventDefault()
        const targetId = href.substring(1)
        scrollToSection(targetId)
      }
    })
  })

  // Botones de servicios de asesoramiento
  document.querySelectorAll(".btn-servicio, .btn-servicio-small, .btn-cta-asesoramiento").forEach((btn) => {
    btn.addEventListener("click", () => {
      alert("¡Gracias por tu interés! Pronto nos pondremos en contacto contigo para coordinar el servicio.")
    })
  })
}

// Cargar y mostrar talentos
function cargarTalentos() {
  const grid = document.getElementById("talentos-grid")

  if (!grid) return // Si no existe el grid, salir

  // Mostrar loading
  grid.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>Cargando talentos...</p>
        </div>
    `

  // Simular carga
  setTimeout(() => {
    let talentosFiltrados = talentosDB

    if (filtroActual !== "todos") {
      talentosFiltrados = talentosDB.filter((talento) => talento.categoria === filtroActual)
    }

    if (talentosFiltrados.length === 0) {
      grid.innerHTML = `
                <div class="loading">
                    <p>No se encontraron talentos en esta categoría.</p>
                </div>
            `
      return
    }

    grid.innerHTML = talentosFiltrados.map((talento) => crearTarjetaTalento(talento)).join("")

    // Agregar event listeners a las tarjetas
    document.querySelectorAll(".talento-card").forEach((card) => {
      card.addEventListener("click", function () {
        const id = Number.parseInt(this.dataset.id)
        mostrarDetallesTalento(id)
      })
    })

    // Animar las tarjetas
    animarTarjetas()
  }, 500)
}

// Modificar la función crearTarjetaTalento para incluir la tarifa por hora y habilidades
function crearTarjetaTalento(talento) {
  const categoriaTexto = {
    musica: "Música",
    arte: "Arte y Diseño",
    tecnologia: "Tecnología",
    educacion: "Educación",
    deportes: "Deportes",
    cocina: "Cocina",
    artesania: "Artesanía",
    danza: "Danza",
    literatura: "Literatura",
    fotografia: "Fotografía",
  }

  const experienciaTexto = {
    "0-1": "Menos de 1 año",
    "1-3": "1-3 años",
    "3-5": "3-5 años",
    "5-10": "5-10 años",
    "10+": "Más de 10 años",
  }

  // Crear HTML para las habilidades
  const habilidadesHTML = talento.habilidades
    ? `<div class="card-skills">
      ${talento.habilidades.map((hab) => `<span class="skill-tag">${hab}</span>`).join("")}
    </div>`
    : ""

  return `
    <div class="talento-card linkedin-style" data-id="${talento.id}" data-categoria="${talento.categoria}">
      <div class="card-header">
        <div class="card-avatar">
          ${talento.foto ? `<img src="${talento.foto}" alt="${talento.nombre}">` : '<i class="fas fa-user"></i>'}
        </div>
        <div class="card-name">${talento.nombre}</div>
        <div class="card-info">${talento.edad} años • ${talento.ciudad}</div>
        <div class="card-category">${categoriaTexto[talento.categoria] || talento.categoria}</div>
      </div>
      <div class="card-body">
        <div class="card-description">${talento.descripcion.substring(0, 100)}...</div>
        
        ${habilidadesHTML}
        
        <div class="card-meta">
          <div class="card-experience">
            <i class="fas fa-briefcase"></i> 
            ${talento.experiencia ? experienciaTexto[talento.experiencia] : "No especificada"}
          </div>
          <div class="card-rate">
            <i class="fas fa-money-bill-wave"></i> 
            ${talento.tarifa_hora || "Tarifa no especificada"}
          </div>
          <div class="card-availability">
            <i class="fas fa-clock"></i> 
            ${talento.disponibilidad || "Disponibilidad no especificada"}
          </div>
        </div>
        
        <button class="btn-contact-talent">
          <i class="fas fa-envelope"></i> Contactar
        </button>
      </div>
    </div>
  `
}

// Modificar la función mostrarDetallesTalento para incluir la tarifa por hora y habilidades
function mostrarDetallesTalento(id) {
  const talento = talentosDB.find((t) => t.id === id)
  if (!talento) return

  const categoriaTexto = {
    musica: "Música",
    arte: "Arte y Diseño",
    tecnologia: "Tecnología",
    educacion: "Educación",
    deportes: "Deportes",
    cocina: "Cocina",
    artesania: "Artesanía",
    danza: "Danza",
    literatura: "Literatura",
    fotografia: "Fotografía",
  }

  const experienciaTexto = {
    "0-1": "Menos de 1 año",
    "1-3": "1-3 años",
    "3-5": "3-5 años",
    "5-10": "5-10 años",
    "10+": "Más de 10 años",
  }

  // Crear HTML para las habilidades
  const habilidadesHTML = talento.habilidades
    ? `<div style="margin-bottom: 2rem;">
      <h3 style="color: #13312A; margin-bottom: 1rem; border-bottom: 2px solid #C69A72; padding-bottom: 0.5rem;">
        <i class="fas fa-tools" style="color: #155446; margin-right: 0.5rem;"></i>Habilidades
      </h3>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
        ${talento.habilidades
          .map(
            (hab) =>
              `<span style="background: #155446; color: #F6E9CA; padding: 6px 12px; border-radius: 20px; font-size: 0.9rem;">${hab}</span>`,
          )
          .join("")}
      </div>
    </div>`
    : ""

  const modalBody = document.getElementById("modal-body")
  if (!modalBody) return

  modalBody.innerHTML = `
    <div style="text-align: center; margin-bottom: 2rem;">
      <div style="width: 120px; height: 120px; border-radius: 50%; margin: 0 auto 1rem; background: #C69A72; display: flex; align-items: center; justify-content: center; font-size: 3rem; color: #F6E9CA; overflow: hidden; border: 3px solid #C69A72;">
        ${talento.foto ? `<img src="${talento.foto}" alt="${talento.nombre}" style="width: 100%; height: 100%; object-fit: cover;">` : '<i class="fas fa-user"></i>'}
      </div>
      <h2 style="color: #13312A; margin-bottom: 0.5rem;">${talento.nombre}</h2>
      <p style="color: #155446; font-size: 1.1rem; font-weight: 600;">${talento.edad} años • ${talento.ciudad}</p>
      <span style="display: inline-block; background: #155446; color: #F6E9CA; padding: 6px 16px; border-radius: 20px; font-size: 0.9rem; font-weight: 500; margin-top: 1rem;">
        ${categoriaTexto[talento.categoria] || talento.categoria}
      </span>
      
      <div style="margin-top: 1.5rem; display: flex; justify-content: center; gap: 1.5rem; flex-wrap: wrap;">
        <div style="background: #F6E9CA; padding: 10px 15px; border-radius: 10px; border: 2px solid #C69A72;">
          <div style="font-weight: bold; color: #13312A;">Tarifa por hora</div>
          <div style="color: #155446; font-size: 1.2rem;">${talento.tarifa_hora || "No especificada"}</div>
        </div>
        <div style="background: #F6E9CA; padding: 10px 15px; border-radius: 10px; border: 2px solid #C69A72;">
          <div style="font-weight: bold; color: #13312A;">Experiencia</div>
          <div style="color: #155446; font-size: 1.2rem;">${talento.experiencia ? experienciaTexto[talento.experiencia] : "No especificada"}</div>
        </div>
        <div style="background: #F6E9CA; padding: 10px 15px; border-radius: 10px; border: 2px solid #C69A72;">
          <div style="font-weight: bold; color: #13312A;">Disponibilidad</div>
          <div style="color: #155446; font-size: 1.2rem;">${talento.disponibilidad || "No especificada"}</div>
        </div>
      </div>
    </div>
    
    <div style="margin-bottom: 2rem;">
      <h3 style="color: #13312A; margin-bottom: 1rem; border-bottom: 2px solid #C69A72; padding-bottom: 0.5rem;">
        <i class="fas fa-star" style="color: #C69A72; margin-right: 0.5rem;"></i>Descripción del Talento
      </h3>
      <p style="line-height: 1.6; color: #155446;">${talento.descripcion}</p>
    </div>

    ${habilidadesHTML}

    ${
      talento.cursos
        ? `
        <div style="margin-bottom: 2rem;">
            <h3 style="color: #13312A; margin-bottom: 1rem; border-bottom: 2px solid #C69A72; padding-bottom: 0.5rem;">
                <i class="fas fa-certificate" style="color: #155446; margin-right: 0.5rem;"></i>Cursos y Certificaciones
            </h3>
            <p style="line-height: 1.6; color: #155446;">${talento.cursos}</p>
        </div>
    `
        : ""
    }

    ${
      talento.titulos
        ? `
        <div style="margin-bottom: 2rem;">
            <h3 style="color: #13312A; margin-bottom: 1rem; border-bottom: 2px solid #C69A72; padding-bottom: 0.5rem;">
                <i class="fas fa-graduation-cap" style="color: #13312A; margin-right: 0.5rem;"></i>Títulos Académicos
            </h3>
            <p style="line-height: 1.6; color: #155446;">${talento.titulos}</p>
        </div>
    `
        : ""
    }

    ${
      talento.contacto
        ? `
        <div style="margin-bottom: 2rem;">
            <h3 style="color: #13312A; margin-bottom: 1rem; border-bottom: 2px solid #C69A72; padding-bottom: 0.5rem;">
                <i class="fas fa-envelope" style="color: #155446; margin-right: 0.5rem;"></i>Contacto
            </h3>
            <p style="line-height: 1.6; color: #155446; font-weight: 500;">${talento.contacto}</p>
        </div>
    `
        : ""
    }
    
    <div style="text-align: center; margin-top: 2rem;">
      <button class="btn-primary" style="margin-right: 1rem;">
        <i class="fas fa-envelope"></i> Contactar
      </button>
      <button class="btn-secondary">
        <i class="fas fa-bookmark"></i> Guardar perfil
      </button>
    </div>
  `

  document.getElementById("modal").style.display = "block"
  modalAbierto = true
}

// Cerrar modal
function cerrarModal() {
  const modal = document.getElementById("modal")
  if (modal) {
    modal.style.display = "none"
  }
  modalAbierto = false
}

// Manejar envío del formulario
function manejarSubmitFormulario(e) {
  e.preventDefault()

  const formData = new FormData(e.target)

  // Procesar las habilidades como un array
  const habilidadesInput = formData.get("habilidades")
  const habilidadesArray = habilidadesInput
    ? habilidadesInput
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "")
    : []

  const nuevoTalento = {
    id: talentosDB.length + 1,
    nombre: formData.get("nombre"),
    edad: Number.parseInt(formData.get("edad")),
    ciudad: formData.get("ciudad"),
    categoria: formData.get("categoria"),
    descripcion: formData.get("descripcion"),
    cursos: formData.get("cursos"),
    titulos: formData.get("titulos"),
    experiencia: formData.get("experiencia"),
    contacto: formData.get("contacto"),
    foto: formData.get("foto") || null,
    tarifa_hora: formData.get("tarifa_hora") ? `$${formData.get("tarifa_hora")}` : null,
    disponibilidad: formData.get("disponibilidad") || null,
    habilidades: habilidadesArray,
  }

  // Validaciones básicas
  if (
    !nuevoTalento.nombre ||
    !nuevoTalento.edad ||
    !nuevoTalento.ciudad ||
    !nuevoTalento.categoria ||
    !nuevoTalento.descripcion ||
    !nuevoTalento.tarifa_hora
  ) {
    alert("Por favor completa todos los campos obligatorios (*)")
    return
  }

  // Simular guardado
  mostrarMensajeCarga("Guardando tu talento...")

  setTimeout(() => {
    talentosDB.push(nuevoTalento)

    // Limpiar formulario
    e.target.reset()

    // Mostrar mensaje de éxito
    mostrarMensajeExito("¡Tu talento ha sido agregado exitosamente!")

    // Recargar talentos si estamos en la categoría correcta
    if (filtroActual === "todos" || filtroActual === nuevoTalento.categoria) {
      cargarTalentos()
    }

    // Redirigir a la página de talentos después de un momento
    setTimeout(() => {
      window.location.href = "talentos.html"
    }, 2000)
  }, 1500)
}

// Mostrar mensaje de carga
function mostrarMensajeCarga(mensaje) {
  const btn = document.querySelector(".btn-submit")
  if (!btn) return

  const textoOriginal = btn.innerHTML
  btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${mensaje}`
  btn.disabled = true

  setTimeout(() => {
    btn.innerHTML = textoOriginal
    btn.disabled = false
  }, 3000)
}

// Mostrar mensaje de éxito
function mostrarMensajeExito(mensaje) {
  const alertDiv = document.createElement("div")
  alertDiv.className = "success-message"
  alertDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 3000;
        animation: slideInRight 0.5s ease-out;
    `
  alertDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${mensaje}`

  document.body.appendChild(alertDiv)

  setTimeout(() => {
    alertDiv.style.animation = "slideOutRight 0.5s ease-out"
    setTimeout(() => {
      if (document.body.contains(alertDiv)) {
        document.body.removeChild(alertDiv)
      }
    }, 500)
  }, 3000)
}

// Scroll suave a sección
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    const offsetTop = element.offsetTop - 80 // Ajuste para header fijo
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    })
  }
}

// Animaciones
function animarElementos() {
  // Observador de intersección para animaciones
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fadeInUp 0.6s ease-out"
      }
    })
  })

  // Observar elementos que necesitan animación
  document.querySelectorAll(".talento-card, .form-section, .filters").forEach((el) => {
    observer.observe(el)
  })
}

function animarTarjetas() {
  const cards = document.querySelectorAll(".talento-card")
  cards.forEach((card, index) => {
    card.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s both`
  })
}

// Funciones de utilidad
function buscarTalentos(termino) {
  return talentosDB.filter(
    (talento) =>
      talento.nombre.toLowerCase().includes(termino.toLowerCase()) ||
      talento.descripcion.toLowerCase().includes(termino.toLowerCase()) ||
      talento.ciudad.toLowerCase().includes(termino.toLowerCase()),
  )
}

// Manejo de errores
window.addEventListener("error", (e) => {
  console.error("Error en la aplicación:", e.error)
})

// Manejo de teclas
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalAbierto) {
    cerrarModal()
  }
})

// Agregar estilos CSS adicionales para las animaciones
const style = document.createElement("style")
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)

// Función para obtener estadísticas
function obtenerEstadisticas() {
  const stats = {
    totalTalentos: talentosDB.length,
    categorias: {},
    ciudades: {},
  }

  talentosDB.forEach((talento) => {
    // Contar por categorías
    stats.categorias[talento.categoria] = (stats.categorias[talento.categoria] || 0) + 1
    // Contar por ciudades
    stats.ciudades[talento.ciudad] = (stats.ciudades[talento.ciudad] || 0) + 1
  })

  return stats
}

// Función para exportar datos (opcional)
function exportarTalentos() {
  const dataStr = JSON.stringify(talentosDB, null, 2)
  const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

  const exportFileDefaultName = "talentos_pinoleros.json"

  const linkElement = document.createElement("a")
  linkElement.setAttribute("href", dataUri)
  linkElement.setAttribute("download", exportFileDefaultName)
  linkElement.click()
}

// Funciones para carruseles
function inicializarCarruseles() {
  // Solo inicializar el carrusel de testimonios, no el de talentos destacados
  inicializarCarruselTestimonios()
}

function inicializarCarruselTestimonios() {
  const container = document.querySelector(".carousel-testimonios")
  const prevBtn = document.querySelector(".carousel-prev-testimonios")
  const nextBtn = document.querySelector(".carousel-next-testimonios")

  if (!container || !prevBtn || !nextBtn) return

  let currentIndex = 0
  const itemsToShow = 3
  const totalItems = container.children.length
  const maxIndex = Math.max(0, totalItems - itemsToShow)

  function updateCarousel() {
    const translateX = -(currentIndex * (100 / itemsToShow))
    container.style.transform = `translateX(${translateX}%)`

    prevBtn.disabled = currentIndex === 0
    nextBtn.disabled = currentIndex >= maxIndex
  }

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--
      updateCarousel()
    }
  })

  nextBtn.addEventListener("click", () => {
    if (currentIndex < maxIndex) {
      currentIndex++
      updateCarousel()
    }
  })

  updateCarousel()
}

console.log("🇳🇮 Talento Pinolero cargado exitosamente!")
console.log(`📊 Total de talentos: ${talentosDB.length}`)
