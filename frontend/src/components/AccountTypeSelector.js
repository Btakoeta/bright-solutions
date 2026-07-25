import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Users, Building2, Home, BarChart3 } from 'lucide-react';
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
export default function AccountTypeSelector({ selected, onChange }) {
    return (_jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900", children: "Who are you signing up for?" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: accountTypes.map((type) => {
                    const Icon = type.icon;
                    const isSelected = selected === type.id;
                    return (_jsx(motion.button, { onClick: () => onChange(type.id), whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, className: `relative p-5 rounded-xl border-2 transition-all text-left ${isSelected
                            ? 'border-bright-green bg-bright-green/5 shadow-md'
                            : 'border-gray-200 bg-white hover:border-bright-green/50'}`, children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: `w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition ${isSelected ? 'bg-bright-green text-white' : 'bg-gray-100 text-gray-600'}`, children: _jsx(Icon, { className: "w-5 h-5" }) }), _jsxs("div", { className: "flex-1", children: [_jsx("h4", { className: "font-semibold text-gray-900", children: type.label }), _jsx("p", { className: "text-sm text-gray-600 mt-1", children: type.description })] })] }) }, type.id));
                }) })] }));
}
