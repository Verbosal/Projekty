async function fetch(userId) {
    return await getResult(`
        SELECT username
        FROM users
        WHERE id = ${userId};
    `);
} //implement it giving you an array of public data about the user