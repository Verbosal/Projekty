// This file prepares statements found in ./statements.json for SQL usage

// Imports & declarations
import statements from "./statements.json" with {type: "json"};
import sqlite3 from "sqlite3";
const db = new sqlite3.Database("./database/database.db");

// Add a "clear all" statement to database operations
for (let [table, operations] of Object.entries(statements)) {
    if (table != "database") {
        statements.database.clear += " " + operations.clear;
    }
}

statements.database.clear += " COMMIT;"; // Close statement

// Modify (prepare) all statements for SQL
function recursivelyPrepare(directory : any) {
    Object.entries(directory).forEach(function([key, value]) {
        if (typeof value == "object") {
            recursivelyPrepare(value);
        } else {
            directory[key] = db.prepare(value);
        }
    });
}

recursivelyPrepare(statements);

export default statements; //Things like this is why a purely data-driven format isn't to my liking :P