"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const user = {
  id: 1,
  name: "Tushar Bansal",
  email: "tushar@example.com",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  role: "Admin",
  phone: "+91 9719167530",
  address: "Bulandshahr Stand, Siyana, Bulandshahar",
};

const sidebarLinks = [
  { label: "Profile", icon: "👤" },
  { label: "Settings", icon: "⚙️" },
  { label: "Notifications", icon: "🔔" },
  { label: "Logout", icon: "🚪" },
];

export default function ProfilePage() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900/95 border-r border-blue-500/30 text-gray-200 shadow-lg p-6 space-y-6">
        <div className="flex flex-col items-center">
          <img src={user.avatar} alt="avatar" className="w-20 h-20 rounded-full border-4 border-blue-400 mb-2" />
          <span className="font-bold text-lg mt-2 text-white">{user.name}</span>
          <span className="text-blue-300 text-sm">{user.role}</span>
        </div>
        <nav className="flex-1 mt-8">
          <ul className="space-y-4">
            {sidebarLinks.map((link) => (
              <li key={link.label} className="flex items-center gap-3 cursor-pointer hover:text-blue-400 transition">
                <span className="text-xl">{link.icon}</span>
                <span>{link.label}</span>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between bg-slate-900/95 border-b border-blue-500/30 px-6 py-4 shadow-md">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="bg-blue-800 hover:bg-blue-700 text-white px-3 py-1 rounded-lg shadow transition flex items-center gap-2"
            >
              <span className="text-lg">←</span> <span className="hidden sm:inline">Back</span>
            </button>
            <h1 className="text-2xl font-bold text-blue-200">User Profile</h1>
          </div>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((open) => !open)}
              className="flex items-center gap-2 bg-blue-800 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition"
            >
              <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full border-2 border-blue-400" />
              <span className="hidden sm:inline">{user.name}</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-800 text-blue-100 rounded-lg shadow-lg z-10 animate-fadeIn border border-blue-500/30">
                <ul>
                  <li className="px-4 py-2 hover:bg-blue-900/60 cursor-pointer">Profile</li>
                  <li className="px-4 py-2 hover:bg-blue-900/60 cursor-pointer">Settings</li>
                  <li className="px-4 py-2 hover:bg-blue-900/60 cursor-pointer">Logout</li>
                </ul>
              </div>
            )}
          </div>
        </header>

        {/* User Info */}
        <main className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-xl bg-slate-900/90 border border-blue-500/30 rounded-xl shadow-lg p-8 flex flex-col items-center gap-6">
            <img src={user.avatar} alt="avatar" className="w-24 h-24 rounded-full border-4 border-blue-400 shadow mb-2" />
            <h2 className="text-2xl font-bold text-white">{user.name}</h2>
            <p className="text-blue-300">{user.email}</p>
            <div className="w-full flex flex-col gap-2 mt-4">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-blue-400">Role:</span>
                <span className="text-gray-200">{user.role}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-blue-400">Phone:</span>
                <span className="text-gray-200">{user.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-blue-400">Address:</span>
                <span className="text-gray-200">{user.address}</span>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Sidebar (Drawer) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 border-t border-blue-500/30 flex justify-around items-center py-3 shadow-lg z-20">
        {sidebarLinks.map((link) => (
          <button key={link.label} className="flex flex-col items-center text-gray-200 hover:text-blue-400 transition">
            <span className="text-2xl">{link.icon}</span>
            <span className="text-xs">{link.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
} 