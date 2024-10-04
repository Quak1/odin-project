DELETE FROM authors
WHERE id = ${id};

DELETE FROM books
WHERE author = ${id};
