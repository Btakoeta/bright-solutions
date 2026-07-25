import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Users, Building2, Home, BarChart3, Check } from 'lucide-react';
const accountTypes = [
    {
        id: 'individual',
        label: 'Household',
        description: 'Manage residential collections and service requests.',
        icon: Home,
    },
    {
        id: 'business',
        label: 'Business',
        description: 'Manage waste services for one or more business locations.',
        icon: Building2,
    },
    {
        id: 'community',
        label: 'Community or HOA',
        description: 'Coordinate services across a neighborhood or property community.',
        icon: Users,
    },
    {
        id: 'government',
        label: 'Municipality or Government',
        description: 'Manage public infrastructure, fleets, reporting, and citizen services.',
        icon: BarChart3,
    },
];
export default function PremiumAccountTypeSelector({ selected, onChange, }) {
    return (_jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900", children: "Who are you signing up for?" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: accountTypes.map((type) => {
                    const Icon = type.icon;
                    const isSelected = selected === type.id;
                    return (_jsxs(motion.button, { onClick: () => onChange(type.id), whileHover: { y: -8 }, whileTap: { scale: 0.98 }, className: `relative p-5 rounded-xl border-2 transition-all text-left overflow-hidden group ${isSelected
                            ? 'border-bright-green bg-bright-green/10 shadow-lg shadow-bright-green/30'
                            : 'border-gray-200 bg-white hover:border-bright-green/50 hover:shadow-lg'}`, children: [isSelected && (_jsx(motion.div, { className: "absolute inset-0 bg-gradient-to-br from-bright-green/20 to-transparent", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.3 } })), _jsxs("div", { className: "relative z-10 flex items-start gap-4", children: [_jsx(motion.div, { className: `w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition ${isSelected ? 'bg-bright-green text-white' : 'bg-gray-100 text-gray-600 group-hover:bg-bright-green/10 group-hover:text-bright-green'}`, animate: isSelected ? { rotate: 8 } : { rotate: 0 }, transition: { type: 'spring', stiffness: 300 }, children: _jsx(Icon, { className: "w-6 h-6" }) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h4", { className: "font-semibold text-gray-900", children: type.label }), isSelected && (_jsx(motion.div, { initial: { scale: 0, rotate: -180 }, animate: { scale: 1, rotate: 0 }, transition: { type: 'spring', stiffness: 300, damping: 15 }, className: "w-5 h-5 bg-bright-green rounded-full flex items-center justify-center flex-shrink-0", children: _jsx(Check, { className: "w-3 h-3 text-white", strokeWidth: 3 }) }))] }), _jsx(motion.p, { className: `text-sm transition-colors ${isSelected ? 'text-gray-700' : 'text-gray-600 group-hover:text-gray-700'}`, initial: false, animate: { opacity: isSelected ? 1 : 0.8 }, children: type.description })] })] }), isSelected && (_jsx(motion.div, { className: "absolute inset-0 border-2 border-bright-green rounded-xl", animate: {
                                    boxShadow: [
                                        '0 0 0 0 rgba(16, 185, 129, 0.3)',
                                        '0 0 20px 10px rgba(16, 185, 129, 0)',
                                    ],
                                }, transition: {
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatDelay: 1,
                                }, style: { pointerEvents: 'none' } }))] }, type.id));
                }) })] }));
}
