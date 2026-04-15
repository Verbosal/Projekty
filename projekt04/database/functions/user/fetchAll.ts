async function fetch(userId : number) {
    return await getResult(`
        SELECT username
        FROM users
        WHERE id = ${userId};
    `);
} //implement it giving you an array of public data about the user