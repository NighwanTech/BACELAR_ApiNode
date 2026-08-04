import { v4 as uuidv4, v1 as uuidv1 } from 'uuid';

export function generateId(): string {
  return uuidv4();
}

export function generateTimeBasedId(): string {
  return uuidv1();
}

export function generateShortId(prefix = ''): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}${timestamp}${random}`;
}

export function generateNumericId(length = 8): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10).toString();
  }
  return result;
}
