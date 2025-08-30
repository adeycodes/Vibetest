// src/pages/SignupPage.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function SignupPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:8000/auth/signup.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        const data = await res.json();
        if (res.ok) {
            alert('Account created! Please log in.');
            navigate('/login');
        } else {
            setError(data.message);
        }
    };

    return (
        <>
            <Navbar />
            <div className="max-w-sm mx-auto p-8 mt-40 mb-20 bg-white rounded-2xl shadow-xl border border-slate-200">
                <h2 className="text-3xl text-center text-slate-900 font-bold mb-8">Create Account</h2>
                {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm text-slate-700 font-medium mb-1">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            placeholder='John Doe'
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-slate-700 font-medium mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            placeholder="youremail@email.com"
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-slate-700 font-medium mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            placeholder='**********'
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        onClick={() => window.location.href = "/login"}
                        className="w-full px-4 py-2 text-white bg-indigo-600 font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                    >
                        Create Account
                    </button>

                    <div className='flex items-center my-4'>
                        <hr className='flex-grow border-t border-slate-200' />
                        <span className='px-3 text-sm text-slate-500'>or</span>
                        <hr className='flex-grow border-t border-slate-200' />
                    </div>

                    <button
                        type="button"
                        onClick={() => window.location.href = "http://localhost:8000/auth/github-login.php"}
                        className="flex items-center justify-center w-full px-4 py-2 gap-2 border border-blue-800 rounded-lg text-slate-700 font-semibold shadow-sm hover:bg-slate-50 hover:border-indigo-500 focus:outline focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                    >
                        <div
                            className="w-6 h-6 bg-slate-700" // This background color will show through the mask
                            style={{
                                maskImage: `url('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg')`,
                                maskSize: 'contain',
                                maskRepeat: 'no-repeat',
                                maskPosition: 'center',
                                WebkitMaskImage: `url('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg')`, // For Webkit browsers
                                WebkitMaskSize: 'contain',
                                WebkitMaskRepeat: 'no-repeat',
                                WebkitMaskPosition: 'center',
                            }}
                        ></div>
                        Continue with GitHub
                    </button>


                </form>
                <p className="mt-6 text-center text-sm text-slate-500">
                    Already have an account?{' '}
                    <a href="/login" className="text-indigo-600 font-semibold hover:underline">Log in</a>
                </p>
            </div>
            <Footer />
        </>
    );
}