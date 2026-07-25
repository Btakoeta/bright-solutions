import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useLocation } from 'react-router-dom';
import { LogOut, Settings, BarChart3, Package, MapPin, Home } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
export default function Navigation() {
    const location = useLocation();
    const { logout } = useAuthStore();
    const isActive = (path) => location.pathname === path;
    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: Home },
        { path: '/subscriptions', label: 'Services', icon: Package },
        { path: '/tracking', label: 'Truck Tracking', icon: MapPin },
        { path: '/waste-stats', label: 'Waste Stats', icon: BarChart3 },
        { path: '/settings', label: 'Settings', icon: Settings },
    ];
    return (_jsxs("nav", { className: "w-64 bg-bright-dark text-white p-6 flex flex-col", children: [_jsxs("div", { className: "flex items-center gap-2 mb-8", children: [_jsx("div", { className: "bg-bright-green rounded-lg px-2 py-1 flex items-center justify-center", children: _jsx("span", { className: "text-white font-bold text-xl", children: "BS" }) }), _jsx("h1", { className: "text-xl font-bold", children: "Bright Solutions" })] }), _jsx("ul", { className: "flex-1 space-y-2", children: navItems.map(({ path, label, icon: Icon }) => (_jsx("li", { children: _jsxs(Link, { to: path, className: `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${isActive(path)
                            ? 'bg-bright-green text-white'
                            : 'text-gray-300 hover:bg-gray-700'}`, children: [_jsx(Icon, { className: "w-5 h-5" }), label] }) }, path))) }), _jsxs("button", { onClick: logout, className: "flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors w-full", children: [_jsx(LogOut, { className: "w-5 h-5" }), "Logout"] })] }));
}
