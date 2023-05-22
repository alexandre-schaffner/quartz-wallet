/*
| Developed by Quartz Wallet
| Filename : jwt-payload.interface.ts
| Author : Alexandre Schaffner (alexandre.schaffner@icloud.com)
*/

/*
|--------------------------------------------------------------------------
| JWT PAYLOAD INTERFACE
|--------------------------------------------------------------------------
*/

export interface JwtPayload {
  sub: string;
  exp: number;
  jti: string;
  iat: number;
}
