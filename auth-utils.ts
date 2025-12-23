import { hash, compare } from 'bcryptjs'
import { randomBytes } from 'crypto'

// const SALT_ROUNDS = 12
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000 // 7 jours

// export async function hashPassword(password: string): Promise<string> {
//   return hash(password, SALT_ROUNDS)
// }

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return compare(password, hashedPassword)
}

export function generateToken(): string {
  return randomBytes(32).toString('hex')
}

export function generateSessionToken(): string {
  return randomBytes(64).toString('hex')
}

export function getSessionExpiry(): string {
  return new Date(Date.now() + SESSION_DURATION).toISOString()
}
