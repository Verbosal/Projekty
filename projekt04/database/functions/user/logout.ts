async function logout(user) {
    if (user !== null) {
        session.deleteSession(user);
    }
}