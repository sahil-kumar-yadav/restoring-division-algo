"use client";
import { useState } from "react";

function binoutHelper(num, left) {
    if (left === 0) return "";
    return binoutHelper(num >> 1, left - 1) + (num & 1);
}

function binout(num, bits) {
    return binoutHelper(num, bits);
}

function restoringDivision(dividend, divisor) {
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

export default function Home() {
    const [steps, setSteps] = useState([]);

    const handleCalculate = () => {
        setSteps(restoringDivision(5, 2));
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Restoring Division Algorithm</h1>
            <button onClick={handleCalculate} className="bg-blue-500 text-white px-4 py-2 mb-4">Calculate</button>
            <table className="table-auto w-full border-collapse border border-gray-400">
                <thead>
                    <tr>
                        <th className="border border-gray-400 px-2 py-1">N</th>
                        <th className="border border-gray-400 px-2 py-1">M</th>
                        <th className="border border-gray-400 px-2 py-1">A</th>
                        <th className="border border-gray-400 px-2 py-1">Q</th>
                        <th className="border border-gray-400 px-2 py-1">Operation</th>
                    </tr>
                </thead>
                <tbody>
                    {steps.map((step, index) => (
                        <tr key={index}>
                            <td className="border border-gray-400 px-2 py-1">{step.N}</td>
                            <td className="border border-gray-400 px-2 py-1">{step.M}</td>
                            <td className="border border-gray-400 px-2 py-1">{step.A}</td>
                            <td className="border border-gray-400 px-2 py-1">{step.Q}</td>
                            <td className="border border-gray-400 px-2 py-1">{step.Operation}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
