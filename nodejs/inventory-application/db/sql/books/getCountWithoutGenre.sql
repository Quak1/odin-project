SELECT 
    COUNT(*) 
FROM
    books
    LEFT JOIN book_genre ON books.id = book_id 
WHERE
    genre_id IS NULL;
