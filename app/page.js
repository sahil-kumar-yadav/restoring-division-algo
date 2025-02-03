"use client";
import { restoringDivision } from "@/utils/algorithm";
import { useState } from "react";


export default function Home() {
    const [dividend, setDividend] = useState(0);
    const [divisor, setDivisor] = useState(1);
    const [steps, setSteps] = useState([]);

    const handleCalculate = () => {
        if (divisor === 0) {
            alert("Divisor cannot be zero");
            return;
        }
        setSteps(restoringDivision(parseInt(dividend), parseInt(divisor)));
    };

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Restoring Division Algorithm</h1>
            <div className="mb-4">
                <input
                    type="number"
                    className="w-full p-2 border rounded-lg mb-2"
                    placeholder="Enter Dividend"
                    value={dividend}
                    onChange={(e) => setDividend(e.target.value)}
                />
                <input
                    type="number"
                    className="w-full p-2 border rounded-lg"
                    placeholder="Enter Divisor"
                    value={divisor}
                    onChange={(e) => setDivisor(e.target.value)}
                />
            </div>
            <button onClick={handleCalculate} className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 w-full mb-6">
                Calculate
            </button>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">N</th>
                            <th className="border border-gray-300 px-4 py-2">M</th>
                            <th className="border border-gray-300 px-4 py-2">A</th>
                            <th className="border border-gray-300 px-4 py-2">Q</th>
                            <th className="border border-gray-300 px-4 py-2">Operation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {steps.map((step, index) => (
                            <tr key={index} className="text-center odd:bg-white even:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2">{step.N}</td>
                                <td className="border border-gray-300 px-4 py-2">{step.M}</td>
                                <td className="border border-gray-300 px-4 py-2">{step.A}</td>
                                <td className="border border-gray-300 px-4 py-2">{step.Q}</td>
                                <td className="border border-gray-300 px-4 py-2">{step.Operation}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}