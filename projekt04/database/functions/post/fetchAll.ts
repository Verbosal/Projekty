async function fetchPosts() {
    return await getResult(`
        SELECT id, title, content
        FROM posts;
    `);
}