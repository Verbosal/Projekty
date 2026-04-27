// Imports & declarations
import express from 'express';
import statements from '../statements.ts';
const ops = statements.session

import {DatabaseSync} from "node:sqlite";
import {randomBytes} from "node:crypto";

const db = new DatabaseSync("./database/database.db", {readBigInts: true});

const SESSION_COOKIE = "__Host-forum-id";
const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;

export function create(userId : number, res : express.Response) {
  let sessionId = randomBytes(8).readBigInt64BE();
  let createdAt = Date.now();

  let session = ops.create.get(sessionId, userId, createdAt);
  res.locals.session = session;

  res.cookie(SESSION_COOKIE, session.id.toString(), {
    maxAge: ONE_WEEK,
    httpOnly: true,
    secure: true,
  });

  return session;
}

export function sessionHandler(req : express.Request, res : express.Response, next : express.NextFunction) {
  let sessionId = req.cookies[SESSION_COOKIE];
  let session = null;
  
  if (sessionId != null) {
    if (!sessionId.match(/^-?[0-9]+$/)) {
      // Invalid session id
      sessionId = null;
    } else {
      sessionId = BigInt(sessionId);
    }
  }

  // sessionId may look valid but might not exist in db
  if (sessionId != null) session = ops.fetch.get(sessionId);
  
  if (session != null) {
    res.locals.session = session;
    
    res.cookie(SESSION_COOKIE, res.locals.session.id.toString(), {
      maxAge: ONE_WEEK,
      httpOnly: true,
      secure: true,
    });
  } else {
    session = create(null, res);
  }

  setImmediate(printUserSession);

  next();

  function printUserSession() {
    console.info(
      "Session:",
      session.id,
      "user:",
      session.user,
      "created at:",
      new Date(Number(session.created_at)).toISOString()
    );
  }
}