// lib/db-utils.ts
export function toMySQLDateTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toISOString().slice(0, 19).replace('T', ' ');
}

export function fromMySQLDateTime(mysqlDate: string): Date {
  return new Date(mysqlDate.replace(' ', 'T') + 'Z');
}