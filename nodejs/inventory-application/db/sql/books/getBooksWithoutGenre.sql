SELECT
    books.id,
    title,
    authors.author,
    cover_s,
    cover_l
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
