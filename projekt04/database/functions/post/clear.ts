async function clear() {
    ["users", "posts", "session", "admins"].forEach((table)=>{
        db.exec(`DELETE FROM ${table}`);
    });
}