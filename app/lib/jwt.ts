/* eslint-disable @typescript-eslint/no-explicit-any */
import * as jose from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function signToken(payload: any) {
  if(!process.env.JWT_SECRET) {
    throw new Error('JWT Assinatura não configurada!')
  }

  return await new jose.SignJWT(payload)
  .setProtectedHeader({ alg: 'HS256'})
  .setExpirationTime('1d')
  .sign(JWT_SECRET);
}

export async function verifyToken(token: string) {
  if(!process.env.JWT_SECRET) {
    throw new Error('JWT Assinatura não configurada!')
  }

  const { payload } = await jose.jwtVerify(token, JWT_SECRET);
  return payload;
}