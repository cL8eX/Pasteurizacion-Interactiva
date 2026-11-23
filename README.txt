PFD Design - v28

Cambios de esta versión:
- En Diagramas de bloques, PFD y PFD 3D se oculta el menú lateral para una experiencia de editor limpia y amplia.
- Se agrega el selector Claro/Oscuro en la barra superior del espacio de trabajo, disponible en todas sus secciones.
- El tema seleccionado continúa guardándose en localStorage y se aplica globalmente.
- No se añadieron funcionalidades de edición de diagramas; se conserva el prototipo actual.

Para usar: abrir index.html mediante Live Server. Mantener supabase-config.js con la configuración actual.


V29 - Información editable del proyecto:
- En el espacio de proyecto hay un botón “Información del proyecto”.
- Permite editar nombre, organización, fecha, profesor/jefe/responsable, integrantes y logo.
- Para persistencia en Supabase, ejecutar el SQL actualizado en SQL_CREAR_PROYECTOS.sql (añade project_info y política UPDATE).
- El logo se reduce y comprime en el navegador para almacenarlo como datos de proyecto.


ACTUALIZACION PARA DIAGRAMAS EDITABLES:
En Supabase > SQL Editor, ejecutar el SQL actualizado incluido. Agrega la columna diagram JSONB a pfd_projects para guardar el diagrama de cada proyecto. La app carga un diagrama inicial HTST de pasteurización de leche, editable por nodos, textos, conectores y colores. Use el botón Guardar para persistir cambios.


PFD Design - Etapa 4
- Diagrama PFD de pasteurizacion reorganizado en cuatro bandas.
- Equipos con simbologia a color por categoria.
- Rutas de proceso y señales de instrumentacion.
- PFD guardado en almacenamiento local version v5.

Etapa 5: organización visual en cuatro bandas. Reemplazar el proyecto completo y recargar con Ctrl+Shift+R.
