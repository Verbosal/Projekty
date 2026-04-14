async function fetchPost(postId) {
    return await getResult(`
        SELECT userId, title, content
        FROM posts
        WHERE id = ${postId};
    `);
}