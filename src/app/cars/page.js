"use client";

import Link from 'next/link';

export default function CarsPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <div className="text-center">
                <h1 className="text-6xl font-black text-gray-900 mb-4">Cars Inventory</h1>
                <p className="text-xl text-gray-500 mb-8">Our premium selection of pre-owned vehicles is being updated.</p>
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-lg mx-auto">
                    <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
                    <p className="text-gray-600 mb-6">
                        We are currently curating a list of the best certified used cars for you.
                        Check back shortly for our updated inventory.
                    </p>
                    <Link href="/" className="px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors">
                        Return Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
