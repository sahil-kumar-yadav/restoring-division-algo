export function binoutHelper(num, left) {
  if (left === 0) return "";
  return binoutHelper(num >> 1, left - 1) + (num & 1);
}

export function binout(num, bits) {
  return binoutHelper(num, bits).padStart(bits, '0'); // Pad the binary output to match the bit length
}

export function restoringDivision(dividend, divisor) {
  let A = 0;
  let Q = dividend;
  let M = divisor;
  let maxBits = Math.max(4, Math.max(dividend.toString(2).length, divisor.toString(2).length));

  let steps = [];

  // Initial values
  steps.push({
    N: 0,
    M: binout(M, maxBits),
    A: binout(A, maxBits),
    Q: binout(Q, maxBits),
    Operation: "Initial value"
  });

  for (let i = maxBits - 1; i >= 0; i--) {
    // Step 1: Left shift A and Q
    let AQ = (A << maxBits) + Q;  // Combine A and Q into a single number for the left shift
    AQ <<= 1;  // Left shift the combined number by 1
    A = (AQ >> maxBits) & ((1 << maxBits) - 1);  // Extract the new A value
    Q = AQ & ((1 << maxBits) - 1);  // Extract the new Q value
    steps.push({
      N: maxBits - i - 1,
      M: binout(M, maxBits),
      A: binout(A, maxBits),
      Q: binout(Q, maxBits) + "_",
      Operation: "Left shift A and Q"
    });

    // Step 2: Subtract M from A
    A -= M;
    steps.push({
      N: maxBits - i,
      M: binout(M, maxBits),
      A: binout(A, maxBits),
      Q: binout(Q, maxBits) + "_",
      Operation: "A = A - M"
    });

    // Step 3: Check if A is negative
    if (A & (1 << (maxBits - 1))) {
      // If A is negative, set Q(0) to 0 and restore A
      Q &= ~1;  // Set the least significant bit of Q to 0
      A += M;  // Restore A
      steps.push({
        N: maxBits - i,
        M: binout(M, maxBits),
        A: binout(A, maxBits),
        Q: binout(Q, maxBits),
        Operation: "A is negative, set Q[0] to 0 and restore A"
      });
    } else {
      // If A is positive, set Q(0) to 1
      Q |= 1;  // Set the least significant bit of Q to 1
      steps.push({
        N: maxBits - i,
        M: binout(M, maxBits),
        A: binout(A, maxBits),
        Q: binout(Q, maxBits),
        Operation: "A is non-negative, set Q[0] to 1"
      });
    }
  }

  // Final result in steps
  return steps;
}
