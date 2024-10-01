SELECT
    authors.author,
    books.id,
    books.title,
    books.cover_s,
    books.cover_l
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
