import React from 'react';
import { SubscriptionTier } from '../types';

const tiers: SubscriptionTier[] = [
    {
        name: 'Basic',
        price: '29',
        features: ['5 Projects', 'Basic Analytics', '24/7 Support'],
        isPopular: false,
    },
    {
        name: 'Pro',
        price: '99',
        features: ['Unlimited Projects', 'Advanced Analytics', 'Priority Support', 'API Access'],
        isPopular: true,
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        features: ['All Pro Features', 'Dedicated Account Manager', 'Custom Integrations', 'SLA'],
        isPopular: false,
    },
];

const TierCard: React.FC<{ tier: SubscriptionTier }> = ({ tier }) => (
    <div className={`relative bg-slate-800 p-8 rounded-xl border-2 ${tier.isPopular ? 'border-indigo-500' : 'border-slate-700'} shadow-lg flex flex-col`}>
        {tier.isPopular && (
            <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                <span className="bg-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase">Most Popular</span>
            </div>
        )}
        <h3 className="text-xl font-semibold text-white text-center">{tier.name}</h3>
        <div className="mt-4 text-center">
            {tier.price === 'Custom' ? (
                <span className="text-4xl font-bold text-white">Contact Us</span>
            ) : (
                <>
                    <span className="text-4xl font-bold text-white">${tier.price}</span>
                    <span className="text-slate-400">/month</span>
                </>
            )}
        </div>
        <ul className="mt-6 space-y-4 text-slate-300 flex-grow">
            {tier.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                    <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    {feature}
                </li>
            ))}
        </ul>
        <button className={`mt-8 w-full py-3 px-6 rounded-lg font-semibold transition-colors ${tier.isPopular ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-slate-700 text-white hover:bg-slate-600'}`}>
            {tier.price === 'Custom' ? 'Contact Sales' : 'Choose Plan'}
        </button>
    </div>
);

const SubscriptionTiers: React.FC = () => {
    return (
        <div className="bg-slate-900 py-8">
            <h2 className="text-3xl font-bold text-white text-center mb-10">Our Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {tiers.map(tier => <TierCard key={tier.name} tier={tier} />)}
            </div>
        </div>
    );
};

export default SubscriptionTiers;