DELETE FROM genres
WHERE id = ${id};

DELETE FROM book_genre
WHERE genre_id = ${id};
