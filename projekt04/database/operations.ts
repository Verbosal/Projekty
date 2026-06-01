// Executes optional operations before running the website defined in ../config.ts
// Note: These operations won't run if you set runOperations in ../config.ts to false

// Imports
import config from "./config.ts";

// Routes
import * as user from "./functions/users.ts";
import * as admin from "./functions/admins.ts";
import * as post from "./functions/posts.ts";
import * as bans from "./functions/bans.ts";

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
    ["bans"] : bans.clear,
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