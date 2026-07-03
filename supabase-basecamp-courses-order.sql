-- Run once in Supabase → SQL Editor.
-- Sets the Basecamp Courses display order requested by the client, and moves
-- "The Summit" course to the First Responders tab (it was under Pet Owners).
-- Matching is done by a distinctive keyword in each course title.

-- 1. Basecamp Level 1 - Pet Owner CPR
UPDATE courses SET sort_order = 1 WHERE title ILIKE '%level 1%';

-- 2. Basecamp Level 2 - Pet Owner CPR + Field First Aid
UPDATE courses SET sort_order = 2 WHERE title ILIKE '%level 2%';

-- 3. The Ascent - Field First Aid for Working Dogs
UPDATE courses SET sort_order = 3 WHERE title ILIKE '%ascent%';

-- 4. The Summit - Veterinary Emergency Care for First Responders
--    (also fix its tab: Pet Owners -> First Responders)
UPDATE courses SET sort_order = 4, category = 'first-responders' WHERE title ILIKE '%summit%';

-- 5. The Practice - Veterinary CE
UPDATE courses SET sort_order = 5 WHERE title ILIKE '%practice%';

-- Verify
SELECT title, category, sort_order FROM courses ORDER BY sort_order NULLS LAST;
