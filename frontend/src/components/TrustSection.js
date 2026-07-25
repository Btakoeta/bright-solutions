import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
const builtFor = [
    { icon: '👥', label: 'Individuals', desc: 'Residents reporting waste' },
    { icon: '💼', label: 'Businesses', desc: 'Commercial operations' },
    { icon: '🏛️', label: 'Municipalities', desc: 'City governments' },
    { icon: '🌍', label: 'Nations', desc: 'Government agencies' },
];
export default function TrustSection() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
            },
        },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };
    return (_jsx("section", { className: "py-16 bg-gray-50 border-t border-b border-gray-200", children: _jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs(motion.div, { className: "text-center mb-12", initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { duration: 0.6 }, children: [_jsx("p", { className: "text-sm font-semibold text-bright-green uppercase tracking-widest mb-3", children: "Built For" }), _jsx("p", { className: "text-xl text-gray-600", children: "Trusted by all stakeholders in the waste management ecosystem" })] }), _jsx(motion.div, { className: "grid grid-cols-2 md:grid-cols-4 gap-6", variants: containerVariants, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: '-50px' }, children: builtFor.map((item, idx) => (_jsxs(motion.div, { variants: itemVariants, className: "bg-white rounded-lg p-6 text-center border border-gray-200 hover:border-bright-green/30 transition", children: [_jsx("div", { className: "text-4xl mb-3", children: item.icon }), _jsx("h3", { className: "font-bold text-gray-900 mb-1", children: item.label }), _jsx("p", { className: "text-sm text-gray-600", children: item.desc })] }, idx))) })] }) }));
}
