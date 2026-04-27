// Imports & declarations
import sqlite3 from "sqlite3";
const db = new sqlite3.Database("./database.db");

let statements : any = {
    database : {
        clear : `BEGIN TRANSACTION;`
    },

    admin : {
        clear : `DELETE FROM admins`,

        grant : `
            INSERT INTO admins
            (userID)
            VALUES (?);
        `,

        revoke : `
            DELETE FROM admins
            WHERE userID = ?;
        `,

        check : `
            SELECT EXISTS(SELECT userId
            FROM admins
            WHERE userId = ?)
        `
    },
    
    post : {
        clear : `DELETE FROM posts`,

        create : `
            INSERT INTO users
            (username, passhash, createdAt)
            VALUES (?, ?, ?)
            RETURNING id;
        `,

        remove : `
            DELETE FROM posts
            WHERE id = ?;
        `,

        fetch : {
            post : `
                SELECT userId, title, content
                FROM posts
                WHERE id = ?;
            `,

            allPosts : `
                SELECT id, title, content
                FROM posts;
            `
        },
    },

    user : {
        clear : `DELETE FROM users`,

        remove : `
            DELETE FROM users
            WHERE userId = ?
        `,

        fetch : {
            username : `
                SELECT username
                FROM users
                WHERE id = ?;
            `,

            info : `
                SELECT username, passhash
                FROM users
                WHERE userId = ?;
            `,

            allUsernames : `
                SELECT username
                FROM users;
            `
        }
    },

    session : {
        clear : `DELETE FROM sessions`,

        create: `
            INSERT INTO sessions (id, userId, createdAt)
            VALUES (?, ?, ?) RETURNING id, userId, createdAt;
        `,
        
        fetch: `
            SELECT id, userId, createdAt
            FROM sessions
            WHERE id = ?;
        `
    }
};

// Add a "clear all" statement to database operations
for (let [table, operations] of Object.entries(statements)) {
    if (table != "database") {
        statements.database.clear += operations.clear;
    }
}

statements.database.clear += "COMMIT;";

// Makes every string a prepared statement for execution as SQL!
function recursivelyPrepare(element : any) {
    if (element.constructor == Object) {
        Object.values(element).forEach(child => {
            recursivelyPrepare(child);
        });
    } else {
        element = db.prepare(element);
    }
}

recursivelyPrepare(statements); //Things like this is why a purely data-driven format isn't to my liking :P
export default statements; //<- yorp