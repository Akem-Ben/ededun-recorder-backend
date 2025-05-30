import { Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import generalHelpers from '../helpers/generalHelpers';
import userRepositories from '../repositories/userRepository';
import { APP_SECRET } from '../configurations/envKeys';

// export const generalAuthFunction = async (
//   request: JwtPayload,
//   response: Response,
//   next: NextFunction,
// ): Promise<any> => {
//   try {

    
//     const authorizationHeader = request.headers.authorization;

//     console.log(authorizationHeader)

//     if (!authorizationHeader) {
//       return response.status(401).json({
//         message: 'Please login again',
//       });
//     }

//     const refreshToken = request.headers['x-refresh-token'];


//     const authorizationToken = authorizationHeader.split(' ')[1];

//     if (!authorizationToken) {
//       return response.status(401).json({
//         status: 'Failed',
//         message: 'Login required',
//       });
//     }

//     let verifiedUser:any;
//     try {
//       verifiedUser = jwt.verify(authorizationToken, `${APP_SECRET}`);
//       console.log(verifiedUser)
//     } catch (error: any) {

//       if (error.message === 'jwt expired') {

//         if (!refreshToken) {
//           return response.status(401).json({
//             status: 'error',
//             message: 'Refresh Token not found. Please login again.',
//           });

//         }

//         let refreshVerifiedUser:any;
//         try {
//           refreshVerifiedUser = jwt.verify(refreshToken, `${APP_SECRET}`);
//           console.log(refreshVerifiedUser)
//         } catch (refreshError: any) {
//           return response.status(401).json({
//             status: 'error',
//             message: 'Refresh Token Expired. Please login again.',
//           });
//         }

//         const filter = { id: refreshVerifiedUser.id };

//         const projection = [ 'refreshToken' ];

//         const userDetails:any = await userRepositories.userRepositories.getOne(filter, projection)

//         if (refreshToken !== userDetails.refreshToken) {
//           return response.status(401).json({
//             status: 'error',
//             message: 'Please login again.',
//           });
//         }

//         const tokenPayload = {
//           id: refreshVerifiedUser.id,
//           email: refreshVerifiedUser.email,
//           role: refreshVerifiedUser.role
//         };

//         const newAccessToken = await generalHelpers.generateTokens(tokenPayload, '2h')
        

//         const newRefreshToken = await generalHelpers.generateTokens(tokenPayload, '30d')

//         response.setHeader('x-access-token', newAccessToken);

//         response.setHeader('x-refresh-token', newRefreshToken)

//         await userRepositories.userRepositories.updateOne(
//           { id: refreshVerifiedUser.id },
//           { refreshToken }
//         )

//         console.log('hut',refreshVerifiedUser)

//         request.user = refreshVerifiedUser;


//         return next();
//       }

//       return response.status(401).json({
//         status: 'error',
//         message: `Login Again, Invalid Token: ${error.message}`,
//       });
//     }

//       request.user = verifiedUser;

//       return next();

//   } catch (error: any) {
//     return response.status(500).json({
//       status: 'error',
//       message: `Internal Server Error: ${error.message}`,
//     });
//   }
// };

export const generalAuthFunction = async (
  request: JwtPayload,
  response: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    // Extract the authorization header
    const authorizationHeader = request.headers.authorization;

    console.log(authorizationHeader)

    // Check if the authorization header is present
    if (!authorizationHeader) {
      return response.status(401).json({
        status: 'Failed',
        message: 'Authorization header is missing. Please login again.',
      });
    }

    // Extract the token from the authorization header
    const accessToken = authorizationHeader.split(' ')[1];

    // Check if the access token is present
    if (!accessToken) {
      return response.status(401).json({
        status: 'Failed',
        message: 'Access token is missing. Please login again.',
      });
    }

    let verifiedUser: JwtPayload | string;
    try {
      // Verify the access token
      verifiedUser = jwt.verify(accessToken, APP_SECRET) as JwtPayload;

      // Attach the verified user to the request object
      request.user = verifiedUser;

      // Proceed to the next middleware or route handler
      return next();
    } catch (error: any) {
      // Handle token verification errors
      if (error.message === 'jwt expired') {
        return response.status(401).json({
          status: 'Failed',
          message: 'Access token expired. Please login again.',
        });
      }

      // Handle other JWT errors (e.g., invalid token)
      return response.status(401).json({
        status: 'Failed',
        message: `Invalid access token: ${error.message}`,
      });
    }
  } catch (error: any) {
    // Handle any unexpected errors
    return response.status(500).json({
      status: 'error',
      message: `Internal Server Error: ${error.message}`,
    });
  }
};

export function rolePermit(roles: string[]) {
  return async (request: JwtPayload, response: Response, next: NextFunction): Promise<any> => {
   
    const userRole = request.user.role
    const userId = request.user.id
    if (!userRole || !userId) {
      return response.status(401).json({
        status: 'error',
        message: 'User Not Authorized. Please login again',
      });
    }

    const isAuthorized = roles.includes(userRole);

    if (!isAuthorized) {
      return response.status(401).json({
        status: 'error',
        message: 'Not Permitted For Action',
      });
    }

    next();
  };
}

