import { connection } from "../../server";

export const getFlightInformation = async (
  departureTime: string,
  location: string,
  destination: string
) => {
  const [rows] = await (
    await connection
  ).execute(
    `SELECT * FROM travel_tickets.flightInformation WHERE (destinationAirportID = ? AND originAirportID = ? AND departureDate = ?);`,
    [destination, location, departureTime]
  );

  return rows;
};
