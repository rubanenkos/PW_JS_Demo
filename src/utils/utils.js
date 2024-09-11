/**
 * Gets the value of a CSS property from a given element.
 *
 * @param {import('@playwright/test').Locator} element - The Playwright locator object for the element.
 * @param {string} value - The name of the CSS property to retrieve.
 * @returns {Promise<string>} The value of the CSS property.
 */
export async function getElementPropertyValue(element, value) {
  return await element.evaluate((el, value) => {
    return window.getComputedStyle(el).getPropertyValue(value);
  }, value);
}
