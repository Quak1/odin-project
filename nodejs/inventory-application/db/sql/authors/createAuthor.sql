WITH existing AS (
    SELECT id
    FROM authors
    WHERE author ILIKE ${author}
),
inserted AS (
    INSERT INTO authors (author)
    SELECT ${author}
    WHERE NOT EXISTS (SELECT 1 FROM existing)
    RETURNING id
)
SELECT COALESCE((SELECT id FROM existing), (SELECT id FROM inserted)) AS id;
