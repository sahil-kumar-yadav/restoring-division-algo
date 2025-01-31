"use client"

import { decimalToBinary, restoringDivision } from "@/utils/algorithm";
import { useState } from "react";

export default function Home() {
  const [dividend, setDividend] = useState('');
  const [divisor, setDivisor] = useState('');
  const [steps, setSteps] = useState([]);
  
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    if (dividend === '' || divisor === '' || isNaN(dividend) || isNaN(divisor)) {
      alert('Please enter valid decimal numbers for both dividend and divisor.');
      return;
    }

    const dividendDecimal = parseInt(dividend, 10);
    const divisorDecimal = parseInt(divisor, 10);

    // Convert decimal to binary
    const binaryDividend = decimalToBinary(dividendDecimal, divisor.length);
    const binaryDivisor = decimalToBinary(divisorDecimal, divisor.length);
    
    let accumulator = '0'.repeat(binaryDividend.length); // Initial accumulator

    // Perform Restoring Division Algorithm and get all steps
    const resultSteps = restoringDivision(binaryDividend, binaryDivisor, accumulator, binaryDivisor.length);

    // Set the steps to display on the page
    setSteps(resultSteps);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-5xl p-6 bg-white shadow-xl rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Restoring Division Algorithm</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="dividend" className="block text-gray-700">Dividend (Decimal)</label>
            <input
              type="number"
              id="dividend"
              value={dividend}
              onChange={(e) => setDividend(e.target.value)}
              className="mt-2 p-2 w-full border border-gray-300 rounded"
              placeholder="Enter dividend"
            />
          </div>
          <div>
            <label htmlFor="divisor" className="block text-gray-700">Divisor (Decimal)</label>
            <input
              type="number"
              id="divisor"
              value={divisor}
              onChange={(e) => setDivisor(e.target.value)}
              className="mt-2 p-2 w-full border border-gray-300 rounded"
              placeholder="Enter divisor"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Perform Division
          </button>
        </form>

        {/* Display Steps in a Table */}
        {steps.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Steps</h2>
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2">N</th>
                  <th className="border border-gray-300 p-2">M</th>
                  <th className="border border-gray-300 p-2">A</th>
                  <th className="border border-gray-300 p-2">Q</th>
                  <th className="border border-gray-300 p-2">Operation</th>
                </tr>
              </thead>
              <tbody>
                {steps.map((step, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2 text-center">{step.N}</td>
                    <td className="border border-gray-300 p-2 text-center">{step.M}</td>
                    <td className="border border-gray-300 p-2 text-center">{step.A}</td>
                    <td className="border border-gray-300 p-2 text-center">{step.Q}</td>
                    <td className="border border-gray-300 p-2 text-center">{step.operation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}