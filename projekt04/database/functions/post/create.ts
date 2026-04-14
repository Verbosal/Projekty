async function addPost(userId, title, content) {
    db.exec(`
        INSERT INTO posts
        (userId, title, content, createdAt)
        VALUES (${userId}, "${title}", "${content}", ${Date.now()});
    `);
}