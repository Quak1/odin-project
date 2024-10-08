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
    JOIN book_genre ON books.id = book_id 
    JOIN genres ON genres.id = genre_id
    JOIN authors ON books.author = authors.id
WHERE
    genres.genre = ${genre}
ORDER BY
    ${orderBy:name} ${order:raw} 
LIMIT
    ${pageSize} OFFSET ${offset}; 
