export interface User {
  id: string,
  email: string,
  password_hash: string,
  full_name: string,
  role: string,
  verification_token: string,
  created_at: string,
  updated_at: string
}
