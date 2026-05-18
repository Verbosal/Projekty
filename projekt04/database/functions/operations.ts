// Executes optional operations before running the website defined in ../config.ts

// Imports
import config from "../config.ts";

// Routes
import * as user from "./database/user.ts";
import * as admin from "./database/admin.ts";
import * as post from "./database/post.ts";

// Declarations
let create = config.create;
let clear = config.clear;

let operations : {[boolean] : Function} = {
  [create.users] : user.populate,
  [create.posts] : post.populate,
  [create.admins] : admin.populate,

  [clear.users] : user.clear,
  [clear.posts] : post.clear,
  [clear.admin_privileges] : admin.clear
}

// Execute above operations
for (let [check, operation] of Object.entries(operations)) {
  if (check) {
    operation()
  }
}