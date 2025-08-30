// src/pages/PricingPage.jsx
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export default function PricingPage() {
    const plans = [
        {
            name: "Free",
            price: "$0",
            description: "Perfect for testing small personal projects.",
            features: [
                { text: "1 scan per month", included: true },
                { text: "Basic security report", included: true },
                { text: "No certification badge", included: false },
                { text: "Community support", included: true },
                { text: "CI/CD integration", included: false }
            ],
            cta: "Start for Free",
            link: "/upload"
        },
        {
            name: "Pro",
            price: "$15",
            frequency: "/month",
            description: "Essential tools for professional developers and freelancers.",
            features: [
                { text: "Unlimited scans", included: true },
                { text: "Advanced security & performance reports", included: true },
                { text: "Certification badge", included: true },
                { text: "Email & chat support", included: true },
                { text: "CI/CD integration", included: false }
            ],
            cta: "Go Pro",
            link: "/signup",
            isPopular: true
        },
        {
            name: "Business",
            price: "$99",
            frequency: "/month",
            description: "Scale your testing with a full team and enterprise-level features.",
            features: [
                { text: "Unlimited scans", included: true },
                { text: "Full suite of reports", included: true },
                { text: "Certification badge & API access", included: true },
                { text: "Priority support", included: true },
                { text: "CI/CD integration (GitHub/GitLab)", included: true }
            ],
            cta: "Contact Sales",
            link: "/contact-sales"
        },
    ];

    return (
        <>
            <Navbar />
            <div className="pt-24 pb-16 min-h-screen w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
                <section className="text-center mb-16 px-6">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Simple, Transparent Pricing</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Choose the plan that's right for your project. No hidden fees, no surprises.
                    </p>
                </section>

                <section className="max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8">
                        {plans.map((plan, index) => (
                            <div key={index} className={`relative p-8 rounded-2xl shadow-lg border-4 ${plan.isPopular ? 'border-purple-600 dark:border-purple-500' : 'border-gray-200 dark:border-gray-700'} bg-white dark:bg-gray-800 transform transition-all hover:scale-105`}>
                                {plan.isPopular && (
                                    <div className="absolute -top-3 right-0 bg-purple-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wide shadow-md">
                                        Most Popular
                                    </div>
                                )}
                                <h2 className="text-3xl font-bold mb-2">{plan.name}</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{plan.description}</p>
                                <div className="mt-4 mb-6">
                                    <span className="text-5xl font-extrabold">{plan.price}</span>
                                    {plan.frequency && <span className="text-xl font-medium text-gray-500">{plan.frequency}</span>}
                                </div>
                                <ul className="space-y-4">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className={`flex items-start ${feature.included ? 'text-gray-800 dark:text-gray-200' : 'text-gray-400 dark:text-gray-600'}`}>
                                            <span className="flex-shrink-0 mr-3">
                                                {feature.included ? <FaCheckCircle className="text-green-500" /> : <FaTimesCircle className="text-red-500" />}
                                            </span>
                                            {feature.text}
                                        </li>
                                    ))}
                                </ul>
                                <Link to={plan.link}>
                                    <button className={`w-full py-3 mt-8 rounded-lg text-lg font-semibold transition-colors ${plan.isPopular ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'}`}>
                                        {plan.cta}
                                    </button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>

                <hr className="my-20 border-gray-200 dark:border-gray-700" />

                <section className="max-w-4xl mx-auto text-center px-6">
                    <h2 className="text-3xl font-bold mb-4">Looking for an Enterprise Solution?</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                        For larger organizations with unique security and compliance needs, we offer custom-tailored enterprise packages.
                    </p>
                    <Link to="/contact-sales">
                        <button className="bg-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-700 transition transform hover:scale-105 shadow-lg">
                            Contact Sales
                        </button>
                    </Link>
                </section>

                <hr className="my-20 border-gray-200 dark:border-gray-700" />

                <section className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        <FAQItem question="Can I change my plan at any time?" answer="Yes, you can upgrade, downgrade, or cancel your subscription at any time directly from your account dashboard. The changes will take effect at the start of your next billing cycle." />
                        <FAQItem question="Do you offer a free trial for the Pro or Business plan?" answer="We do not offer a free trial for our paid plans. However, our Free plan provides a comprehensive look at the core features, allowing you to test the service before committing to a paid subscription." />
                        <FAQItem question="What forms of payment do you accept?" answer="We accept all major credit cards, including Visa, MasterCard, American Express, and Discover. For our Business plan, we can also arrange for invoice-based payments." />
                    </div>
                </section>

            </div>
        </>
    );
}

// Reusable FAQ Item Component
function FAQItem({ question, answer }) {
    return (
        <details className="p-4 rounded-lg bg-white dark:bg-gray-800 cursor-pointer shadow-sm border border-gray-200 dark:border-gray-700">
            <summary className="font-semibold text-gray-900 dark:text-white text-lg">
                {question}
            </summary>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
                {answer}
            </p>
        </details>
    );
}