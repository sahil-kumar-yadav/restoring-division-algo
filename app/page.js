"use client";
import { restoringDivision } from "@/utils/algorithm";
import { useState } from "react";
import { motion } from "framer-motion";  // Import framer-motion for animations

export default function Home() {
    const [dividend, setDividend] = useState(0);
    const [divisor, setDivisor] = useState(1);
    const [steps, setSteps] = useState([]);
    const [animationKey, setAnimationKey] = useState(0);  // To trigger animation reset

    const handleCalculate = () => {
        if (divisor === 0) {
            alert("Divisor cannot be zero");
            return;
        }
        // Trigger animation reset
        setAnimationKey(prevKey => prevKey + 1);  // Increment key to reset animation
        setSteps(restoringDivision(parseInt(dividend), parseInt(divisor)));
    };

    return (
        <div className="p-8 my-4 max-w-4xl mx-auto bg-blue-950 shadow-lg rounded-lg">
            <h1 className="text-4xl font-bold text-center text-white mb-8">
                Restoring Division Algorithm
            </h1>

            {/* Input Fields */}
            <div className="mb-6 space-y-4">
                <input
                    type="number"
                    className="w-full p-4 bg-white rounded-xl shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
                    placeholder="Enter Dividend"
                    value={dividend}
                    onChange={(e) => setDividend(e.target.value)}
                />
                <input
                    type="number"
                    className="w-full p-4 bg-white rounded-xl shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
                    placeholder="Enter Divisor"
                    value={divisor}
                    onChange={(e) => setDivisor(e.target.value)}
                />
            </div>

            {/* Calculate Button */}
            <motion.button
                onClick={handleCalculate}
                className="w-full py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105 transition-transform duration-300"
                whileHover={{ scale: 1.05 }}
            >
                Calculate
            </motion.button>

            {/* Animated Table */}
            <motion.div
                key={animationKey}  // Reset animation each time the key changes
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8 overflow-x-auto p-6 rounded-xl bg-white shadow-xl"
            >
                <table className="w-full table-auto">
                    <thead className="bg-gray-100 text-gray-800">
                        <tr>
                            <th className="px-6 py-4 text-left">N</th>
                            <th className="px-6 py-4 text-left">M</th>
                            <th className="px-6 py-4 text-left">A</th>
                            <th className="px-6 py-4 text-left">Q</th>
                            <th className="px-6 py-4 text-left">Operation</th>
                        </tr>
                    </thead>

                    <motion.tbody
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        {steps.map((step, index) => (
                            <motion.tr
                                key={index}
                                className="text-center border-t border-gray-200 hover:bg-gray-50"
                                initial={{ opacity: 0, y: -50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.3, duration: 0.6 }}
                            >
                                <motion.td
                                    className="px-6 py-4"
                                    initial={{ x: -100 }}
                                    animate={{ x: 0 }}
                                    transition={{ delay: index * 0.3, duration: 0.5 }}
                                >
                                    {step.N}
                                </motion.td>
                                <motion.td
                                    className="px-6 py-4"
                                    initial={{ x: 100 }}
                                    animate={{ x: 0 }}
                                    transition={{ delay: index * 0.3, duration: 0.5 }}
                                >
                                    {step.M}
                                </motion.td>
                                <motion.td
                                    className="px-6 py-4"
                                    initial={{ x: -100 }}
                                    animate={{ x: 0 }}
                                    transition={{ delay: index * 0.3, duration: 0.5 }}
                                >
                                    {step.A}
                                </motion.td>
                                <motion.td
                                    className="px-6 py-4"
                                    initial={{ x: 100 }}
                                    animate={{ x: 0 }}
                                    transition={{ delay: index * 0.3, duration: 0.5 }}
                                >
                                    {step.Q}
                                </motion.td>
                                <motion.td
                                    className="px-6 py-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: index * 0.3, duration: 0.5 }}
                                >
                                    {step.Operation}
                                </motion.td>
                            </motion.tr>
                        ))}
                    </motion.tbody>
                </table>
            </motion.div>
        </div>
    );
}
