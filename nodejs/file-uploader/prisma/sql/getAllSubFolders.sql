WITH RECURSIVE subfolders AS (
    SELECT id, name
    FROM "Folder"
    WHERE id = $1
    UNION ALL

    SELECT f.id, f.name
    FROM "Folder" f
    INNER JOIN subfolders sf ON f."parentId" = sf.id
)
SELECT id, name
FROM subfolders;
