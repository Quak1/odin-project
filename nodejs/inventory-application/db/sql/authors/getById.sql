SELECT 
    authors.id as author_id,
    authors.author,
    books.id as book_id,
    books.title,
    books.year,
    books.rating,
    books.cover_s,
    books.cover_l
FROM
    authors
    JOIN books ON authors.id = books.author
WHERE 
    authors.id = ${id} 
ORDER BY
    books.year ASC
