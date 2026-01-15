"use client";

import Link from 'next/link';

export default function PerformancePage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
            <div className="text-center">
                <h1 className="text-6xl font-black text-red-600 mb-4">Performance</h1>
                <p className="text-xl text-gray-400 mb-8">Unleash the true potential of your vehicle.</p>
                <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700 max-w-lg mx-auto">
                    <h2 className="text-2xl font-bold mb-4">Under Construction</h2>
                    <p className="text-gray-300 mb-6">
                        Our performance storage and tuning packages will be online soon.
                        Get ready for ECU remaps, custom exhausts, and more.
                    </p>
                    <Link href="/" className="px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors">
                        Return Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
