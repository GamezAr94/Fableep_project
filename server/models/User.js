const users = [];

class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    // save user to the array
    save() {
        // Check if user already exists
        if (users.some((user) => user.username === this.username)) {
            return { success: false, message: "User already exists" };
        }

        // Store user credentials
        users.push(this);
        return { success: true, message: "User created successfully" };
    }

    static fetchAll() {
        return users;
    }
}

module.exports = User;
