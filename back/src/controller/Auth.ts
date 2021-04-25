import Axios from 'axios';
import { Request, Response } from 'express';
import { connection } from '../connection/Connection';
import { FitbitAccount } from '../entity/FitbitAccount';
import { User } from '../entity/User';
import AuthService from '../service/auth.service';
import querystring from 'querystring';

import UserService from '../service/user.service';

const CLIENT_ID = '22CDGB';
const CLIENT_SECRET = 'b891b07bfed49c9d8f5a2d2ad2831a78';

const fitbitHeaderAppAuthorization = Buffer.from(
  `${CLIENT_ID}:${CLIENT_SECRET}`,
).toString('base64');

type JwtPayload = {
  iss: string;
  sub: string;
  iat: string;
  exp: string;
};

class AuthController {
  private authService = AuthService;
  private userService = UserService;

  constructor() {
    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
    this.fitBitAuth = this.fitBitAuth.bind(this);
  }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const { user, isValid } = await this.authService.validateUser({
      email,
      password,
    });

    if (!isValid) {
      res.json({ statusCode: 400, message: 'Incorrect email or password' });
    } else {
      const token = this.authService.createToken(user.id);
      res.json({
        statusCode: 200,
        message: 'Successfully logged in!',
        token,
        user,
      });
    }
  }

  public async signUp(req: Request, res: Response) {
    const { failed, message, user } = await this.userService.createUser(
      req.body,
    );

    if (failed) {
      return res.json({ statusCode: 400, message });
    }

    const token = this.authService.createToken(user.id);

    res.json({
      statusCode: 200,
      message,
      token,
      user,
    });
  }

  public async fitBitAuth(req: Request, res: Response) {
    const authorizationCode = req.query.code;
    const userToken = req.query.state as string;

    const conn = await connection;
    let payload: undefined | JwtPayload;

    try {
      payload = this.authService.verifyToken(userToken) as any;
    } catch (error) {
      return res.status(403).json({ message: 'Invalid token.' });
    }

    //Find user
    const user = await conn.manager.findOne(User, payload.sub);

    // Check if there is any authorization code
    if (!authorizationCode) {
      return res.status(400).json({ message: 'Authorization code required.' });
    }

    // Prepare all data for the access_token request
    const axiosData = {
      client_id: CLIENT_ID,
      grant_type: 'authorization_code',
      redirect_uri: 'http://localhost:4000/api/auth/fitbit',
      code: authorizationCode,
    };

    // Axios configuration as required in Fitbit docs
    const axiosConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${fitbitHeaderAppAuthorization}`,
      },
    };

    try {
      const fitbitResponse = await Axios.post(
        'https://api.fitbit.com/oauth2/token',
        querystring.stringify(axiosData),
        axiosConfig,
      );

      // Extract useful information
      const fitbitUserId = fitbitResponse.data.user_id;
      const fitbitAccessToken = fitbitResponse.data.access_token;
      const fitbitRefreshToken = fitbitResponse.data.refresh_token;

      if (user.fitbit) {
        // Update fitbit account with new information
        user.fitbit.fitbitId = fitbitUserId;
        user.fitbit.accessToken = fitbitAccessToken;
        user.fitbit.refreshToken = fitbitRefreshToken;
        await conn.manager.save(user.fitbit);

        // UPDATED
        return res
          .status(200)
          .send(`<html><script>window.close();</script></html>`);
      } else {
        // Create new FitBit account and link it with the user
        const fitbitAcc = new FitbitAccount();
        fitbitAcc.user = user;
        fitbitAcc.accessToken = fitbitAccessToken;
        fitbitAcc.fitbitId = fitbitUserId;
        fitbitAcc.refreshToken = fitbitRefreshToken;
        await conn.manager.save(fitbitAcc);

        return res
          .status(200)
          .send(`<html><script>window.close();</script></html>`);
      }
    } catch (error) {
      // Error occured
      return res
        .status(400)
        .json({ message: 'Could not retrieve access token.' });
    }
  }
}

export = new AuthController();
