// Funcionalidad para los filtros de convocatorias

// Variables globales para los filtros
let activeFilters = {
  categoria: null,
  mes: null,
  ciudad: null,
  municipio: null,
}

// Función para alternar la visibilidad de los dropdowns
function toggleDropdown(dropdownId) {
  const dropdown = document.getElementById(dropdownId)
  const allDropdowns = document.querySelectorAll(".filter-dropdown-content")

  // Cerrar todos los otros dropdowns
  allDropdowns.forEach((dd) => {
    if (dd.id !== dropdownId) {
      dd.classList.remove("show")
    }
  })

  // Alternar el dropdown actual
  dropdown.classList.toggle("show")
}

// Función para aplicar filtros
function applyFilter(filterType, filterValue) {
  activeFilters[filterType] = filterValue
  updateFilterDisplay()
  filterConvocatorias()

  // Cerrar el dropdown después de seleccionar
  document.querySelectorAll(".filter-dropdown-content").forEach((dd) => {
    dd.classList.remove("show")
  })
}

// Función para actualizar la visualización de filtros activos
function updateFilterDisplay() {
  const buttons = document.querySelectorAll(".filter-dropdown-btn")

  buttons.forEach((btn) => {
    const icon = btn.querySelector("i:first-child")
    const text = btn.childNodes[1]
    const filterType = btn.onclick.toString().match(/'(\w+)'/)[1]

    if (activeFilters[filterType]) {
      btn.classList.add("active-filter")
      // Actualizar el texto del botón para mostrar el filtro activo
      const activeValue = activeFilters[filterType]
      const displayText = getDisplayText(filterType, activeValue)
      btn.innerHTML = `${icon.outerHTML} ${displayText} <i class="fas fa-chevron-down"></i>`
    } else {
      btn.classList.remove("active-filter")
      // Restaurar texto original
      const originalText = getOriginalText(filterType)
      btn.innerHTML = `${icon.outerHTML} ${originalText} <i class="fas fa-chevron-down"></i>`
    }
  })
}

// Función para obtener el texto de visualización del filtro
function getDisplayText(filterType, value) {
  const displayTexts = {
    categorias: {
      musica: "Música",
      arte: "Arte",
      tecnologia: "Tecnología",
      educacion: "Educación",
      deportes: "Deportes",
      cocina: "Cocina",
      artesania: "Artesanía",
      danza: "Danza",
    },
    meses: {
      enero: "Enero",
      febrero: "Febrero",
      marzo: "Marzo",
      abril: "Abril",
      mayo: "Mayo",
      junio: "Junio",
      julio: "Julio",
      agosto: "Agosto",
      septiembre: "Septiembre",
      octubre: "Octubre",
      noviembre: "Noviembre",
      diciembre: "Diciembre",
    },
    ciudades: {
      managua: "Managua",
      leon: "León",
      granada: "Granada",
      masaya: "Masaya",
      chinandega: "Chinandega",
      matagalpa: "Matagalpa",
      esteli: "Estelí",
      jinotega: "Jinotega",
      "nueva-segovia": "Nueva Segovia",
      madriz: "Madriz",
      boaco: "Boaco",
      chontales: "Chontales",
      "rio-san-juan": "Río San Juan",
      rivas: "Rivas",
      carazo: "Carazo",
    },
    municipios: {
      "managua-centro": "Managua Centro",
      "ciudad-sandino": "Ciudad Sandino",
      tipitapa: "Tipitapa",
      "leon-centro": "León Centro",
      "chinandega-centro": "Chinandega Centro",
      corinto: "Corinto",
      "granada-centro": "Granada Centro",
      "masaya-centro": "Masaya Centro",
      masatepe: "Masatepe",
      "matagalpa-centro": "Matagalpa Centro",
      "jinotega-centro": "Jinotega Centro",
      "esteli-centro": "Estelí Centro",
      ocotal: "Ocotal",
      somoto: "Somoto",
      "boaco-centro": "Boaco Centro",
      juigalpa: "Juigalpa",
      "rivas-centro": "Rivas Centro",
      "san-carlos": "San Carlos",
    },
  }

  return displayTexts[filterType]?.[value] || value
}

