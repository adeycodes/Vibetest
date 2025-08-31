import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoImg from "../assets/logo.png"

// Inline SVG Icons
const DashboardIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM4 18V8h16l-.01 10H4z" />
    </svg>
);

const AppsIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM7 7h10v10H7z" />
    </svg>
);

const TestResultsIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM8 18h8v-2H8v2zm0-4h8v-2H8v2zm-2-4h12V8h-6V2.5L14.5 8H18v8h-4v-4H8v4z" />
    </svg>
);

const CertificationIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99l-4.75-4.75L6.5 8.5l4.75 4.75L17.5 7.5 16 6l-4.75 4.99z" />
    </svg>
);

const BillingIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M21 4H3c-1.11 0-2 .89-2 2v12a2 2 0 002 2h18c1.11 0 2-.89 2-2V6a2 2 0 00-2-2zM3 18V6h18v12H3zm5-5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm10 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
    </svg>
);

const LogoutIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M17 7l-1.41 1.41L18.17 11H9v2h9.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
    </svg>
);

const ScanIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5a6.5 6.5 0 10-6.5 6.5c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </svg>
);

const BugIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M19 8h-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2H7a2 2 0 00-2 2v2a2 2 0 002 2h2v2a2 2 0 002 2h2a2 2 0 002-2v-2h2a2 2 0 002-2v-2a2 2 0 00-2-2z" />
    </svg>
);

const PassedIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
);


const sidebarItems = [
    { name: "Dashboard", icon: DashboardIcon },
    { name: "My Apps", icon: AppsIcon },
    { name: "Test Results", icon: TestResultsIcon },
    { name: "Certification", icon: CertificationIcon },
    { name: "Billing", icon: BillingIcon },
    { name: "Logout", icon: LogoutIcon }
];

