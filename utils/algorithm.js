// utils/algorithm.js

// Function to add two binary numbers
export function add(A, M) {
  let carry = 0;
  let Sum = '';
  for (var i = A.length - 1; i >= 0; i--) {
    let temp = (A[i]) + parseInt(M[i]) + carry;
    if (temp >= 1) {
      Sum += String(temp % 2);
      carry = 1;
    } else {
      Sum += String(temp);
      carry = 0;
    }
  }
  return Sum.charAt(Sum.length - 1);
}

// Function to find the complement of the given binary number
export function complement(m) {
  let M = '';
  for (var i = 0; i < m.length; i++) {
    M += String((parseInt(m[i]) + 1) % 2);
  }
  M = add(M, '0001');
  return M;
}

// Function to convert decimal to binary with padding to fit the divisor's bit length
export function decimalToBinary(num, length) {
  let binary = (num >>> 0).toString(2);
  return binary.padStart(length, '0');  // Pad the binary number to fit the length
}

// Function to find the quotient and remainder using the Restoring Division Algorithm
export function restoringDivision(Q, M, A, steps) {
  let count = steps; // Limit steps to the number of bits in the divisor
  const resultSteps = []; // To store the steps
  let operation = '';

  // Save initial step
  resultSteps.push({
    N: count,
    M: M,
    A: A,
    Q: Q,
    operation: 'Populate Data'
  });

  while (count > 0) {
    // Save step before shifting
    resultSteps.push({
      N: count,
      M: M,
      A: A,
      Q: Q,
      operation: 'Shift Left'
    });

    // Step 1: Left Shift, assign LSB of Q to MSB of A
    A = A[1] + Q[0];

    // Step 2: A - M
    let comp_M = complement(M);
    A = add(A, comp_M);
    operation = 'A = A - M';

    // Save the step after subtraction
    resultSteps.push({
      N: count - 1,
      M: M,
      A: A,
      Q: Q,
      operation: operation
    });

    // Check if A[0] is 1 (unsuccessful)
    if (A[0] == '1') {
      Q = Q[1] + '0'; // Q[1] + 0
      operation = 'Q[1] = 0'; // Unsuccessful operation
      A = add(A, M); // Restoration of A
      resultSteps.push({
        N: count - 1,
        M: M,
        A: A,
        Q: Q,
        operation: 'A = A + M (Restoration)'
      });
    } else {
      Q = Q[1] + '1'; // Q[1] + 1
      operation = 'Q[1] = 1'; // Successful operation
    }

    // Save final step
    resultSteps.push({
      N: count - 1,
      M: M,
      A: A,
      Q: Q,
      operation: operation
    });

    count -= 1;
  }

  // Return all the steps
  return resultSteps;
}
