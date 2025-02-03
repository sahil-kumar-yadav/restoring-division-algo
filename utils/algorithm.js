
export function binoutHelper(num, left) {
  if (left === 0) return "";
  return binoutHelper(num >> 1, left - 1) + (num & 1);
}

export function binout(num, bits) {
  return binoutHelper(num, bits);
}

export function restoringDivision(dividend, divisor) {
  let A = 0;
  let Q = dividend;
  let M = divisor;
  let maxBits = Math.max(dividend.toString(2).length, divisor.toString(2).length);
  let steps = [];

  for (let i = maxBits - 1; i >= 0; i--) {
      let AQ = (A << maxBits) + Q;
      AQ <<= 1;
      A = (AQ >> maxBits) & ((1 << maxBits) - 1);
      Q = AQ & ((1 << maxBits) - 1);
      steps.push({ N: i, M: binout(M, maxBits), A: binout(A, maxBits), Q: binout(Q, maxBits) + "_", Operation: "Shift Left" });

      A -= M;
      steps.push({ N: i, M: binout(M, maxBits), A: binout(A, maxBits), Q: binout(Q, maxBits) + "_", Operation: "A = A - M" });

      if (A & (1 << (maxBits - 1))) {
          Q &= ~1;
          A += M;
          steps.push({ N: i, M: binout(M, maxBits), A: binout(A, maxBits), Q: binout(Q, maxBits), Operation: `Q[1] = 0` });
      } else {
          Q |= 1;
          steps.push({ N: i, M: binout(M, maxBits), A: binout(A, maxBits), Q: binout(Q, maxBits), Operation: "Q = Q[1] + 1" });
      }
  }
  return steps;
}