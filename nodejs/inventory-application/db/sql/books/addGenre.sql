INSERT INTO book_genre (book_id, genre_id)
    VALUES (${bookId}, ${genreId})
ON CONFLICT DO NOTHING;
