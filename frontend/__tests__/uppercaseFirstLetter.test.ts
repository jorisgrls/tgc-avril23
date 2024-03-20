import { uppercaseFirstLetter } from '@/helpers/recipe/uppercaseFirstLetter';

describe('uppercaseFirstLetter', () => {
  it('converts first letter to uppercase and the rest to lowercase', () => {
    expect(uppercaseFirstLetter('hello')).toBe('Hello');
    expect(uppercaseFirstLetter('wORLD')).toBe('World');
    expect(uppercaseFirstLetter('tEst')).toBe('Test');
  });

  it('handles empty string correctly', () => {
    expect(uppercaseFirstLetter('')).toBe('');
  });

  it('handles single character string correctly', () => {
    expect(uppercaseFirstLetter('a')).toBe('A');
    expect(uppercaseFirstLetter('z')).toBe('Z');
  });

  it('handles special characters correctly', () => {
    expect(uppercaseFirstLetter('&')).toBe('&');
    expect(uppercaseFirstLetter('@abc')).toBe('@abc');
  });
});
