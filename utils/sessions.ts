import { User } from "@/types";

export class SessionManager {
  static getToken(): string | null {
    return localStorage.getItem('sessionToken');
  }

  static setToken(token: string): void {
    localStorage.setItem('sessionToken', token);
  }

  static clearToken(): void {
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('userData');
  }

  static getUserData(): User | null {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  static setUserData(user: User): void {
    localStorage.setItem('userData', JSON.stringify(user));
  }
}