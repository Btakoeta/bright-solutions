import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Navigation from './Navigation';
export default function ProtectedRoute() {
    const { isAuthenticated } = useAuthStore();
    if (!isAuthenticated) {
        return _jsx(Navigate, { to: "/login", replace: true });
    }
    return (_jsxs("div", { className: "flex h-screen", children: [_jsx(Navigation, {}), _jsx("main", { className: "flex-1 overflow-auto bg-bright-light", children: _jsx(Outlet, {}) })] }));
}
