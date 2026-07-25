import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
export default function PasswordStrengthIndicator({ password, showPassword, onToggle, }) {
    const getStrength = (pwd) => {
        if (!pwd)
            return { level: 0, label: '', color: 'bg-gray-300' };
        let strength = 0;
        if (pwd.length >= 8)
            strength++;
        if (pwd.length >= 12)
            strength++;
        if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd))
            strength++;
        if (/\d/.test(pwd))
            strength++;
        if (/[^a-zA-Z0-9]/.test(pwd))
            strength++;
        if (strength <= 2)
            return { level: 1, label: 'Weak', color: 'bg-red-500' };
        if (strength <= 3)
            return { level: 2, label: 'Good', color: 'bg-yellow-500' };
        return { level: 3, label: 'Strong', color: 'bg-bright-green' };
    };
    const { level, label, color } = getStrength(password);
    return (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("label", { className: "block text-sm font-medium text-gray-900", children: "Create password" }), password && (_jsx("span", { className: `text-sm font-medium ${color === 'bg-bright-green' ? 'text-bright-green' : color === 'bg-yellow-500' ? 'text-yellow-600' : 'text-red-600'}`, children: label }))] }), _jsxs("div", { className: "relative", children: [_jsx("input", { type: showPassword ? 'text' : 'password', placeholder: "At least 8 characters", className: "w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-bright-green focus:border-transparent transition pr-12" }), _jsx("button", { type: "button", onClick: onToggle, className: "absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition", "aria-label": showPassword ? 'Hide password' : 'Show password', children: showPassword ? _jsx(EyeOff, { className: "w-5 h-5" }) : _jsx(Eye, { className: "w-5 h-5" }) })] }), password && (_jsxs(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, className: "space-y-2", children: [_jsx("div", { className: "flex gap-1", children: [1, 2, 3].map((bar) => (_jsx("div", { className: `h-1 flex-1 rounded-full transition ${bar <= level ? color : 'bg-gray-200'}` }, bar))) }), _jsx("p", { className: "text-xs text-gray-500", children: "Use a mix of uppercase, lowercase, numbers, and symbols for a stronger password." })] }))] }));
}
