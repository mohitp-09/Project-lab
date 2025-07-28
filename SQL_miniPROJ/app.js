import mysql from "mysql2/promise";

const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "react",
  database: "mysql_db",
});

console.log("mysql connected successfully...");

//? create database

// await db.execute(`create database mysql_db`);
// console.log(await db.execute('show databases'));

//? create table

// await db.execute(`
//         CREATE TABLE users(
//             id INT AUTO_INCREMENT PRIMARY KEY,
//             username VARCHAR(100) NOT NULL,
//             email VARCHAR(100) NOT NULL UNIQUE
//         )
//     `);


//? insert data in table with inline

// await db.execute(`
//         insert into users(username, email) values('mohit', 'mohit@gmail.com')
//     `);


//* data insertion using prepared statements

// await db.execute(`insert into users(username, email) values(?,?)`, ["mohit patidar", "mohitofc@gmail.com"]);

//? read data
const [rows] = await db.execute(`select * from users`);
console.log(rows);


//? update row

// try {
//     const udpated = await db.query(`UPDATE users set username='monty' where email='mohitofc@gmail.com'`);
//     console.log("user updated successfully")
// } catch (error) {
//     console.log(error);
// }

//? delete user

// try {
//     await db.query(`DELETE from users where username='mohit'`);
//     console.log("user deleted successfully");
// } catch (error) {
//     console.log(error);
// }
