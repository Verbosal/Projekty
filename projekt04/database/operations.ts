// Optional operations before running the website

// Imports
import config from "../config.ts";

// Routes
import * as userOperations from "./functions/user.ts";
import * as adminOperations from "./functions/admin.ts";
import * as postOperations from "./functions/post.ts";

// Declarations
let optionals = config.optional;
let createOperations = optionals.create;
let clearOperations = optionals.clear;

let operations : {[boolean] : Function} = {
  [createOperations.users] : userOperations.populate,
  [createOperations.posts] : postOperations.populate,
  [createOperations.admins] : adminOperations.populate,

  [clearOperations.users] : userOperations.clear,
  [clearOperations.posts] : postOperations.clear,
  [clearOperations.admin_privileges] : adminOperations.clear
}

// Execute above operations
for (let [check, operation] of Object.entries(operations)) {
  if (check) {
    operation()
  }
}