// Imports & declarations
import statements from '../statements.ts';
const ops = statements.database

export function clear() {
    statements.database.clear.run()
}