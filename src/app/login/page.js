"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaArrowRight, FaGoogle, FaFacebook } from "react-icons/fa";
import Loader from "@/app/component/Loader";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const router = useRouter();
    const { isLoading, error, isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            router.push("/");
        }
    }, [isAuthenticated, router]);

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(loginStart());

        // Simulate API Call
        setTimeout(() => {
            // Demo credentials logic
            if ((email === "user@example.com" || email === "admin@example.com") && password === "password") {
                dispatch(loginSuccess({ name: "Demo User", email: email }));
                router.push("/");
            } else {
                dispatch(loginFailure("Invalid credentials. Try user@example.com / password"));
            }
        }, 1500);
    };

    if (isLoading) return <Loader />;

    return (
        <div className="min-h-screen flex bg-white">

            {/* LEFT SIDE - VISUAL (Hidden on Mobile) */}
            <div className="hidden lg:block lg:w-1/2 relative bg-black overflow-hidden">
                <img
                    src="/Image/carHome.jpg"
                    alt="Luxury Car"
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-16 z-10 text-white">
                    <div className="pt-8">
                        <Link href="/" className="inline-flex items-center gap-3">
                            <img src="/Image/logo.png" alt="Logo" className="h-12 w-auto brightness-0 invert" />
                            <div className="flex flex-col">
                                <span className="text-2xl font-black tracking-tight leading-none">TUSHAR</span>
                                <span className="text-xs font-bold tracking-[0.2em] opacity-80">AUTOMOBILES</span>
                            </div>
                        </Link>
                    </div>

                    <div className="max-w-xl">
                        <h1 className="text-6xl font-black mb-6 leading-none">
                            Drive Your <br />
                            <span className="text-red-600">Dream.</span>
                        </h1>
                        <p className="text-xl text-gray-200 font-medium leading-relaxed mb-8">
                            "Experience the pinnacle of automotive excellence with our premium services and curated selection."
                        </p>
                    </div>

                    <div className="text-xs text-gray-400 font-medium">
                        © {new Date().getFullYear()} Tushar Automobiles.
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE - FORM */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-24 bg-white">
                <div className="w-full max-w-md space-y-8">

                    {/* Logo - Visible on all screens */}
                    <div className="text-center mb-10">
                       
                        <h2 className="text-2xl font-black text-gray-900">Tushar Automobiles</h2>
                    </div>

                    <div className="text-left">
                        <h2 className="text-4xl font-black text-gray-900 mb-3">Welcome Back</h2>
                        <p className="text-gray-500 text-lg">Please enter your details to sign in.</p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-red-50 text-red-600 p-4 rounded-lg text-sm font-semibold flex items-center gap-2"
                        >
                            <span className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">

                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                            <div className="relative group">
                                <FaEnvelope className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-600 transition-colors pointer-events-none" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-8 pr-4 py-3 bg-transparent border-b-2 border-gray-200 font-medium focus:outline-none focus:border-red-600 transition-all placeholder:text-gray-300"
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-sm font-bold text-gray-700">Password</label>
                                <a href="#" className="text-xs font-bold text-red-600 hover:text-red-800">Forgot?</a>
                            </div>
                            <div className="relative group">
                                <FaLock className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-600 transition-colors pointer-events-none" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-8 pr-4 py-3 bg-transparent border-b-2 border-gray-200 font-medium focus:outline-none focus:border-red-600 transition-all placeholder:text-gray-300"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-black hover:bg-red-600 text-white font-bold py-4 rounded-full shadow-lg hover:shadow-xl transform active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 mt-8"
                        >
                            <span>Sign In</span>
                            <FaArrowRight />
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 opacity-50">
                        <div className="h-px bg-gray-300 flex-1" />
                        <span className="text-xs font-bold text-gray-500 uppercase">Or</span>
                        <div className="h-px bg-gray-300 flex-1" />
                    </div>

                    {/* Social Auth */}
                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-2 py-3 bg-gray-50 rounded-lg font-bold text-sm text-gray-700 hover:bg-gray-100 transition-all">
                            <FaGoogle className="text-red-500" /> Google
                        </button>
                        <button className="flex items-center justify-center gap-2 py-3 bg-gray-50 rounded-lg font-bold text-sm text-gray-700 hover:bg-gray-100 transition-all">
                            <FaFacebook className="text-blue-600" /> Facebook
                        </button>
                    </div>

                    {/* Footer Link */}
                    <div className="text-center pt-4">
                        <p className="text-gray-500 font-medium text-sm">
                            Don't have an account?{" "}
                            <Link href="/signup" className="text-red-600 font-bold hover:underline">
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
