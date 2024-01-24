function generateArray(length, value) {
  return Array.from({ length }, () => value);
}

module.exports = {
  generateArray,
};
