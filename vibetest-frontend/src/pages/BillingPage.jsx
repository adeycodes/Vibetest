// src/pages/BillingPage.jsx
import Navbar from '../components/Navbar';

export default function BillingPage() {
    return (
        <>
            <Navbar />
            <div className="max-w-3xl mx-auto p-8">
                <h1 className="text-3xl font-bold mb-8">Billing & Plans</h1>

                <div className="bg-white p-6 rounded-xl shadow mb-8">
                    <h2 className="text-xl font-semibold mb-2">Current Plan: Pro ($15/month)</h2>
                    <p className="text-gray-600">Next billing date: March 5, 2025</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow mb-8">
                    <h2 className="text-xl font-semibold mb-4">Upgrade Plan</h2>
                    <div className="space-y-4">
                        {["Free", "Pro", "Business"].map((plan) => (
                            <div key={plan} className="flex justify-between items-center p-3 border rounded-lg">
                                <span>{plan}</span>
                                <button className="bg-primary text-white px-4 py-1 rounded text-sm">Select</button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                    <input type="text" placeholder="Card number" className="border p-3 w-full mb-4 rounded" />
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <input type="text" placeholder="Expiry" className="border p-3 rounded" />
                        <input type="text" placeholder="CVV" className="border p-3 rounded" />
                    </div>
                    <h3 className="font-medium mb-2">Billing History</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                        <li>Jan 5, 2025 - $15 - Pro Plan</li>
                        <li>Dec 5, 2024 - $15 - Pro Plan</li>
                    </ul>
                </div>
            </div>
        </>
    );
}