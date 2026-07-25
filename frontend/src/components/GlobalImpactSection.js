import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
const stages = [
    { emoji: '🏘️', label: 'One Neighborhood', desc: 'Starting local' },
    { emoji: '🏙️', label: 'One City', desc: 'Urban scale' },
    { emoji: '🗺️', label: 'One Municipality', desc: 'Regional impact' },
    { emoji: '🏛️', label: 'One State', desc: 'Statewide reach' },
    { emoji: '🇦🇺', label: 'One Nation', desc: 'National coverage' },
    { emoji: '🌍', label: 'A Cleaner World', desc: 'Global change' },
];
export default function GlobalImpactSection() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };
    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, ease: 'easeOut' },
        },
    };
    return (_jsx("section", { className: "py-24 bg-white", children: _jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs(motion.div, { className: "text-center mb-20", initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 }, children: [_jsx("h2", { className: "text-5xl lg:text-6xl font-bold mb-6 text-gray-900", children: "Building Infrastructure That Scales" }), _jsx("p", { className: "text-xl text-gray-600 max-w-2xl mx-auto", children: "From one neighborhood to an entire nation\u2014Bright Solutions grows with you." })] }), _jsxs(motion.div, { className: "relative", variants: containerVariants, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: '-100px' }, children: [_jsx("div", { className: "absolute hidden lg:block h-1 bg-gradient-to-r from-bright-green/0 via-bright-green to-bright-green/0 top-20 left-12 right-12" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6", children: stages.map((stage, index) => (_jsxs(motion.div, { variants: itemVariants, className: "relative", children: [_jsxs("div", { className: "bg-white border-2 border-bright-green/20 hover:border-bright-green rounded-xl p-8 text-center transition-all duration-300 hover:shadow-lg h-full flex flex-col items-center justify-center", children: [_jsx("div", { className: "w-12 h-12 bg-bright-green/10 rounded-full flex items-center justify-center mb-4 mx-auto relative z-10 border-2 border-bright-green", children: _jsx("span", { className: "text-sm font-bold text-bright-green", children: index + 1 }) }), _jsx("div", { className: "text-4xl mb-3", children: stage.emoji }), _jsx("h3", { className: "text-lg font-bold text-gray-900 mb-2", children: stage.label }), _jsx("p", { className: "text-sm text-gray-600", children: stage.desc })] }), index < stages.length - 1 && (_jsx("div", { className: "hidden lg:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10", children: _jsx(ArrowRight, { className: "w-5 h-5 text-bright-green" }) }))] }, index))) })] }), _jsx(motion.div, { className: "text-center mt-16", initial: { opacity: 0, y: 10 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6, delay: 0.4 }, children: _jsx("p", { className: "text-lg text-gray-600 mb-6", children: "That's the power of thinking globally from day one." }) })] }) }));
}
