WITH existing AS (
    SELECT id
    FROM genres
    WHERE genre ILIKE ${genre}
),
inserted AS (
    INSERT INTO genres (genre)
    SELECT ${genre}
    WHERE NOT EXISTS (SELECT 1 FROM existing)
    RETURNING id
)
SELECT COALESCE((SELECT id FROM existing), (SELECT id FROM inserted)) AS id;
