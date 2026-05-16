// I used Copilot here for simple utility function suggestions then reviewed the logic manually
// The functions return sorted copies so the original UI values are not changed before assertion

// Return a new array of strings sorted from A to Z without changing the original array
export function sortTextAscending(values: string[]): string[] {
  return [...values].sort((a, b) => a.localeCompare(b));
}
// Return a new array of numbers sorted from high to low without changing the original array
export function sortNumbersDescending(values: number[]): number[] {
  return [...values].sort((a, b) => b - a);
}

// Convert SauceDemo price text like "$99.39" into a number
export function parsePrice(priceText: string): number {
  return Number(priceText.replace('$', ''));
}