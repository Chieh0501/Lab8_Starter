// unit.test.js

const functions = require('../code-to-unit-test/unit-test-me.js');
test('is empty a phone number', () => {
  expect(functions.isPhoneNumber('')).toBe(false);
});
test('is 911 a phone number', () => {
  expect(functions.isPhoneNumber('911')).toBe(false);
});
test('is (858)241-4849 a phone number', () => {
  expect(functions.isPhoneNumber('(858)241-4849')).toBe(true);
});
test('is 858 241-4849 a phone number', () => {
  expect(functions.isPhoneNumber('858 241-4849')).toBe(true);
});

test('is empty an email', () => {
  expect(functions.isEmail('')).toBe(false);
});
test('is wc@hotmail.c an email', () => {
  expect(functions.isEmail('wc@hotmail.c')).toBe(false);
});
test('is wc@hotmail.cc an email', () => {
  expect(functions.isEmail('wc@hotmail.cc')).toBe(true);
});
test('is chung@ucsd.edu an email', () => {
  expect(functions.isEmail('chung@ucsd.edu')).toBe(true);
});


test('is empty a strong password', () => {
  expect(functions.isStrongPassword('')).toBe(false);
});
test('is q a strong password', () => {
  expect(functions.isStrongPassword('q')).toBe(false);
});
test('is U_15_713 a strong password', () => {
  expect(functions.isStrongPassword('U_15_713')).toBe(true);
});
test('is Strong_Password a strong password', () => {
  expect(functions.isStrongPassword('Strong_Password')).toBe(true);
});

test('is empty a valid Date', () => {
  expect(functions.isDate('')).toBe(false);
});
test('is 123/123 a valid Date', () => {
  expect(functions.isDate('123/123')).toBe(false);
});
test('is 12/25/2022 a valid Date', () => {
  expect(functions.isDate('12/25/2022')).toBe(true);
});
test('is 99/99/9999 a valid Date', () => {
  expect(functions.isDate('99/99/9999')).toBe(true);
});

test('is empty a HEX', () => {
  expect(functions.isHexColor('')).toBe(false);
});
test('is XXX a HEX', () => {
  expect(functions.isHexColor('XXX')).toBe(false);
});
test('is FFA a HEX', () => {
  expect(functions.isHexColor('FFA')).toBe(true);
});
test('is F36DC1 a HEX', () => {
  expect(functions.isHexColor('F36DC1')).toBe(true);
});
// TODO - Part 2