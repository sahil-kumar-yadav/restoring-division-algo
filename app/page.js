"use client";
import { useState } from "react";

function binoutHelper(num, left) {
    if (left === 0) return "";
    return binoutHelper(num >> 1, left - 1) + (num & 1);
}

function binout(num) {
    return binoutHelper(num, 8);
}

function restoringDivision(dividend, divisor) {
    let A = 0;
    let Q = dividend;
    let M = divisor;
    let steps = [];

    steps.push({ N: 8, M: binout(M), A: binout(A), Q: binout(Q), Operation: "Populate Data" });

    for (let i = 7; i >= 0; i--) {
        let AQ = (A << 8) + Q;
        AQ <<= 1;
        A = (AQ >> 8) & 0xFF;
        Q = AQ & 0xFF;
        steps.push({ N: i, M: binout(M), A: binout(A), Q: binout(Q) + "_", Operation: "Shift Left" });

        A -= M;
        steps.push({ N: i, M: binout(M), A: binout(A), Q: binout(Q) + "_", Operation: "A = A - M" });

        if (A & (1 << 7)) {
            Q &= ~1;
            A += M;
            steps.push({ N: i, M: binout(M), A: binout(A), Q: binout(Q), Operation: `Q[1] = 0` });
        } else {
            Q |= 1;
            steps.push({ N: i, M: binout(M), A: binout(A), Q: binout(Q), Operation: "Q = Q[1] + 1" });
        }
    }
    return steps;
}

export default function Home() {
    const [steps, setSteps] = useState([]);

    const handleCalculate = () => {
        setSteps(restoringDivision(8, 3));
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
