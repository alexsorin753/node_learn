require('dotenv').config(); // using: "node -r dotenv/config app.js" in cmd - still works

// exporting enviornamental variables
module.exports = {
    port: process.env.port,
    host: process.env.host,
    user_id: process.env.USER_ID,
    user_key: process.env.USER_KEY
};