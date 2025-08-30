// src/components/Navbar.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Make sure to install react-icons
import logoImg from '../assets/logo.png'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
            <div className="container mx-auto px-6 py-4 md:flex md:justify-between md:items-center">
                <div className="flex justify-between items-center">
                    <Link to="/" className="flex items-center">
                        <img
                            src={logoImg}
                            alt="VibeTest Logo"
                            className="h-12 w-40 as"
                        />
                    </Link>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="text-purple-900 hover:text-blue-700 focus:outline-none focus:text-purple-700">
                            {isOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
                        </button>
                    </div>
                </div>

                {/* Desktop and Mobile Menu */}
                <div className={`md:flex items-center sm:align-center ${isOpen ? 'block' : 'hidden'} md:block mt-6 md:mt-0`}>
                    <ul className="flex flex-col  md:flex-row space-y-4 md:space-y-0 md:space-x-8 text-gray-900">
                        <li>
                            <a href="#features" className="hover:text-purple-600 focus:text-color-primary transition">
                                Features
                            </a>
                        </li>
                        <li>
                            <a href="#pricing" className="hover:text-purple-600 focus:text-color-primary transition">
                                Pricing
                            </a>
                        </li>
                        <li>
                            <a href="#testimonials" className="hover:text-purple-600 focus:text-color-primary transition">
                                Testimonials
                            </a>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:text-purple-600 focus:text-color-primary transition">
                                Contact
                            </Link>
                        </li>
                    </ul>
                    <div className="mt-6 md:mt-0 md:ml-8">
                        <Link to="/signup">
                            <button className="bg-blue-700 lg:w-40 md:w-40 sm:w-100 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-purple-700 transition">
                                Get Started
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}