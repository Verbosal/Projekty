async function removePost(postId) {
    db.exec(`
        DELETE FROM posts
        WHERE id = ${postId};
    `);
}