SELECT
    books.id,
    title,
    authors.author,
    cover_s,
    cover_l
FROM
    books
    JOIN authors ON authors.id = books.author
ORDER BY
    ${orderBy:name} ${order:raw} 
LIMIT
    ${pageSize} OFFSET ${offset}; 
