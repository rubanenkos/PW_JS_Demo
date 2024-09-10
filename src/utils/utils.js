export async function getElementPropertyValue(element, value) {
  return await element.evaluate((el, value) => {
    return window.getComputedStyle(el).getPropertyValue(value);
  }, value);
}
