SELECT 
    authors.id,
    authors.author,
    COUNT(title) as books
FROM 
    authors 
    JOIN books ON books.author = authors.id
GROUP BY 
    authors.id 
ORDER BY 
    authors.author ${order:raw}
