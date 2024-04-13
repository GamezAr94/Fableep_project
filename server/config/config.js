// Import dotenv to load environment variables from .env file
require("dotenv").config();

// Export the environment variables
module.exports = {
    port: process.env.PORT || 8080,
    api_version: `/${process.env.API}/${process.env.version}` || "/",
    dbconnection: `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@fableep-cluster0.btphd6t.mongodb.net/${process.env.DBNAME}`,
    jwt_secret: process.env.JWT_SECRET,
    jwt_expires_in: process.env.JWT_EXPIRES_IN,
};
