UPDATE authors 
SET author = ${author} 
WHERE 
  id = ${id} 
  AND NOT EXISTS (
    SELECT id 
    FROM authors 
    WHERE author ILIKE ${author}
  );
