// Executes optional operations before running the website defined in ../config.ts

// Imports
import mainConfig from "../config.ts";
import secondaryConfig from "../../config.ts";

// Routes
import * as user from "./database/user.ts";
import * as admin from "./database/admin.ts";
import * as post from "./database/post.ts";

// Declarations
let create = mainConfig.create;
let clear = mainConfig.clear;

let operations : {[Boolean]: Function} = {
  [create.users] : user.populate,
  [create.posts] : post.populate,
  [create.admins] : admin.populate,

  [clear.users] : user.clear,
  [clear.posts] : post.clear,
  [clear.admin_privileges] : admin.clear
}

// Execute above operations, if allowed by ../../config.ts
if (secondaryConfig.runOperations) {
  for (let [check, operation] of Object.entries(operations)) {
    if (check) {
      operation()
    }
  }
}