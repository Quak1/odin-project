WITH existing AS (
    SELECT id
    FROM books
    WHERE title ILIKE ${title} AND author = ${author}
),
inserted AS (
    INSERT INTO books
        (title, author, year, rating, pages, cover_s, cover_l, description)
    SELECT
        ${title}, ${author}, ${year}, ${rating}, ${pages}, ${cover_s}, ${cover_l}, ${description}
    WHERE NOT EXISTS (SELECT 1 FROM existing)
    RETURNING id
)
SELECT COALESCE((SELECT id FROM existing), (SELECT id FROM inserted)) AS id;
