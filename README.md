# Progress Report Mockup (KP2-4)

Mockup de la página de reportes de progreso con React.

## Características

- 📊 Tabla de reportes con datos de ejemplo
- ⬇️ Botón de descarga de Excel (simulado)
- 👁 Botón para ver filtros aplicados
- 🎨 Diseño responsive
- ✨ Animaciones y transiciones suaves

## Instalación

```bash
npm install
```

## Ejecutar el proyecto

```bash
npm start
```

El proyecto se abrirá en [http://localhost:3000](http://localhost:3000)

## Estructura del Proyecto

```
src/
├── components/
│   ├── ProgressReport.js       # Componente principal
│   ├── ProgressReport.css      # Estilos del componente principal
│   ├── ReportTable.js          # Tabla de reportes
│   └── ReportTable.css         # Estilos de la tabla
├── App.js                      # Componente raíz
├── App.css                     # Estilos globales de la app
├── index.js                    # Punto de entrada
└── index.css                   # Estilos base
```

## Funcionalidades

### Botón de Descarga
- Hace clic en el botón "Download" para simular la descarga de un archivo Excel
- En producción, este botón haría una llamada a la API para descargar el archivo real

### Ver Filtros
- Botón "View Filters" para mostrar los filtros aplicados a cada reporte

## Próximas Mejoras

- Integrar con API real para descargar archivos Excel
- Agregar paginación a la tabla
- Implementar filtros funcionales
- Agregar búsqueda de reportes
