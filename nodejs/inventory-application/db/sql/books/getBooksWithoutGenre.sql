SELECT
    books.id,
    books.title,
    authors.author,
    authors.id AS author_id,
    books.cover_s,
    books.year,
    books.pages,
    books.rating
FROM
    books
    JOIN authors ON authors.id = books.author
    LEFT JOIN book_genre on books.id = book_id
WHERE
    genre_id IS NULL
ORDER BY
    ${orderBy:name} ${order:raw} 
LIMIT
    ${pageSize} offset ${offset};
