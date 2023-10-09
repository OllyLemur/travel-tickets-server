import dotenv from "dotenv";
import app from "./app";
import mysql from "mysql2/promise";

dotenv.config({ path: `${__dirname}/env/.env.local` });

const PORT = process.env.PORT || 3100;

 export const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  port: Number(process.env.DB_PORT),
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});