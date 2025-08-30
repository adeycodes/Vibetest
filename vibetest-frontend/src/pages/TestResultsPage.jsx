// src/pages/TestResultsPage.jsx
import { useState } from 'react';
import Navbar from '../components/Navbar';

export default function TestResultsPage() {
    const [tab, setTab] = useState('Code Quality');

    return (
        <>
            <Navbar />
            <div className="max-w-5xl w-screen mx-auto p-8">
                <h1 className="text-3xl font-bold mb-8">Test Results</h1>

                {/* Summary Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="p-6 bg-red-50 border border-red-200 rounded-xl">
                        <h3 className="text-red-800 font-semibold">Bugs Found</h3>
                        <p className="text-3xl font-bold text-red-700">9</p>
                    </div>
                    <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
                        <h3 className="text-yellow-800 font-semibold">Performance Score</h3>
                        <p className="text-3xl font-bold text-yellow-700">76</p>
                        <img src="http://localhost:8000/badge.php?score=85" />
                    </div>
                    <div className="p-6 bg-red-50 border border-red-200 rounded-xl">
                        <h3 className="text-red-800 font-semibold">Security Issues</h3>
                        <p className="text-3xl font-bold text-red-700">3</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mb-6 border-b">
                    {['Code Quality', 'Security', 'Performance'].map((t) => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            className={`px-4 py-2 font-medium ${tab === t ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-xl font-semibold mb-4">{tab}</h2>
                    <p className="text-gray-700">Detailed analysis and recommendations will appear here.</p>
                </div>

                <button className="mt-6 bg-primary text-white px-6 py-3 rounded-lg hover:bg-purple-700">
                    Download Report
                </button>
            </div>
        </>
    );
}