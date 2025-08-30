import React, { useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import HeroImg from '../assets/code.png';
import Arik from '../assets/ArikLogo.svg'
import Ariga from "../assets/ArigaLogo.svg"
import Bigi from "../assets/BigiBrand.svg"
import { FaShieldAlt, FaRocket, FaTrophy, FaChartLine, FaCheckCircle, FaLock, FaBolt, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// Inline SVG for quote icon to reduce dependencies
const QuoteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-indigo-400">
        <path d="M4.5 12.25l7.5-7.5-7.5 7.5zM12 20.5l7.5-7.5-7.5 7.5z" />
        <path fillRule="evenodd" d="M2.25 15A.75.75 0 013 14.25h5.25a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zm0 4.5a.75.75 0 01.75-.75h12.75a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zm0 4.5a.75.75 0 01.75-.75h12.75a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75z" clipRule="evenodd" />
    </svg>
);

// Inline SVG for a star icon
const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-400">
        <path fillRule="evenodd" d="M10.788 3.212a.75.75 0 011.424 0l2.535 5.25a.75.75 0 00.572.412l5.525.803a.75.75 0 01.417 1.28l-4.004 3.898a.75.75 0 00-.215.66l.945 5.503a.75.75 0 01-1.091.795L12 18.064l-4.962 2.61a.75.75 0 01-1.09-.795l.945-5.503a.75.75 0 00-.215-.66L2.61 10.957a.75.75 0 01.417-1.28l5.525-.803a.75.75 0 00.572-.412l2.535-5.25z" clipRule="evenodd" />
    </svg>
);

// Reusable Testimonial Card component with image, stars, and quote icon
const TestimonialCard = ({ quote, author, image, title }) => (
    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-slate-200">
        <div className="flex justify-between items-start mb-6">
            <QuoteIcon />
            <div className="flex space-x-1">
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
            </div>
        </div>
        <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-light mb-6">
            "{quote}"
        </p>
        <div className="flex items-center space-x-4">
            <img src={image} alt={author} className="w-16 h-16 rounded-full border-2 border-indigo-500" />
            <div>
                <h4 className="text-lg font-semibold text-slate-900">{author}</h4>
                <p className="text-sm text-slate-500">{title}</p>
            </div>
        </div>
    </div>
);

const testimonials = [
    {
        quote: "VibeTest saved us countless hours of manual testing. The certification badge gave our investors peace of mind.",
        author: "Jane Doe",
        title: "Founder of InnovateTech",
        image: "https://placehold.co/150x150/5D3FD3/FFFFFF?text=JD"
    },
    {
        quote: "As a data professional, I appreciate the detailed performance reports. It helped us optimize our data-driven features and improve user experience.",
        author: "John Smith",
        title: "Lead Data Scientist at DataFlow Solutions",
        image: "https://placehold.co/150x150/191970/FFFFFF?text=JS"
    },
    {
        quote: "The intuitive interface and real-time scanning are a game-changer. I feel much more confident in the quality of my code now.",
        author: "Emily Chen",
        title: "Senior Engineer at WebFlow",
        image: "https://placehold.co/150x150/8A2BE2/FFFFFF?text=EC"
    },
    {
        quote: "The intuitive interface and real-time scanning are a game-changer. I feel much more confident in the quality of my code now.",
        author: "Emily Chen",
        title: "Senior Engineer at WebFlow",
        image: "https://placehold.co/150x150/8A2BE2/FFFFFF?text=EC"
    },
    {
        quote: "The intuitive interface and real-time scanning are a game-changer. I feel much more confident in the quality of my code now.",
        author: "Emily Chen",
        title: "Senior Engineer at WebFlow",
        image: "https://placehold.co/150x150/8A2BE2/FFFFFF?text=EC"
    }
];

