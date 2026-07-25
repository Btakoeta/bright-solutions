import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Package, Trash2, TrendingUp, AlertCircle } from 'lucide-react';
import api from '../services/api';
import { useAuthStore } from '../store/authStore';
import { Link } from 'react-router-dom';
export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [subscriptions, setSubscriptions] = useState([]);
    const [stats, setStats] = useState({ totalWeight: 0, recordCount: 0 });
    const [loading, setLoading] = useState(true);
    const { user: authUser } = useAuthStore();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userRes, subsRes, statsRes] = await Promise.all([
                    api.get('/users/me'),
                    api.get('/subscriptions'),
                    api.get('/waste/summary'),
                ]);
                setUser(userRes.data);
                setSubscriptions(subsRes.data);
                setStats(statsRes.data);
            }
            catch (error) {
                console.error('Failed to fetch dashboard data:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    if (loading) {
        return _jsx("div", { className: "p-8", children: "Loading..." });
    }
    return (_jsxs("div", { className: "p-8", children: [_jsxs("div", { className: "mb-8", children: [_jsxs("h1", { className: "text-4xl font-bold mb-2", children: ["Welcome, ", user?.firstName, "!"] }), _jsx("p", { className: "text-gray-600", children: "Manage your waste collection and track your environmental impact." })] }), _jsxs("div", { className: "grid md:grid-cols-4 gap-4 mb-8", children: [_jsx("div", { className: "card", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-gray-600 text-sm", children: "Total Weight Disposed" }), _jsxs("p", { className: "text-3xl font-bold", children: [(stats.totalWeight / 1000).toFixed(1), "T"] })] }), _jsx(Trash2, { className: "w-12 h-12 text-bright-green opacity-20" })] }) }), _jsx("div", { className: "card", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-gray-600 text-sm", children: "Collections" }), _jsx("p", { className: "text-3xl font-bold", children: stats.recordCount })] }), _jsx(Package, { className: "w-12 h-12 text-bright-green opacity-20" })] }) }), _jsx("div", { className: "card", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-gray-600 text-sm", children: "Active Subscriptions" }), _jsx("p", { className: "text-3xl font-bold", children: subscriptions.filter(s => s.status === 'ACTIVE').length })] }), _jsx(TrendingUp, { className: "w-12 h-12 text-bright-green opacity-20" })] }) }), _jsx("div", { className: "card", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-gray-600 text-sm", children: "Account Type" }), _jsx("p", { className: "text-2xl font-bold", children: user?.userType })] }), _jsx(AlertCircle, { className: "w-12 h-12 text-bright-green opacity-20" })] }) })] }), _jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [_jsxs("div", { className: "card", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Recent Subscriptions" }), subscriptions.length === 0 ? (_jsx("p", { className: "text-gray-600", children: "No subscriptions yet." })) : (_jsx("div", { className: "space-y-4", children: subscriptions.slice(0, 3).map((sub) => (_jsx("div", { className: "border-l-4 border-bright-green pl-4 py-2", children: _jsxs("div", { className: "flex justify-between items-start", children: [_jsxs("div", { children: [_jsx("p", { className: "font-bold", children: sub.serviceType }), _jsx("p", { className: "text-sm text-gray-600", children: sub.frequency })] }), _jsx("span", { className: `text-xs font-bold px-2 py-1 rounded ${sub.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`, children: sub.status })] }) }, sub.id))) })), _jsx(Link, { to: "/subscriptions", className: "btn btn-primary w-full mt-4", children: "Manage Subscriptions" })] }), _jsxs("div", { className: "card", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Quick Actions" }), _jsxs("div", { className: "space-y-3", children: [_jsx(Link, { to: "/subscriptions", className: "btn btn-secondary w-full text-left", children: "+ Add Service" }), _jsx(Link, { to: "/tracking", className: "btn btn-secondary w-full text-left", children: "Track Truck" }), _jsx(Link, { to: "/waste-stats", className: "btn btn-secondary w-full text-left", children: "View Analytics" }), _jsx(Link, { to: "/settings", className: "btn btn-secondary w-full text-left", children: "Account Settings" })] })] })] })] }));
}
