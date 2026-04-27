// Imports
import express from "express";

import main from "./main.ts";
import post from "./post.ts";
import account from "./account.ts";

// Router usages
for (let [path, router] of Object.entries({
  "/" : main,
  "/post" : post,
  "/account" : account
})) {
  express().use(path, router);
}