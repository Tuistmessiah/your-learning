import { sum, reverseString, isPalindrome, add, subtract, multiply, divide } from '../utils.js';

// sum (example)
test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

test('adds -1 + -1 to equal -2', () => {
    expect(sum(-1, -1)).toBe(-2);
});

// reverseString
test('reverses a string', () => {
    expect(reverseString('hello')).toBe('olleh');
});

test('reverses an empty string', () => {
    expect(reverseString('')).toBe('');
});

test('reverses a string with special characters', () => {
    expect(reverseString('!@#')).toBe('#@!');
});

// isPalindrome

test('identifies a palindrome', () => {
    expect(isPalindrome('madam')).toBe(true);
    expect(isPalindrome('A man, a plan, a canal, Panama')).toBe(true);
    expect(isPalindrome('12321')).toBe(true);
});

test('identifies a non-palindrome', () => {
    expect(isPalindrome('hello')).toBe(false);
    expect(isPalindrome('random string')).toBe(false);
    expect(isPalindrome('12345')).toBe(false);
});

// add, subtract, multiply, divide

test('adds two numbers', () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-1, 1)).toBe(0);
});

test('subtracts two numbers', () => {
    expect(subtract(5, 3)).toBe(2);
    expect(subtract(10, 10)).toBe(0);
});

test('multiplies two numbers', () => {
    expect(multiply(4, 5)).toBe(20);
    expect(multiply(-1, 10)).toBe(-10);
});

test('divides two numbers', () => {
    expect(divide(10, 2)).toBe(5);
    expect(divide(9, 3)).toBe(3);
});

test('throws an error when dividing by zero', () => {
    expect(() => divide(10, 0)).toThrow('Cannot divide by zero');
});