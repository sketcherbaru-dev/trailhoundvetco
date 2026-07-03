-- Run this ONCE in Supabase → SQL Editor to enable podcast audio uploads.
-- Creates a public "podcast-audio" storage bucket and allows uploads/reads.

-- 1. Create the public bucket (idempotent)
insert into storage.buckets (id, name, public)
values ('podcast-audio', 'podcast-audio', true)
on conflict (id) do update set public = true;

-- 2. Allow anyone to UPLOAD into this bucket (admin panel uses the anon key)
drop policy if exists "podcast_audio_insert" on storage.objects;
create policy "podcast_audio_insert"
  on storage.objects for insert
  to anon, authenticated
  with check (bucket_id = 'podcast-audio');

-- 3. Allow public READ of files in this bucket
drop policy if exists "podcast_audio_read" on storage.objects;
create policy "podcast_audio_read"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'podcast-audio');

-- 4. (Optional) allow overwriting/removing files from this bucket
drop policy if exists "podcast_audio_update" on storage.objects;
create policy "podcast_audio_update"
  on storage.objects for update
  to anon, authenticated
  using (bucket_id = 'podcast-audio');

drop policy if exists "podcast_audio_delete" on storage.objects;
create policy "podcast_audio_delete"
  on storage.objects for delete
  to anon, authenticated
  using (bucket_id = 'podcast-audio');