// Función para obtener el texto original del botón
function getOriginalText(filterType) {
  const originalTexts = {
    categorias: "Categorías",
    meses: "Mes",
    ciudades: "Ciudad",
    municipios: "Municipio",
  }

  return originalTexts[filterType] || filterType
}

// Función para filtrar las convocatorias
function filterConvocatorias() {
  const convocatorias = document.querySelectorAll(".help-card[data-categoria]")

  convocatorias.forEach((convocatoria) => {
    let shouldShow = true

    // Verificar cada filtro activo
    Object.keys(activeFilters).forEach((filterType) => {
      if (activeFilters[filterType]) {
        const dataAttribute = `data-${filterType === "categorias" ? "categoria" : filterType}`
        const convocatoriaValue = convocatoria.getAttribute(dataAttribute)

        if (convocatoriaValue !== activeFilters[filterType]) {
          shouldShow = false
        }
      }
    })

    // Mostrar u ocultar la convocatoria con animación
    if (shouldShow) {
      convocatoria.style.display = "block"
      convocatoria.style.animation = "fadeInUp 0.5s ease-out"
    } else {
      convocatoria.style.display = "none"
    }
  })

  // Mostrar mensaje si no hay resultados
  updateNoResultsMessage()
}

// Función para mostrar mensaje cuando no hay resultados
function updateNoResultsMessage() {
  const convocatorias = document.querySelectorAll(".help-card[data-categoria]")
  const visibleConvocatorias = Array.from(convocatorias).filter((c) => c.style.display !== "none")

  // Remover mensaje anterior si existe
  const existingMessage = document.querySelector(".no-results-message")
  if (existingMessage) {
    existingMessage.remove()
  }

  if (visibleConvocatorias.length === 0) {
    const helpGrid = document.querySelector(".help-grid")
    const noResultsMessage = document.createElement("div")
    noResultsMessage.className = "no-results-message"
    noResultsMessage.style.cssText = `
            grid-column: 1 / -1;
            text-align: center;
            padding: 3rem;
            color: #155446;
            font-size: 1.2rem;
        `
    noResultsMessage.innerHTML = `
            <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; color: #c69a72;"></i>
            <h3>No se encontraron convocatorias</h3>
            <p>No hay convocatorias que coincidan con los filtros seleccionados.</p>
            <button onclick="clearAllFilters()" style="margin-top: 1rem; background: #155446; color: #f6e9ca; border: none; padding: 10px 20px; border-radius: 25px; cursor: pointer;">
                <i class="fas fa-times"></i> Limpiar Filtros
            </button>
        `
    helpGrid.appendChild(noResultsMessage)
  }
}

// Función para limpiar todos los filtros
function clearAllFilters() {
  activeFilters = {
    categoria: null,
    mes: null,
    ciudad: null,
    municipio: null,
  }

  updateFilterDisplay()
  filterConvocatorias()

  // Cerrar todos los dropdowns
  document.querySelectorAll(".filter-dropdown-content").forEach((dd) => {
    dd.classList.remove("show")
  })
}

// Event listeners para los enlaces de filtro
document.addEventListener("DOMContentLoaded", () => {
  // Agregar event listeners a todos los enlaces de filtro
  document.querySelectorAll(".filter-dropdown-content a").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const filterValue = this.getAttribute("data-filter")
      const dropdownId = this.closest(".filter-dropdown-content").id

      // Mapear el ID del dropdown al tipo de filtro
      const filterTypeMap = {
        categorias: "categoria",
        meses: "mes",
        ciudades: "ciudad",
        municipios: "municipio",
      }

      const filterType = filterTypeMap[dropdownId]
      applyFilter(filterType, filterValue)
    })
  })

  // Cerrar dropdowns al hacer clic fuera
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".filter-dropdown")) {
      document.querySelectorAll(".filter-dropdown-content").forEach((dd) => {
        dd.classList.remove("show")
      })
    }
  })
})

// Animación para mostrar los filtros aplicados
function showFilterAnimation() {
  const filterSection = document.querySelector(".convocatorias-filters")
  filterSection.style.animation = "pulse 0.3s ease-out"

  setTimeout(() => {
    filterSection.style.animation = ""
  }, 300)
}

console.log("🔍 Sistema de filtros de convocatorias cargado exitosamente!")
