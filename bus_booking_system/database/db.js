
const mysql = require("mysql2");

let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Abhi@123',
    database: 'bus_reservation'

})
db.connect((err) => {
    if (err) {
        console.log("Error in Db Connection ", err);
        return;
    }
    console.log("Databse Connected");
})

module.exports = db;