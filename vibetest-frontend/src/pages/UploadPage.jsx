import React, { useState } from 'react';

// Inline SVG Icon for success
const CheckmarkIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
);

export default function UploadPage() {
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [zipFile, setZipFile] = useState(null);
    const [githubUrl, setGithubUrl] = useState('');
    const [codeSnippet, setCodeSnippet] = useState('');

    const handleScan = () => {
        setIsScanning(true);
        setProgress(0);
        setResult(null);

        // This is where we now use the state variables, resolving the ESLint error.
        // In a real application, you would send this data to an API for scanning.
        console.log("Starting scan with the following inputs:");
        console.log("ZIP File:", zipFile);
        console.log("GitHub URL:", githubUrl);
        console.log("Code Snippet:", codeSnippet);

        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setResult({ bugs: 7, score: 82, issues: 2 });
                    setIsScanning(false);
                    return 100;
                }
                return prev + 10;
            });
        }, 300);
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 antialiased text-slate-900">
            <div className="w-full max-w-2xl mx-auto">
                <header className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Upload Your App</h1>
                    <p className="text-lg text-slate-500">
                        Select a method to analyze your application's quality and security.
                    </p>
                </header>

                <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-slate-700 font-semibold mb-2">Upload ZIP</label>
                            <input
                                type="file"
                                accept=".zip"
                                onChange={e => setZipFile(e.target.files[0])}
                                className="w-full border border-slate-300 rounded-xl p-3 transition-colors duration-200 hover:border-indigo-500 cursor-pointer text-slate-500 focus:outline-none focus:ring focus:ring-indigo-200"
                            />
                        </div>

                        <div>
                            <label className="block text-slate-700 font-semibold mb-2">GitHub Repository URL</label>
                            <input
                                type="text"
                                placeholder="https://github.com/user/repo"
                                value={githubUrl}
                                onChange={e => setGithubUrl(e.target.value)}
                                className="w-full border border-slate-300 rounded-xl p-3 transition-colors duration-200 hover:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200"
                            />
                        </div>

                        <div>
                            <label className="block text-slate-700 font-semibold mb-2">Code Snippet</label>
                            <textarea
                                className="w-full border border-slate-300 rounded-xl p-3 h-32 transition-colors duration-200 hover:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200 resize-none"
                                placeholder="Paste your code here..."
                                value={codeSnippet}
                                onChange={e => setCodeSnippet(e.target.value)}
                            ></textarea>
                        </div>

                        <button
                            onClick={handleScan}
                            disabled={isScanning}
                            className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all duration-300 ease-in-out
                                ${isScanning
                                    ? "bg-slate-400 cursor-not-allowed"
                                    : "bg-indigo-600 shadow-lg hover:bg-indigo-700 hover:shadow-xl transform hover:-translate-y-1"
                                }`}
                        >
                            {isScanning ? "Scanning..." : "Run Scan"}
                        </button>
                    </div>

                    {progress > 0 && (
                        <div className="mt-10">
                            <div className="flex justify-between text-sm text-slate-600 mb-2 font-medium">
                                <span>Scanning in progress...</span>
                                <span>{progress}% Complete</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                                <div
                                    className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full rounded-full transition-all duration-500"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>
                    )}

                    {result && (
                        <div className="mt-10 p-8 bg-white border border-green-200 rounded-2xl shadow-md text-center">
                            <CheckmarkIcon className="w-16 h-16 mx-auto text-green-600 mb-4" />
                            <h3 className="text-2xl font-bold text-green-800 mb-2">Scan Complete!</h3>
                            <p className="text-slate-600 mb-4">
                                Your app has been successfully scanned.
                            </p>
                            <div className="grid grid-cols-3 gap-4 text-left">
                                <div className="p-4 bg-green-50 rounded-xl">
                                    <p className="text-sm font-semibold text-green-700">Bugs Found</p>
                                    <p className="text-2xl font-bold text-green-900">{result.bugs}</p>
                                </div>
                                <div className="p-4 bg-green-50 rounded-xl">
                                    <p className="text-sm font-semibold text-green-700">Performance Score</p>
                                    <p className="text-2xl font-bold text-green-900">{result.score}/100</p>
                                </div>
                                <div className="p-4 bg-green-50 rounded-xl">
                                    <p className="text-sm font-semibold text-green-700">Security Issues</p>
                                    <p className="text-2xl font-bold text-green-900">{result.issues}</p>
                                </div>
                            </div>
                            <button className="mt-6 bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-700 transition-colors duration-200">
                                View Full Report
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
