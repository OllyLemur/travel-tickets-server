import { Request, Response } from "express";
import { getFlightInformation } from "../utils/flightsQuery";

export const getValidFlights = async (req: Request, res: Response) => {
    console.log(req.query);
    
  if (
    req.query.to !== undefined &&
    req.query.from !== undefined &&
    req.query.location !== undefined &&
    req.query.destination !== undefined
  ) {

    const resultTo = await getFlightInformation(
        //@ts-ignore
      req.query.from,
      req.query.destination,
      req.query.location
    );
    const resultFrom = await getFlightInformation(
        //@ts-ignore
        req.query.to,
        req.query.location,
        req.query.destination
      );

      console.log(resultFrom);
      console.log(resultTo);
      
      //@ts-ignore
      if(resultFrom[0] !== undefined && resultTo[0] !==  undefined) {
        res.status(200).json({
            status: 'success',
            data: {
                //@ts-ignore
                firstFlight: resultFrom,
                //@ts-ignore
                secondFlight: resultTo
            }
        })
      } else {
        res.status(404).json({
            status: "fail",
            error: 'There is no flight on the specified dates'
        })
      }

  } else {
    res.status(400).json({
      status: "fail",
    });
  }
};
