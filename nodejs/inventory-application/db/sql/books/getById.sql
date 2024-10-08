SELECT 
    books.id,
    books.title,
    ARRAY_AGG(ARRAY[ genres.genre, genres.id::text]) as genres,
    ARRAY[ authors.author, authors.id::text] as author,
    books.year,
    books.rating,
    books.pages,
    books.cover_l,
    books.cover_s,
    books.description
FROM
    books
    LEFT JOIN book_genre ON books.id = book_id 
    LEFT JOIN genres ON genres.id = genre_id
    JOIN authors ON books.author = authors.id
WHERE 
    books.id = ${id} 
GROUP BY 
    title, books.id, authors.author, authors.id;
