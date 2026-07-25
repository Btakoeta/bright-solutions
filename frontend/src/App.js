import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from './store/authStore';
import { LanguageProvider } from './context/LanguageContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Onboarding from './pages/Onboarding';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Subscriptions from './pages/Subscriptions';
import Tracking from './pages/Tracking';
import WasteStats from './pages/WasteStats';
import Settings from './pages/Settings';
import ProtectedRoute from './components/ProtectedRoute';
export default function App() {
    const { initAuth } = useAuthStore();
    useEffect(() => {
        initAuth();
    }, [initAuth]);
    return (_jsx(LanguageProvider, { children: _jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Landing, {}) }), _jsx(Route, { path: "/about", element: _jsx(About, {}) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/register", element: _jsx(Register, {}) }), _jsx(Route, { path: "/onboarding", element: _jsx(Onboarding, {}) }), _jsxs(Route, { element: _jsx(ProtectedRoute, {}), children: [_jsx(Route, { path: "/dashboard", element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "/subscriptions", element: _jsx(Subscriptions, {}) }), _jsx(Route, { path: "/tracking", element: _jsx(Tracking, {}) }), _jsx(Route, { path: "/waste-stats", element: _jsx(WasteStats, {}) }), _jsx(Route, { path: "/settings", element: _jsx(Settings, {}) })] })] }) }) }));
}
