// Operations on bans

// Imports & declarations
import statements from '../statements.ts';
const ops = statements.bans

export function ban(userId : number) {
    ops.ban.run(userId);
}

export function unban(userId : number) {
    ops.unban.run(userId);
}

export function checkIf(userId : number) {
    ops.isBanned.run(userId);
}

export function clear() {
    ops.clear.run();
}