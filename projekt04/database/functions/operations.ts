// Executes optional operations before running the website defined in ../config.ts
// Note: These operations won't run if you set runOperations in ../config.ts to false

// Imports
import config from "../config.ts";

// Routes
import * as user from "./database/users.ts";
import * as admin from "./database/admins.ts";
import * as post from "./database/posts.ts";

// Declarations
let create = config.create;
let clear = config.clear;

let operations : {[String]: Function} = {
  create : {
    ["users"] : user.populate,
    ["posts"] : post.populate,
    ["admins"]: admin.populate
  },

  clear : {
    ["users"] : user.clear,
    ["bans"] : user.clearBans,
    ["posts"] : post.clear,
    ["adminPrivileges"] : admin.clear
  }
}

// Execute above operations
for (let [name, set] of Object.entries(operations)) {
  for (let [operationName, operation] of Object.entries(set)) {
    if (config[name][operationName]) {
      operation()
    }
  }
}