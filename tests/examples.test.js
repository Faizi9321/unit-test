import { describe, expect, it, test } from "vitest";
import { longestString, isPrime, shippingCost } from "../src/examples";

describe("example.longestString", () => {
  // verifying longest string
  it("returns the longest string", () => {
    expect(longestString("hello", "world")).toBe("hello");
    expect(longestString("hi", "there")).toBe("there");
  });
  // 'test' is an alias of 'it'
  test("returns the first string when both are of equal length", () => {
    expect(longestString("ditto", "pidgy")).toBe("ditto");
  });
  // testing edge cases
  it("handles empty strings", () => {
    expect(longestString("", "hello")).toBe("hello");
    expect(longestString("hello", "")).toBe("hello");
    expect(longestString("", "")).toBe("");
  });
  //other edge cases
  it("ignoring leading/trailing whitespace", () => {
    expect(longestString("  hello  ", "world")).toBe("  hello  ");
    expect(longestString("  world  ", "hello")).toBe("  world  ");
  });
});

describe("examples.isPrime", () => {
  // testing prime numbers
  it("returns true/truthy for small prime number", () => {
    expect(isPrime(2)).toBe(true);
    expect(isPrime(3)).toBe(true);
    expect(isPrime(5)).toBeTruthy();
  });
  // testing non-prime numbers
  it("returns false/falsy for non-prime numbers", () => {
    expect(isPrime(4)).toBe(false);
    expect(isPrime(6)).toBe(false);
    expect(isPrime(9)).toBeFalsy();
  });
  // is equal to
  it("matches result in an array using toEqual", () => {
    const numbers = [2, 3, 4, 5];
    const result = numbers.map((n) => isPrime(n));
    expect(result).toEqual([true, true, false, true]);
  });
  // detect prime withing list
  it("detects primes within a list of numbers", () => {
    const numbers = [2, 3, 4, 5, 6, 7];
    const primes = numbers.filter((n) => isPrime(n));
    expect(primes).toContain(7);
    expect(primes).not.toContain(4);
  });
  // throw and error
  it("throw an error when passed a non number", () => {
    const badCall = () => isPrime("not a number");
    expect(badCall).toThrow();
    expect(badCall).toThrow("Input must be a number");
  });
  // correct type of result
  it("has correct type for result", () => {
    expect(isPrime(7)).toBeTypeOf("boolean");
    expect(isPrime(Number("7"))).toBe(true);
  });
});

describe("new test cases for prime numbers", () => {
  it("treats as 0 and 1 as non prime and 2 are prime", () => {
    expect(isPrime(0)).toBe(false);
    expect(isPrime(1)).toBe(false);
    expect(isPrime(2)).toBe(true);
  });
});

describe("examples.shippingCost", () => {
  it.each([
    [1, 3.99],
    [5, 5.99],
    [10, 8.99],
    [20, 8.99],
    [21, 14.99],
  ])("calculates shipping cost based on weight", (weight, expectedCost) => {
    expect(shippingCost(weight)).toBe(expectedCost);
  });

  it.each([
    [1, 3.99],
    [5, 5.99],
    [20, 8.99],
    [21, 14.99],
  ])("charges correct prices at boundaries", (weight, expectedCost) => {
    expect(shippingCost(weight)).toBe(expectedCost);
  });

  it.each([
    [10, "INVALIDCOUPON", 8.99],
    [5, "ANOTHERCODE", 5.99],
  ])(
    "applys 'FREESHIPPING' coupon correctly",
    (weight, coupon, expectedCost) => {
      console.log(weight, coupon, expectedCost);

      expect(shippingCost(weight, coupon)).toBe(expectedCost);
    },
  );

  it.each([
    [10, "INVALIDCOUPON", 8.99],
    [5, "ANOTHERCODE", 5.99],
  ])("ignores invalid coupons", (weight, coupon, expectedCost) => {
    expect(shippingCost(weight, coupon)).toBe(expectedCost);
  });

  it.each([
    [-1, "Weight must be greater than 0"],
    [null, "Weight must be a number"],
  ])("throws error for invalid weight", (weight, expectedError) => {
    expect(() => shippingCost(weight)).toThrow(expectedError);
  });
});
