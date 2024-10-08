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
ORDER BY
    ${orderBy:name} ${order:raw} 
LIMIT
    ${pageSize} OFFSET ${offset};
