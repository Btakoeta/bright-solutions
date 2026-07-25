import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { TrendingUp, Zap, MapPin, CheckCircle, Truck, Leaf } from 'lucide-react';
export default function DashboardPreviewSignup() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };
    return (_jsxs(motion.div, { variants: containerVariants, initial: "hidden", animate: "visible", className: "space-y-8", children: [_jsxs(motion.div, { variants: itemVariants, className: "space-y-4", children: [_jsx("h2", { className: "text-4xl font-bold text-gray-900 leading-tight", children: "Environmental infrastructure, managed intelligently." }), _jsx("p", { className: "text-lg text-gray-600 leading-relaxed", children: "Coordinate services, monitor operations, and measure environmental impact from one secure platform." })] }), _jsx(motion.div, { variants: itemVariants, className: "space-y-4", children: [
                    {
                        icon: TrendingUp,
                        title: 'Real-time visibility',
                        desc: 'See services, fleets, and operational activity as they happen.',
                    },
                    {
                        icon: Leaf,
                        title: 'Built for every scale',
                        desc: 'From one household to an entire municipality.',
                    },
                    {
                        icon: Zap,
                        title: 'Actionable intelligence',
                        desc: 'Turn environmental and operational data into better decisions.',
                    },
                ].map((benefit, idx) => {
                    const Icon = benefit.icon;
                    return (_jsxs("div", { className: "flex gap-4", children: [_jsx("div", { className: "flex-shrink-0", children: _jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-lg bg-bright-green/10", children: _jsx(Icon, { className: "h-5 w-5 text-bright-green" }) }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-gray-900", children: benefit.title }), _jsx("p", { className: "text-sm text-gray-600 mt-1", children: benefit.desc })] })] }, idx));
                }) }), _jsxs(motion.div, { variants: itemVariants, className: "mt-12 p-6 bg-white/40 backdrop-blur-sm border border-white/20 rounded-2xl space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "font-semibold text-gray-900", children: "Live Dashboard" }), _jsx("div", { className: "w-2 h-2 bg-bright-green rounded-full animate-pulse" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-3 text-sm", children: [_jsxs("div", { className: "p-3 bg-bright-green/10 rounded-lg", children: [_jsx("p", { className: "text-xs text-gray-600", children: "Active Collections" }), _jsx("p", { className: "text-lg font-bold text-gray-900 mt-1", children: "24" })] }), _jsxs("div", { className: "p-3 bg-blue-500/10 rounded-lg", children: [_jsx("p", { className: "text-xs text-gray-600", children: "Fleet Status" }), _jsx("p", { className: "text-lg font-bold text-gray-900 mt-1", children: "18/20" })] }), _jsxs("div", { className: "p-3 bg-amber-500/10 rounded-lg", children: [_jsx("p", { className: "text-xs text-gray-600", children: "Waste Collected" }), _jsx("p", { className: "text-lg font-bold text-gray-900 mt-1", children: "12.5K kg" })] }), _jsxs("div", { className: "p-3 bg-green-500/10 rounded-lg", children: [_jsx("p", { className: "text-xs text-gray-600", children: "Carbon Saved" }), _jsx("p", { className: "text-lg font-bold text-gray-900 mt-1", children: "3.4T" })] })] }), _jsxs("div", { className: "pt-3 border-t border-white/10 space-y-2", children: [_jsxs("div", { className: "flex items-center gap-2 text-xs", children: [_jsx(Truck, { className: "w-3 h-3 text-bright-green" }), _jsx("span", { className: "text-gray-600", children: "Fleet activity" })] }), _jsxs("div", { className: "flex items-center gap-2 text-xs", children: [_jsx(CheckCircle, { className: "w-3 h-3 text-bright-green" }), _jsx("span", { className: "text-gray-600", children: "Service requests" })] }), _jsxs("div", { className: "flex items-center gap-2 text-xs", children: [_jsx(MapPin, { className: "w-3 h-3 text-bright-green" }), _jsx("span", { className: "text-gray-600", children: "Live map activity" })] })] })] }), _jsxs(motion.div, { variants: itemVariants, className: "pt-8 border-t border-gray-200 space-y-3 text-xs text-gray-600", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(CheckCircle, { className: "w-4 h-4 text-bright-green flex-shrink-0" }), _jsx("span", { children: "Secure authentication" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(CheckCircle, { className: "w-4 h-4 text-bright-green flex-shrink-0" }), _jsx("span", { children: "Your information is encrypted" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(CheckCircle, { className: "w-4 h-4 text-bright-green flex-shrink-0" }), _jsx("span", { children: "No credit card required" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(CheckCircle, { className: "w-4 h-4 text-bright-green flex-shrink-0" }), _jsx("span", { children: "Setup takes approximately two minutes" })] })] })] }));
}
