import { Request, Response } from "express";
import {
  getUserInformationQuery,
  registrationUserQuery,
} from "../utils/userQuery";

export const getLogIn = async (req: Request, res: Response) => {
    
  if (req.body !== undefined) {
    const result = await getUserInformationQuery(req.body.email);

    if (result) {
      //@ts-ignore
      req.session.user = result[0];

      res.status(200).json({
        status: "success",

        data: {
          isLogin: "true",
          //@ts-ignore
          user: req.session.user,
        },
      });
    } else {
      res.status(400).json({
        status: "fail",
      });
    }
  } else {
    res.status(400).json({
      status: "fail",
    });
  }
};

export const registrationUser = async (req: Request, res: Response) => {
  if (req.body) {
    if (
      req.body.firstName.trim() &&
      req.body.secondName.trim() &&
      req.body.email.trim() &&
      req.body.password.trim()
    ) {
      const result = await registrationUserQuery(
        req.body.firstName,
        req.body.secondName,
        req.body.email,
        req.body.password
      );

      if (result) {
        const userData = {
          firstName: req.body.firstName,
          secondName: req.body.secondName,
          email: req.body.email,
          password: req.body.password,
        };
        //@ts-ignore
        req.session.user = userData;
        res.status(200).json({
          status: "success",
          data: {
            isLogin: "true",
            user: userData,
          },
        });
      } else {
        res.status(400).json({
          status: "fail",
          message: "Invalid db query data",
        });
      }
    } else {
      res.status(400).json({
        status: "fail",
        message: "Empty requet body",
      });
    }
  }
};

export const getAuth = async (req: Request, res: Response) => {
    
  //@ts-ignore
  if (req.session.cookie.userID) {
    res.status(200).json({
      status: "success",
      data: {
        isLogin: "true",
        //@ts-ignore
        user: req.session.cookie[0],
      },
    });
  } else {
    res.status(300).json({
      status: "success",
      data: {
        isLogin: "false",
        user: {},
      },
    });
  }
};

export const logOut = (req: Request, res: Response) => {
  //@ts-ignore
  req.session = null;

  res.clearCookie("session-id");

  res.status(200).json({
    status: "success",
    data: {
      isLogin: "false",
      user: {},
    },
  });
};
