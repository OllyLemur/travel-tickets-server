import { connection } from "../../server";

export const getUserInformationQuery = async (email: string) => {
  const [rows] = await (
    await connection
  ).execute(`SELECT * FROM users WHERE email = ?;`, [email]);

  return rows;
};

export const registrationUserQuery = async (
  firstName: string,
  secondName: string,
  email: string,
  password: string
) => {
  const [rows] = await (
    await connection
  ).execute(
    `INSERT users(LastName, FirstName, email, password)
            VALUES
              (?, ?, ?, ?);`,
    [firstName, secondName, email, password]
  );

  return rows;
};
