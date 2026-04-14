async function revokeAdmin(userId) {
    db.exec(`
        DELETE FROM admins
        WHERE userId = "${userId}";
    `);
}