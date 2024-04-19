import jwt, { decode } from "jsonwebtoken";
import jwksClient from "jwks-rsa";

export interface TokenPayload {
  email?: string;
  iat: number;
  exp: number;
}



export class BearerToken {
  static isValid(token?: string): boolean {
    const regex = /^(Bearer) ([^\s]+)$/;

    if (!token || !regex.test(token)) {
      return false;
    }

    const match = token.match(regex);

    return !(!match || match.length !== 3);
  }

  static decodeToken(bearerToken: string): TokenPayload {
    const token: string = bearerToken.substring(7);
    return decode(token) as TokenPayload;
  }

  static async verifyJwtToken(token: string, jwksUri: string): Promise<boolean> {
    const client = jwksClient({
      rateLimit: true,
      cache: true,
      jwksUri,
    });

    const keys = await client.getSigningKeys();

    const kid = keys[0].kid;

    const key = await client.getSigningKey(kid);

    const publicKey = key.getPublicKey();

    const decoded = jwt.verify(token.substring("Bearer ".length), publicKey, {
      algorithms: ["RS256"],
    });

    return !!decoded;
  }

}
