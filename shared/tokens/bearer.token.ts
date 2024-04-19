import jwt, { JwtPayload, decode } from "jsonwebtoken";
import jwksClient from "jwks-rsa";

export interface TokenPayloadInterface extends JwtPayload {
  me?: {
    email?: string;
  };
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

  static decodeToken(bearerToken: string): TokenPayloadInterface {
    const token: string = bearerToken.substring(7);
    return decode(token) as TokenPayloadInterface;
  }

  static async verifyJwtToken(token: string, jwksUri: string): Promise<boolean> {
    const client = jwksClient({
      rateLimit: true,
      cache: true,
      jwksUri,
    });

    const keys = await client.getSigningKeys();

    const { kid } = keys[0];

    const key = await client.getSigningKey(kid);

    const publicKey = key.getPublicKey();

    const decoded = jwt.verify(token.substring("Bearer ".length), publicKey, {
      algorithms: ["RS256"],
    });

    return !!decoded;
  }
}
