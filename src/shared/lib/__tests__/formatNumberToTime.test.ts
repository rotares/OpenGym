import { describe, expect, test } from 'vitest';
import { formatNumberToTime } from '../formatNumberToTime';

describe('formatNumberToTime', () => {
  test('should return "0 мин." for input 0', () => {
    expect(formatNumberToTime(0)).toBe('0 мин.');
  });

  test('should return "1 мин." for input 1', () => {
    expect(formatNumberToTime(1)).toBe('1 мин.');
  });

  test('should return "59 мин." for input 59', () => {
    expect(formatNumberToTime(59)).toBe('59 мин.');
  });

  test('should return "1 ч. 0 мин." for input 60', () => {
    expect(formatNumberToTime(60)).toBe('1 ч. 0 мин.');
  });

  test('should return "2 ч. 30 мин." for input 150', () => {
    expect(formatNumberToTime(150)).toBe('2 ч. 30 мин.');
  });

  test('should return "10 ч. 45 мин." for input 645', () => {
    expect(formatNumberToTime(645)).toBe('10 ч. 45 мин.');
  });
});

