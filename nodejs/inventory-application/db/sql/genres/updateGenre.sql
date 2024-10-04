UPDATE genres 
SET genre = ${genre} 
WHERE 
  id = ${id} 
  AND NOT EXISTS (
    SELECT id 
    FROM genres 
    WHERE genre ILIKE ${genre}
  );
