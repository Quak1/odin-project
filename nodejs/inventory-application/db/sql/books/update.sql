UPDATE books 
SET 
  title = ${title}, 
  author = ${author}, 
  year = ${year}, 
  rating = ${rating}, 
  pages = ${pages}, 
  cover_s = ${cover_s}, 
  cover_l = ${cover_l}, 
  description = ${description} 
WHERE 
  id = ${id} 
  AND NOT EXISTS (
    SELECT 1 
    FROM books as b 
    WHERE 
      b.title ILIKE ${title} 
      AND b.author = ${author} 
      AND b.id <> ${id}
  ) 
RETURNING id;
