import { Link } from "react-router-dom";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import logoImg from "../assets/logo.png";

export default function Footer() {
    return (
        <footer className="bg-white shadow-inner bottom-0">
            <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Logo & About */}
                <div>
                    <Link to="/" className="flex items-center mb-4">
                        <img src={logoImg} alt="VibeTest Logo" className="h-14 w-20" />
                    </Link>
                    <p className="text-gray-600 text-sm">
                        VibeTest automatically scans, tests, and certifies AI-generated
                        and no-code apps for bugs, performance, and security.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-gray-900 font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-gray-600 text-sm">
                        <li><Link to="/features" className="hover:text-purple-600">Features</Link></li>
                        <li><Link to="/pricing" className="hover:text-purple-600">Pricing</Link></li>
                        <li><Link to="/testimonials" className="hover:text-purple-600">Testimonials</Link></li>
                        <li><Link to="/contact" className="hover:text-purple-600">Contact</Link></li>
                    </ul>
                </div>

                {/* Socials */}
                <div>
                    <h3 className="text-gray-900 font-semibold mb-4">Follow Us</h3>
                    <div className="flex space-x-4 text-purple-600">
                        <a href="https://twitter.com" target="_blank" rel="noreferrer">
                            <FaTwitter size={22} className="hover:text-purple-800 transition" />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                            <FaLinkedin size={22} className="hover:text-purple-800 transition" />
                        </a>
                        <a href="https://github.com" target="_blank" rel="noreferrer">
                            <FaGithub size={22} className="hover:text-purple-800 transition" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-200 mt-6 py-4 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} VibeTest. All rights reserved.
            </div>
        </footer>
    );
}
