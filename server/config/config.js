// Import dotenv to load environment variables from .env file
require("dotenv").config();

// Export the environment variables
module.exports = {
    port: process.env.PORT || 8080,
    api_version: `/${process.env.API}/${process.env.version}` || "/",
    dbconnection: `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@fableep-cluster0.btphd6t.mongodb.net/${process.env.DBNAME}`,
};
