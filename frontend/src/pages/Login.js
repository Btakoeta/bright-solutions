import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Trash2 } from 'lucide-react';
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuthStore();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate('/dashboard');
        }
        catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-bright-light", children: _jsx("div", { className: "w-full max-w-md", children: _jsxs("div", { className: "card", children: [_jsxs("div", { className: "flex items-center justify-center gap-2 mb-8", children: [_jsx(Trash2, { className: "w-8 h-8 text-bright-green" }), _jsx("h1", { className: "text-2xl font-bold", children: "Bright Solutions" })] }), _jsx("h2", { className: "text-2xl font-bold mb-6 text-center", children: "Login" }), error && (_jsx("div", { className: "bg-red-100 text-red-700 px-4 py-3 rounded-lg mb-4", children: error })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Email" }), _jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), className: "input", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Password" }), _jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), className: "input", required: true })] }), _jsx("button", { type: "submit", disabled: loading, className: "btn btn-primary w-full", children: loading ? 'Logging in...' : 'Login' })] }), _jsxs("p", { className: "text-center mt-6 text-gray-600", children: ["Don't have an account?", ' ', _jsx(Link, { to: "/register", className: "text-bright-green hover:underline font-medium", children: "Sign up" })] })] }) }) }));
}
