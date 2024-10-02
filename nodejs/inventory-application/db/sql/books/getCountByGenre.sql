SELECT 
    COUNT(*) 
FROM
    books
    JOIN book_genre ON books.id = book_id 
    JOIN genres ON genres.id = genre_id
WHERE genres.genre = ${genre};
