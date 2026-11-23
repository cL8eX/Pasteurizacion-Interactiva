-- ETAPA 23: Persistencia en nube del Diagrama PFD
-- Ejecutar en Supabase > SQL Editor una sola vez.
ALTER TABLE public.pfd_projects
ADD COLUMN IF NOT EXISTS pfd_diagram jsonb NOT NULL DEFAULT '[]'::jsonb;

-- La politica de UPDATE existente debe permitir al propietario actualizar sus proyectos.
-- Si no existe, ejecutar la politica incluida en SQL_CREAR_PROYECTOS.sql.
