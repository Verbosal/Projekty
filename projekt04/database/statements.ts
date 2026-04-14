// Imports & declarations
import sqlite3 from "sqlite3";
const db = new sqlite3.Database("./database.db");

export default {
    "admin" : {
        grant : db.prepare("hi"),
    },
    
    "post" : {
        create : db.prepare("hi"),
    },

    "user" : {
        create : db.prepare("hi"),
    },
}