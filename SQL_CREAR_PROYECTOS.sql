-- Ejecutar una sola vez en Supabase > SQL Editor
create table if not exists public.pfd_projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now()
);

create index if not exists pfd_projects_user_id_idx on public.pfd_projects(user_id);

alter table public.pfd_projects enable row level security;

-- Cada usuario solo puede consultar, crear y eliminar sus propios proyectos.
drop policy if exists "Users can read own PFD projects" on public.pfd_projects;
create policy "Users can read own PFD projects"
  on public.pfd_projects for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can create own PFD projects" on public.pfd_projects;
create policy "Users can create own PFD projects"
  on public.pfd_projects for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own PFD projects" on public.pfd_projects;
create policy "Users can delete own PFD projects"
  on public.pfd_projects for delete
  to authenticated
  using (auth.uid() = user_id);

-- Actualización para información editable del proyecto (ejecutar también si la tabla ya existe)
alter table public.pfd_projects add column if not exists project_info jsonb not null default '{}'::jsonb;

drop policy if exists "Users can update own PFD projects" on public.pfd_projects;
create policy "Users can update own PFD projects"
  on public.pfd_projects for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Diagrama editable por proyecto
alter table public.pfd_projects add column if not exists diagram jsonb not null default '{}'::jsonb;
