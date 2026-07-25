import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
export default function HeroVisualization() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: 'easeOut' },
        },
    };
    const floatVariants = {
        hidden: { opacity: 0, y: 0 },
        visible: {
            opacity: 1,
            y: [0, -15, 0],
            transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
        },
    };
    const slideVariants = {
        hidden: { opacity: 0, x: 100 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.8, ease: 'easeOut' },
        },
    };
    return (_jsxs("div", { className: "relative h-96 lg:h-full rounded-3xl overflow-hidden bg-gradient-to-br from-bright-green/10 via-blue-500/5 to-bright-green/5 border border-bright-green/20", children: [_jsxs("svg", { className: "absolute inset-0 w-full h-full", viewBox: "0 0 800 600", preserveAspectRatio: "xMidYMid slice", children: [_jsxs("defs", { children: [_jsxs("linearGradient", { id: "skyGradient", x1: "0%", y1: "0%", x2: "0%", y2: "100%", children: [_jsx("stop", { offset: "0%", stopColor: "#f0f9ff" }), _jsx("stop", { offset: "100%", stopColor: "#e0f2fe" })] }), _jsxs("linearGradient", { id: "groundGradient", x1: "0%", y1: "0%", x2: "0%", y2: "100%", children: [_jsx("stop", { offset: "0%", stopColor: "#f0fdf4" }), _jsx("stop", { offset: "100%", stopColor: "#dcfce7" })] })] }), _jsx("rect", { width: "800", height: "350", fill: "url(#skyGradient)" }), _jsx("rect", { y: "350", width: "800", height: "250", fill: "url(#groundGradient)" }), _jsx("rect", { x: "50", y: "250", width: "100", height: "100", fill: "#e5e7eb", opacity: "0.6" }), _jsx("rect", { x: "70", y: "270", width: "12", height: "12", fill: "#1f2937" }), _jsx("rect", { x: "90", y: "270", width: "12", height: "12", fill: "#1f2937" }), _jsx("rect", { x: "70", y: "290", width: "12", height: "12", fill: "#1f2937" }), _jsx("rect", { x: "90", y: "290", width: "12", height: "12", fill: "#1f2937" }), _jsx("rect", { x: "200", y: "270", width: "80", height: "80", fill: "#d1d5db", opacity: "0.5" }), _jsx("rect", { x: "215", y: "285", width: "10", height: "10", fill: "#374151" }), _jsx("rect", { x: "235", y: "285", width: "10", height: "10", fill: "#374151" }), _jsx("rect", { x: "255", y: "285", width: "10", height: "10", fill: "#374151" }), _jsx("rect", { x: "520", y: "240", width: "90", height: "110", fill: "#d1d5db", opacity: "0.5" }), _jsx("rect", { x: "540", y: "260", width: "12", height: "12", fill: "#374151" }), _jsx("rect", { x: "565", y: "260", width: "12", height: "12", fill: "#374151" }), _jsx("rect", { x: "540", y: "285", width: "12", height: "12", fill: "#374151" }), _jsx("rect", { x: "565", y: "285", width: "12", height: "12", fill: "#374151" }), _jsx("rect", { x: "670", y: "260", width: "110", height: "90", fill: "#e5e7eb", opacity: "0.6" }), _jsx("rect", { x: "690", y: "280", width: "12", height: "12", fill: "#1f2937" }), _jsx("rect", { x: "715", y: "280", width: "12", height: "12", fill: "#1f2937" }), _jsx("rect", { x: "740", y: "280", width: "12", height: "12", fill: "#1f2937" }), _jsx("rect", { y: "360", width: "800", height: "60", fill: "#9ca3af" }), _jsx("line", { x1: "0", y1: "390", x2: "800", y2: "390", stroke: "#fff", strokeWidth: "2", strokeDasharray: "40,40" })] }), _jsx(motion.div, { className: "absolute bottom-32 left-0 w-24 h-12", initial: { x: -100, opacity: 0 }, animate: { x: 400, opacity: 1 }, transition: { duration: 6, repeat: Infinity, ease: 'linear', delay: 0 }, children: _jsxs("div", { className: "relative w-full h-full", children: [_jsx("div", { className: "absolute w-16 h-10 bg-bright-green rounded-lg shadow-lg" }), _jsx("div", { className: "absolute left-16 w-8 h-10 bg-bright-green/80 rounded-l-lg shadow-lg" }), _jsx("div", { className: "absolute bottom-0 left-4 w-4 h-4 bg-gray-800 rounded-full" }), _jsx("div", { className: "absolute bottom-0 left-12 w-4 h-4 bg-gray-800 rounded-full" })] }) }), _jsx(motion.div, { className: "absolute bottom-20 right-0 w-24 h-12", initial: { x: 100, opacity: 0 }, animate: { x: -400, opacity: 1 }, transition: { duration: 5, repeat: Infinity, ease: 'linear', delay: 1 }, children: _jsxs("div", { className: "relative w-full h-full", children: [_jsx("div", { className: "absolute w-16 h-10 bg-bright-green/90 rounded-lg shadow-lg" }), _jsx("div", { className: "absolute right-16 w-8 h-10 bg-bright-green/70 rounded-r-lg shadow-lg" }), _jsx("div", { className: "absolute bottom-0 right-4 w-4 h-4 bg-gray-800 rounded-full" }), _jsx("div", { className: "absolute bottom-0 right-12 w-4 h-4 bg-gray-800 rounded-full" })] }) }), _jsx(motion.div, { className: "absolute -bottom-6 -right-4 bg-white/95 backdrop-blur border border-bright-green/20 rounded-2xl p-5 shadow-2xl z-10", variants: floatVariants, initial: "hidden", animate: "visible", style: { maxWidth: '280px' }, children: _jsxs(motion.div, { variants: containerVariants, initial: "hidden", animate: "visible", children: [_jsxs(motion.div, { variants: itemVariants, className: "mb-4", children: [_jsx("p", { className: "text-xs font-semibold text-gray-500 uppercase tracking-wide", children: "Environmental Score" }), _jsxs("div", { className: "flex items-baseline gap-2 mt-2", children: [_jsx("span", { className: "text-3xl font-bold text-bright-green", children: "98" }), _jsx("span", { className: "text-gray-500", children: "%" })] })] }), _jsxs(motion.div, { variants: itemVariants, className: "grid grid-cols-2 gap-4 mb-4 pt-4 border-t border-gray-200", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs text-gray-500 mb-1", children: "Waste Collected" }), _jsx("p", { className: "text-lg font-bold text-gray-900", children: "12.5K" }), _jsx("p", { className: "text-xs text-gray-400", children: "kg today" })] }), _jsxs("div", { children: [_jsx("p", { className: "text-xs text-gray-500 mb-1", children: "Carbon Saved" }), _jsx("p", { className: "text-lg font-bold text-bright-green", children: "3.4T" }), _jsx("p", { className: "text-xs text-gray-400", children: "this week" })] })] }), _jsxs(motion.div, { variants: itemVariants, className: "flex items-center gap-2 pt-3 border-t border-gray-200", children: [_jsx("div", { className: "w-2 h-2 bg-green-400 rounded-full animate-pulse" }), _jsx("span", { className: "text-xs font-medium text-gray-700", children: "42 vehicles online" })] })] }) }), _jsxs(motion.div, { className: "absolute top-8 right-8 bg-white/90 backdrop-blur border border-bright-green/20 rounded-xl p-4 shadow-lg", variants: floatVariants, initial: "hidden", animate: "visible", style: { maxWidth: '200px' }, children: [_jsxs("div", { className: "flex items-center gap-2 mb-3", children: [_jsx("div", { className: "w-8 h-8 bg-bright-green/10 rounded-lg flex items-center justify-center", children: _jsx(TrendingUp, { className: "w-4 h-4 text-bright-green" }) }), _jsx("span", { className: "text-sm font-semibold text-gray-900", children: "Fleet Activity" })] }), _jsx("p", { className: "text-2xl font-bold text-bright-green", children: "+18%" }), _jsx("p", { className: "text-xs text-gray-500 mt-1", children: "efficiency this month" })] }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent pointer-events-none" })] }));
}
