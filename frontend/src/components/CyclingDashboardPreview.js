import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Zap, MapPin, CheckCircle, Truck, Leaf, Shield, Lock } from 'lucide-react';
const dashboardMetrics = {
    household: {
        type: 'Household',
        title: 'Your Home Dashboard',
        metrics: [
            { label: 'Next Pickup', value: 'Tomorrow', icon: Truck },
            { label: 'Recycling Score', value: '94%', icon: Leaf },
            { label: 'Monthly Usage', value: '245kg', icon: CheckCircle },
            { label: 'Carbon Saved', value: '+2.4kg', icon: Zap },
        ],
        activities: [
            'Collection completed',
            'Recycling pickup scheduled',
            'Carbon offset earned',
        ],
    },
    business: {
        type: 'Business',
        title: 'Multi-Location Operations',
        metrics: [
            { label: 'Locations', value: '7', icon: MapPin },
            { label: 'Fleet Active', value: '12/15', icon: Truck },
            { label: 'Invoices', value: '$24.5K', icon: CheckCircle },
            { label: 'Waste Reduction', value: '+12%', icon: Zap },
        ],
        activities: [
            'All locations synced',
            'Route 4 completed',
            '12% efficiency gain',
        ],
    },
    community: {
        type: 'Community',
        title: 'Neighborhood Oversight',
        metrics: [
            { label: 'Service Routes', value: '156', icon: MapPin },
            { label: 'Fleet Online', value: '34/42', icon: Truck },
            { label: 'Live Requests', value: '12', icon: CheckCircle },
            { label: 'Coverage', value: '98.3%', icon: Zap },
        ],
        activities: [
            '156 collections completed',
            'Coverage at 98.3%',
            'Service requests: 12 pending',
        ],
    },
    government: {
        type: 'Municipality',
        title: 'Jurisdiction Overview',
        metrics: [
            { label: 'Districts', value: '12', icon: MapPin },
            { label: 'Fleet', value: '127/142', icon: Truck },
            { label: 'Citizen Reports', value: '48', icon: CheckCircle },
            { label: 'Route Completion', value: '98%', icon: Zap },
        ],
        activities: [
            'System operating at 94.2%',
            'Landfill diversion up 3.2%',
            'Citizen satisfaction: 4.8/5',
        ],
    },
};
const dashboardOrder = ['household', 'business', 'community', 'government'];
export default function CyclingDashboardPreview({ selectedAccountType }) {
    const [currentDashboard, setCurrentDashboard] = useState('household');
    const [autoRotate, setAutoRotate] = useState(true);
    // Auto-rotate dashboards every 5 seconds unless user selected one
    useEffect(() => {
        if (!autoRotate)
            return;
        const interval = setInterval(() => {
            setCurrentDashboard((prev) => {
                const currentIndex = dashboardOrder.indexOf(prev);
                const nextIndex = (currentIndex + 1) % dashboardOrder.length;
                return dashboardOrder[nextIndex];
            });
        }, 5000);
        return () => clearInterval(interval);
    }, [autoRotate]);
    // When user selects account type, show that dashboard
    useEffect(() => {
        if (selectedAccountType && selectedAccountType !== 'government') {
            const typeMap = {
                individual: 'household',
                business: 'business',
                community: 'community',
            };
            setCurrentDashboard(typeMap[selectedAccountType] || 'household');
            setAutoRotate(false);
        }
        else if (selectedAccountType === 'government') {
            setCurrentDashboard('government');
            setAutoRotate(false);
        }
    }, [selectedAccountType]);
    const dashboard = dashboardMetrics[currentDashboard];
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
    return (_jsxs(motion.div, { variants: containerVariants, initial: "hidden", animate: "visible", className: "space-y-8", children: [_jsxs(motion.div, { variants: itemVariants, className: "space-y-4", children: [_jsxs("h2", { className: "text-5xl lg:text-6xl font-black leading-tight text-white", children: ["Building the", _jsx("br", {}), _jsx("span", { className: "bg-gradient-to-r from-bright-green to-emerald-400 bg-clip-text text-transparent", children: "Operating System" }), _jsx("br", {}), "for Cleaner", _jsx("br", {}), "Communities"] }), _jsx("p", { className: "text-lg text-gray-300 leading-relaxed max-w-lg", children: "From one neighborhood to an entire nation, Bright Solutions helps organizations coordinate environmental infrastructure through intelligent software." })] }), _jsx(motion.div, { variants: itemVariants, className: "mt-12 p-6 rounded-2xl overflow-hidden", style: {
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                }, children: _jsx(AnimatePresence, { mode: "wait", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, transition: { duration: 0.5 }, className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("h3", { className: "font-semibold text-white text-lg", children: dashboard.title }), _jsxs("p", { className: "text-xs text-gray-400", children: [dashboard.type, " dashboard \u2022 Live metrics"] })] }), _jsxs(motion.div, { className: "flex items-center gap-2 px-3 py-1.5 bg-bright-green/20 border border-bright-green/40 rounded-full", animate: { opacity: [0.6, 1, 0.6] }, transition: { duration: 2, repeat: Infinity }, children: [_jsx(motion.div, { className: "w-2 h-2 bg-bright-green rounded-full", animate: { scale: [1, 1.2, 1] }, transition: { duration: 2, repeat: Infinity } }), _jsx("span", { className: "text-xs text-bright-green font-medium", children: "Live" })] })] }), _jsx("div", { className: "grid grid-cols-2 gap-3", children: dashboard.metrics.map((metric, idx) => {
                                    const Icon = metric.icon;
                                    return (_jsxs(motion.div, { className: "p-4 rounded-lg bg-white/8 border border-white/10 hover:border-bright-green/40 hover:bg-bright-green/10 transition group cursor-pointer", initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { delay: idx * 0.1 }, whileHover: { y: -4 }, children: [_jsx("div", { className: "flex items-start justify-between mb-2", children: _jsx("div", { className: "w-8 h-8 rounded-lg bg-bright-green/20 flex items-center justify-center group-hover:bg-bright-green/30 transition", children: _jsx(Icon, { className: "w-4 h-4 text-bright-green" }) }) }), _jsx(motion.p, { className: "text-2xl font-bold text-white font-mono", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: idx * 0.1 + 0.2 }, children: metric.value }, `${currentDashboard}-${idx}`), _jsx("p", { className: "text-xs text-gray-400 mt-1", children: metric.label })] }, idx));
                                }) }), _jsx("div", { className: "pt-4 border-t border-white/10 space-y-2", children: dashboard.activities.map((activity, idx) => (_jsxs(motion.div, { className: "flex items-center gap-3 text-sm text-gray-300", initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.3 + idx * 0.1 }, children: [_jsx(motion.div, { className: "w-1.5 h-1.5 bg-bright-green rounded-full", animate: { scale: [1, 1.3, 1] }, transition: { duration: 2, repeat: Infinity, delay: idx * 0.2 } }), _jsx("span", { children: activity })] }, idx))) }), _jsxs(motion.div, { className: "mt-4 p-3 bg-bright-green/20 border border-bright-green/40 rounded-lg flex items-center gap-3", initial: { opacity: 0, y: 10, x: -20 }, animate: { opacity: 1, y: 0, x: 0 }, transition: { delay: 0.6 }, children: [_jsx(motion.div, { initial: { scale: 0 }, animate: { scale: 1 }, transition: { delay: 0.7, type: 'spring', stiffness: 300 }, className: "w-5 h-5 bg-bright-green rounded-full flex items-center justify-center flex-shrink-0", children: _jsx(CheckCircle, { className: "w-3 h-3 text-white", strokeWidth: 3 }) }), _jsx("span", { className: "text-sm text-gray-200 font-medium", children: "Collection completed" }), _jsx("span", { className: "text-xs text-gray-400 ml-auto", children: "just now" })] }), !selectedAccountType && (_jsx("div", { className: "flex items-center justify-center gap-2 pt-2", children: dashboardOrder.map((type) => (_jsx(motion.button, { onClick: () => {
                                        setCurrentDashboard(type);
                                        setAutoRotate(false);
                                    }, className: `w-2 h-2 rounded-full transition ${currentDashboard === type ? 'bg-bright-green w-6' : 'bg-white/30'}`, whileHover: { scale: 1.3 } }, type))) }))] }, currentDashboard) }) }), _jsx(motion.div, { variants: itemVariants, className: "space-y-4 pt-4", children: [
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
                    return (_jsxs(motion.div, { className: "flex gap-4", whileHover: { x: 4 }, transition: { type: 'spring', stiffness: 300 }, children: [_jsx("div", { className: "flex-shrink-0", children: _jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-lg bg-bright-green/20 border border-bright-green/30", children: _jsx(Icon, { className: "h-5 w-5 text-bright-green" }) }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-gray-200", children: benefit.title }), _jsx("p", { className: "text-sm text-gray-400 mt-1", children: benefit.desc })] })] }, idx));
                }) }), _jsx(motion.div, { variants: itemVariants, className: "pt-8 border-t border-bright-green/20", children: _jsxs("p", { className: "text-sm text-gray-300 italic text-center", children: [_jsx("span", { className: "text-bright-green font-semibold", children: "Every account created" }), " is one step toward cleaner, healthier communities."] }) }), _jsx(motion.div, { variants: itemVariants, className: "pt-4 space-y-3 text-xs text-gray-400", children: [
                    { Icon: Lock, text: 'Secure authentication' },
                    { Icon: Shield, text: 'Your information is encrypted' },
                    { Icon: Zap, text: 'No credit card required' },
                ].map((indicator, idx) => {
                    const Icon = indicator.Icon;
                    return (_jsxs(motion.div, { className: "flex items-center gap-3", initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 }, transition: { delay: 1.2 + idx * 0.05 }, children: [_jsx(motion.div, { animate: { scale: [1, 1.15, 1] }, transition: { delay: 1.3 + idx * 0.05, type: 'spring' }, children: _jsx(Icon, { className: "w-4 h-4 text-bright-green flex-shrink-0" }) }), _jsx("span", { children: indicator.text })] }, idx));
                }) })] }));
}