export default function LandingPage() {
    const testimonialContainerRef = useRef(null);

    const scrollLeft = () => {
        if (testimonialContainerRef.current) {
            testimonialContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (testimonialContainerRef.current) {
            testimonialContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
        }
    };

    return (
        <>
            <div className="bg-gray-50 min-h-screen">
                <Navbar />
                <main>
                    {/* Hero Section */}
                    <section
                        className="mt-1 px-6 py-40 text-center bg-cover bg-center relative"
                        style={{ backgroundImage: `url(${HeroImg})` }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-purple-600/50"></div>
                        <div className="relative z-10">
                            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                                Test and Perfect <br /> Your AI-Coded Apps
                            </h1>
                            <p className="text-xl text-gray-200 mb-10 max-w-3xl mx-auto">
                                VibeTest automatically scans, tests, and certifies AI-generated and no-code apps
                                for bugs, performance, and security.
                            </p>
                            <Link to="/upload">
                                <button className="bg-blue-800 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-700 transition transform hover:scale-105 shadow-lg">
                                    Start Your Free Scan
                                </button>
                            </Link>
                        </div>
                    </section>

                    {/* Social Proof Bar */}
                    <section className="px-6 py-12 bg-gray-100 dark:bg-gray-800 text-center">
                        <p className="text-lg text-gray-500 dark:text-gray-400 mb-6">Trusted by leading innovators and startups</p>
                        <div className="flex flex-wrap justify-center items-center gap-5 md:gap-10">
                            {/* Icon 1 */}
                            <div className="w-30 h-30 md:w-38 md:h-38 bg-transparent flex items-center justify-center">
                                <img src={Arik} alt="" srcset="" />
                            </div>

                            {/* Icon 2 */}
                            <div className="w-30 h-30 md:w-38 md:h-38 flex items-center justify-center">
                                <img src={Bigi} alt="" srcset="" />
                            </div>

                            {/* Icon 3 */}
                            <div className="w-30 h-30 md:w-38 md:h-38 flex items-center justify-center">
                                <img src={Ariga} alt="" srcset="" />
                            </div>
                        </div>


                    </section>

                    {/* Features Grid */}
                    <section id="features" className="px-6 py-30 bg-white dark:bg-gray-800">
                        <div className="max-w-6xl mx-auto text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                                Powerful Features at Your Fingertips
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                                Discover how VibeTest can streamline your workflow and guarantee the quality of your AI-generated code.
                            </p>
                        </div>
                        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            <FeatureCard icon={<FaShieldAlt size={36} className="text-purple-500" />} title="AI Code Scanner" description="Instantly scan for common vulnerabilities and best-practice violations." />
                            <FeatureCard icon={<FaRocket size={36} className="text-purple-500" />} title="Auto-Test Generator" description="Our AI generates comprehensive tests to ensure full functionality." />
                            <FeatureCard icon={<FaChartLine size={36} className="text-purple-500" />} title="Performance Report" description="Get a detailed report on your app's speed and efficiency." />
                            <FeatureCard icon={<FaTrophy size={36} className="text-purple-500" />} title="Certification Badge" description="Earn a VibeTest certification badge to show your app is ready for launch." />
                        </div>
                    </section>

                    {/* Why VibeTest? */}
                    <section className="px-6 py-20 bg-gray-50 dark:bg-gray-900">
                        <div className="max-w-6xl mx-auto text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12">Why Choose VibeTest?</h2>
                            <div className="grid md:grid-cols-3 gap-8 text-left">
                                <BenefitCard icon={<FaBolt size={36} className="text-purple-500" />} title="Speed & Efficiency" description="Launch your app faster without compromising quality. Our automated process gives you results in minutes, not days." />
                                <BenefitCard icon={<FaCheckCircle size={36} className="text-purple-500" />} title="Comprehensive Reports" description="Don't just get a pass/fail. Our detailed reports provide actionable insights and code snippets to fix issues immediately." />
                                <BenefitCard icon={<FaLock size={36} className="text-purple-500" />} title="Enhanced Security" description="Sleep well knowing your app is free from common vulnerabilities. We scan for OWASP Top 10 risks and more." />
                            </div>
                        </div>
                    </section>

                    {/* How It Works */}
                    <section className="px-6 py-20 bg-white dark:bg-gray-800 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12">How It Works 🚀</h2>
                        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-12">
                            <StepCard number="1" title="Upload Your Code" description="Simply upload your code or connect your repository in minutes." />
                            <StepCard number="2" title="VibeTest Scans" description="Our AI automatically analyzes your code for bugs and potential issues." />
                            <StepCard number="3" title="Review & Certify" description="Get a detailed report and a certification badge for a clean app." />
                        </div>
                    </section>

                    {/* Testimonials */}
                    <section id="testimonials" className="px-6 py-30 bg-slate-100 antialiased font-sans text-slate-900 relative">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Customers Say</h2>
                        <div className="relative max-w-7xl mx-auto">
                            {/* Navigation Buttons */}
                            <button
                                onClick={scrollLeft}
                                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white rounded-full shadow-lg transition-transform hover:scale-110"
                            >
                                <FaArrowLeft className="text-xl text-gray-700" />
                            </button>
                            <button
                                onClick={scrollRight}
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white rounded-full shadow-lg transition-transform hover:scale-110"
                            >
                                <FaArrowRight className="text-xl text-gray-700" />
                            </button>

                            {/* Testimonials Container */}
                            <div
                                ref={testimonialContainerRef}
                                className="flex space-x-8 overflow-x-auto p-4 snap-x snap-mandatory scrollbar-hide"
                            >
                                {testimonials.map((testimonial, index) => (
                                    <div key={index} className="flex-none w-96 snap-center">
                                        <TestimonialCard
                                            quote={testimonial.quote}
                                            author={testimonial.author}
                                            title={testimonial.title}
                                            image={testimonial.image}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section className="px-6 py-20 bg-white dark:bg-gray-800">
                        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">Frequently Asked Questions</h2>
                        <div className="max-w-4xl mx-auto space-y-6">
                            <FAQItem question="What kind of AI-generated code can VibeTest analyze?" answer="VibeTest is designed to analyze a wide range of code generated by popular AI models and no-code platforms. Currently, we support JavaScript, Python, and Ruby." />
                            <FAQItem question="Is my code secure and private during the scanning process?" answer="Absolutely. We take your privacy and security seriously. Your code is encrypted during transfer and stored securely. We do not share or use your code for any purpose other than providing you with the scan results." />
                            <FAQItem question="How long does a typical scan take?" answer="The duration depends on the size and complexity of your codebase. A small to medium-sized project typically completes within 5-10 minutes. You'll receive an email notification when your report is ready." />
                            <FAQItem question="Can I integrate VibeTest into my CI/CD pipeline?" answer="Yes, our Business plan offers API access and integrations with popular platforms like GitHub, GitLab, and Bitbucket, allowing you to automate VibeTest scans with every code commit." />
                        </div>
                    </section>

                    {/* Final CTA */}
                    <section className="px-6 py-20 bg-purple-600 text-center">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Launch with Confidence?</h2>
                            <p className="text-xl text-purple-200 mb-8">
                                Join thousands of developers and get your app VibeTested today.
                            </p>
                            <Link to="/upload">
                                <button className="bg-white text-purple-600 px-10 py-4 rounded-full text-lg font-semibold hover:bg-gray-200 transition transform hover:scale-105 shadow-lg">
                                    Get Started for Free
                                </button>
                            </Link>
                        </div>
                    </section>
                </main>

                {/* Footer: Outside the main content, always visible at the bottom */}
                <Footer />
            </div>
        </>
    );
}

// Reusable Components (unchanged)
function FeatureCard({ icon, title, description }) {
    return (
        <div className="text-center p-6 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition shadow-md">
            <div className="flex justify-center mb-4">
                {icon}
            </div>
            <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-2">{title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{description}</p>
        </div>
    );
}

function BenefitCard({ icon, title, description }) {
    return (
        <div className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg transition">
            <div className="flex items-center mb-4">
                {icon}
                <h3 className="font-semibold text-xl text-gray-900 dark:text-white ml-4">{title}</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">{description}</p>
        </div>
    );
}

function StepCard({ number, title, description }) {
    return (
        <div className="p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full mx-auto mb-4">
                <span className="text-lg font-bold text-purple-600 dark:text-purple-400">{number}</span>
            </div>
            <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-2">{title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{description}</p>
        </div>
    );
}


function FAQItem({ question, answer }) {
    return (
        <details className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700 cursor-pointer">
            <summary className="font-semibold text-gray-900 dark:text-white text-lg">{question}</summary>
            <p className="mt-2 text-gray-600 dark:text-gray-400">{answer}</p>
        </details>
    );
}
