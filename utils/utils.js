module.exports = {
  random: (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },

  intersects: (x1, y1, w1, h1, x2, y2, w2, h2) => {
    if (w2 !== Infinity && w1 !== Infinity) {
      w2 += x2;
      w1 += x1;
      if (isNaN(w1) || isNaN(w2) || x2 > w1 || x1 > w2) return false;
    }

    if (y2 !== Infinity && h1 !== Infinity) {
      h2 += y2;
      h1 += y1;
      if (isNaN(h1) || isNaN(y2) || y2 > h1 || y1 > h2) return false;
    }

    return true;
  }
};