const DashboardPage = ({ stats, apps, onNewScan, onLogout }) => (
    <>
        <header className="flex justify-between items-center mb-10">
            <h1 className="text-4xl font-extrabold text-slate-900">Developer Dashboard</h1>
            <button
                onClick={onNewScan}
                className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-indigo-700 transition-colors duration-200"
            >
                + New App Scan
            </button>
        </header>

        <div className="grid md:grid-cols-3 gap-8 mb-10">
            <div className="p-8 rounded-2xl bg-white shadow-lg border border-slate-200">
                <div className="flex items-center text-blue-600 mb-2">
                    <ScanIcon className="w-8 h-8 mr-3" />
                    <h3 className="text-lg text-slate-600">Scans Run</h3>
                </div>
                <p className="text-5xl font-extrabold text-blue-600">{stats?.total_scans || 0}</p>
            </div>
            <div className="p-8 rounded-2xl bg-white shadow-lg border border-slate-200">
                <div className="flex items-center text-red-600 mb-2">
                    <BugIcon className="w-8 h-8 mr-3" />
                    <h3 className="text-lg text-slate-600">Bugs Found</h3>
                </div>
                <p className="text-5xl font-extrabold text-red-600">{stats?.total_bugs || 0}</p>
            </div>
            <div className="p-8 rounded-2xl bg-white shadow-lg border border-slate-200">
                <div className="flex items-center text-green-600 mb-2">
                    <PassedIcon className="w-8 h-8 mr-3" />
                    <h3 className="text-lg text-slate-600">Passed Apps</h3>
                </div>
                <p className="text-5xl font-extrabold text-green-600">{stats?.passed_apps || 0}</p>
            </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
            <h2 className="text-2xl font-bold p-6 border-b border-slate-200">Recent Scans</h2>
            <div className="p-6">
                <table className="w-full text-left">
                    <thead className="text-slate-500 uppercase text-xs">
                        <tr>
                            <th className="p-3">App Name</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Last Scan</th>
                            <th className="p-3">Certification</th>
                        </tr>
                    </thead>
                    <tbody>
                        {apps && apps.length > 0 ? apps.map((app, index) => (
                            <tr key={index} className="border-t border-slate-100 hover:bg-slate-50 transition-colors duration-200">
                                <td className="p-4 font-semibold text-slate-800">{app.name}</td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${app.status === "completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                                        {app.status === "completed" ? "Completed" : app.status}
                                    </span>
                                </td>
                                <td className="p-4 text-slate-600">{app.last_scan ? new Date(app.last_scan).toLocaleDateString() : "Never"}</td>
                                <td className="p-4">
                                    <span className="text-indigo-600 font-semibold">{app.certification === "Certified" ? "✅ Certified" : "❌ Not Certified"}</span>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="4" className="p-8 text-center text-slate-500">
                                    No apps uploaded yet. Click "New App Scan" to get started!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    </>
);

const MyAppsPage = ({ apps }) => (
    <>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-8">My Apps</h1>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
            <h2 className="text-2xl font-bold p-6 border-b border-slate-200">All Applications</h2>
            <div className="p-6">
                <table className="w-full text-left">
                    <thead className="text-slate-500 uppercase text-xs">
                        <tr>
                            <th className="p-3">App Name</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Last Scan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {apps && apps.length > 0 ? apps.map((app, index) => (
                            <tr key={index} className="border-t border-slate-100 hover:bg-slate-50 transition-colors duration-200">
                                <td className="p-4 font-semibold text-slate-800">{app.name}</td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${app.status === "completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                                        {app.status === "completed" ? "Completed" : app.status}
                                    </span>
                                </td>
                                <td className="p-4 text-slate-600">{app.last_scan ? new Date(app.last_scan).toLocaleDateString() : "Never"}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="3" className="p-8 text-center text-slate-500">
                                    No apps uploaded yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    </>
);

const TestResultsPage = () => (
    <>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Test Results</h1>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
            <h2 className="text-2xl font-bold p-6 border-b border-slate-200">Scan History</h2>
            <div className="p-6">
                <table className="w-full text-left">
                    <thead className="text-slate-500 uppercase text-xs">
                        <tr>
                            <th className="p-3">Test ID</th>
                            <th className="p-3">App Name</th>
                            <th className="p-3">Bugs Found</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockTestResults.map((result, index) => (
                            <tr key={index} className="border-t border-slate-100 hover:bg-slate-50 transition-colors duration-200">
                                <td className="p-4 font-semibold text-slate-800">{result.id}</td>
                                <td className="p-4 font-semibold text-slate-800">{result.appName}</td>
                                <td className="p-4 text-slate-600">{result.bugsFound}</td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${result.status === "Passed" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                        {result.status}
                                    </span>
                                </td>
                                <td className="p-4 text-slate-600">{result.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </>
);

const CertificationPage = () => (
    <>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Certification</h1>
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200 text-center">
            <CertificationIcon className="w-24 h-24 mx-auto text-indigo-600 mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Certification Program</h2>
            <p className="text-lg text-slate-600">
                Congratulations! All your apps currently meet the requirements for certification. You can view your certified apps in the My Apps section.
            </p>
        </div>
    </>
);

const BillingPage = () => (
    <>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Billing</h1>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
            <h2 className="text-2xl font-bold p-6 border-b border-slate-200">Invoices</h2>
            <div className="p-6">
                <table className="w-full text-left">
                    <thead className="text-slate-500 uppercase text-xs">
                        <tr>
                            <th className="p-3">Invoice ID</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Amount</th>
                            <th className="p-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockBillingData.map((invoice, index) => (
                            <tr key={index} className="border-t border-slate-100 hover:bg-slate-50 transition-colors duration-200">
                                <td className="p-4 font-semibold text-slate-800">{invoice.invoiceId}</td>
                                <td className="p-4 text-slate-600">{invoice.date}</td>
                                <td className="p-4 font-semibold text-slate-800">{invoice.amount}</td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${invoice.status === "Paid" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                        {invoice.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </>
);

const LogoutPage = () => (
    <>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Logout</h1>
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">You have been logged out.</h2>
            <p className="text-lg text-slate-600">Thank you for using our dashboard.</p>
        </div>
    </>
);

export default function App() {
    const [currentPage, setCurrentPage] = useState("Dashboard");
    const [stats, setStats] = useState(null);
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            // Fetch stats
            const statsRes = await fetch('http://localhost:8000/api/stats.php', {
                credentials: 'include'
            });
            
            // Fetch apps
            const appsRes = await fetch('http://localhost:8000/api/apps.php', {
                credentials: 'include'
            });

            if (statsRes.status === 401 || appsRes.status === 401) {
                // User not authenticated, redirect to login
                navigate('/login');
                return;
            }

            if (statsRes.ok) {
                const statsData = await statsRes.json();
                setStats(statsData.stats);
            }

            if (appsRes.ok) {
                const appsData = await appsRes.json();
                setApps(appsData.apps || []);
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleNewScan = () => {
        navigate('/upload');
    };

    const handleLogout = async () => {
        try {
            await fetch('http://localhost:8000/auth/logout.php', {
                credentials: 'include'
            });
            localStorage.removeItem('user');
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
            navigate('/login');
        }
    };

    const renderPage = () => {
        if (loading) {
            return (
                <div className="flex items-center justify-center h-64">
                    <div className="text-xl text-slate-600">Loading...</div>
                </div>
            );
        }

        switch (currentPage) {
            case "Dashboard":
                return <DashboardPage stats={stats} apps={apps} onNewScan={handleNewScan} />;
            case "My Apps":
                return <MyAppsPage apps={apps} />;
            case "Test Results":
                return <TestResultsPage />;
            case "Certification":
                return <CertificationPage />;
            case "Billing":
                return <BillingPage />;
            case "Logout":
                handleLogout();
                return <LogoutPage />;
            default:
                return <DashboardPage stats={stats} apps={apps} onNewScan={handleNewScan} />;
        }
    };

    return (
        <div className="flex h-screen bg-slate-100 font-sans antialiased text-slate-900">
            {/* Sidebar */}
            <aside className="w-64 flex flex-col items-center bg-slate-900 text-slate-300 p-6 shadow-xl">
                <div className="text-2xl font-bold flex items-center justify-center w-full bg-white mb-10">
                    <img src={LogoImg} width="50" alt="" srcset="" />

                </div>
                <nav className="w-full space-y-2">
                    {sidebarItems.map((item) => (
                        <div
                            key={item.name}
                            onClick={() => setCurrentPage(item.name)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors duration-200 ease-in-out cursor-pointer group
                                ${currentPage === item.name ? "bg-indigo-600 text-white" : "hover:bg-indigo-600 hover:text-white"}`}
                        >
                            <item.icon className={`w-5 h-5 ${currentPage === item.name ? "text-white" : "text-slate-400 group-hover:text-white"}`} />
                            <span className="text-lg">{item.name}</span>
                        </div>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10 overflow-auto">
                {renderPage()}
            </main>
        </div>
    );
}
