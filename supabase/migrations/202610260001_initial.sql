-- Apply once through Supabase migrations or the SQL editor.
create table public.trips (
 id uuid primary key default gen_random_uuid(),
 owner_id uuid not null references auth.users(id) on delete cascade,
 title text not null check (char_length(title) between 1 and 120),
 destination text not null check (char_length(destination) between 1 and 200),
 start_date date not null,
 end_date date not null check (end_date >= start_date),
 budget numeric(12,2) not null default 0 check (budget >= 0),
 currency text not null default 'USD' check (currency in ('USD','EUR','GBP')),
 created_at timestamptz not null default now()
);
create index trips_owner_id_idx on public.trips(owner_id);
alter table public.trips enable row level security;
create policy "Owners manage their trips" on public.trips for all to authenticated
 using ((select auth.uid()) = owner_id) with check ((select auth.uid()) = owner_id);

-- Private storage. Object names must begin with the owner's UUID followed by /.
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
 values ('trip-photos','trip-photos',false,5242880,array['image/jpeg','image/png','image/webp']);
create policy "Owners manage their photos" on storage.objects for all to authenticated
 using (bucket_id = 'trip-photos' and (storage.foldername(name))[1] = (select auth.uid())::text)
 with check (bucket_id = 'trip-photos' and (storage.foldername(name))[1] = (select auth.uid())::text);
