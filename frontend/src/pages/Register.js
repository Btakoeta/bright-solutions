import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight, Shield, Lock, Zap } from 'lucide-react';
import PremiumAccountTypeSelector from '../components/PremiumAccountTypeSelector';
import PremiumPasswordField from '../components/PremiumPasswordField';
import CyclingDashboardPreview from '../components/CyclingDashboardPreview';
const commonEmailDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
export default function Register() {
    const [email, setEmail] = useState('');
    const [emailSuggestion, setEmailSuggestion] = useState(null);
    const [password, setPassword] = useState('');
    const [accountType, setAccountType] = useState(null);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitState, setSubmitState] = useState('idle');
    const [showNotification, setShowNotification] = useState(false);
    const { register } = useAuthStore();
    const navigate = useNavigate();
    // Animated notification every 12 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 3000);
        }, 12000);
        return () => clearInterval(interval);
    }, []);
    const isFormValid = email && password && accountType && agreeTerms && password.length >= 8;
    // Email validation with suggestions
    const handleEmailChange = (value) => {
        setEmail(value);
        const emailParts = value.split('@');
        if (emailParts.length === 2 && emailParts[1].length > 0) {
            const domain = emailParts[1];
            const localPart = emailParts[0];
            // Simple typo detection
            for (const commonDomain of commonEmailDomains) {
                const similarity = calculateSimilarity(domain, commonDomain);
                if (similarity > 0.7 && similarity < 1) {
                    setEmailSuggestion(`${localPart}@${commonDomain}`);
                    return;
                }
            }
        }
        setEmailSuggestion(null);
    };
    const calculateSimilarity = (str1, str2) => {
        const longer = str1.length > str2.length ? str1 : str2;
        const shorter = str1.length > str2.length ? str2 : str1;
        if (longer.length === 0)
            return 1.0;
        const editDistance = getEditDistance(longer, shorter);
        return (longer.length - editDistance) / longer.length;
    };
    const getEditDistance = (s1, s2) => {
        const costs = [];
        for (let i = 0; i <= s1.length; i++) {
            let lastValue = i;
            for (let j = 0; j <= s2.length; j++) {
                if (i === 0)
                    costs[j] = j;
                else if (j > 0) {
                    let newValue = costs[j - 1];
                    if (s1.charAt(i - 1) !== s2.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
            if (i > 0)
                costs[s2.length] = lastValue;
        }
        return costs[s2.length];
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSubmitState('creating');
        try {
            await register({
                email: emailSuggestion || email,
                password,
                userType: accountType,
                firstName: email.split('@')[0],
                lastName: '',
            });
            setSubmitState('success');
            setTimeout(() => {
                navigate('/onboarding');
            }, 1500);
        }
        catch (err) {
            setError(err.response?.data?.error || 'Registration failed. Please try again.');
            setSubmitState('idle');
        }
    };
    return (_jsx("div", { className: "min-h-screen bg-[#FAFBFC]", style: {
            backgroundImage: `
          radial-gradient(circle at 15% 20%, rgba(16, 185, 129, 0.10), transparent 30%),
          radial-gradient(circle at 80% 75%, rgba(14, 165, 233, 0.08), transparent 28%)
        `,
        }, children: _jsxs("div", { className: "grid lg:grid-cols-2 min-h-screen relative", children: [_jsx("div", { className: "absolute inset-0 pointer-events-none opacity-40", style: {
                        background: 'radial-gradient(circle at 30% 50%, rgba(16, 185, 129, 0.15), transparent 50%)',
                    } }), _jsxs(motion.div, { initial: { opacity: 0, x: -40 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.8 }, className: "hidden lg:flex flex-col justify-center px-12 py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-visible relative z-10", style: {
                        background: `
              radial-gradient(circle at top left, rgba(16, 185, 129, 0.18), transparent 35%),
              linear-gradient(135deg, #0f172a 0%, #1e293b 100%)
            `,
                    }, children: [_jsxs("div", { className: "mb-16 flex items-center gap-3 relative z-10", children: [_jsx("div", { className: "bg-bright-green rounded-lg px-3 py-2 flex items-center justify-center shadow-xl", children: _jsx("span", { className: "text-white font-black text-xl", children: "BS" }) }), _jsx("span", { className: "text-2xl font-bold", children: "Bright Solutions" })] }), _jsx("div", { className: "relative z-10", children: _jsx(CyclingDashboardPreview, { selectedAccountType: accountType }) })] }), _jsx(motion.div, { initial: { opacity: 0, x: 40 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.8 }, className: "flex items-center justify-center px-6 py-16 lg:py-0", children: _jsxs("div", { className: "w-full max-w-md", children: [_jsxs("div", { className: "lg:hidden mb-10 flex items-center justify-center gap-2", children: [_jsx("div", { className: "bg-bright-green rounded-lg px-3 py-2 flex items-center justify-center", children: _jsx("span", { className: "text-white font-black text-lg", children: "BS" }) }), _jsx("span", { className: "text-xl font-bold text-gray-900", children: "Bright Solutions" })] }), _jsxs(motion.div, { className: "mb-6 text-center lg:text-left", initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-2", children: "Create your account" }), _jsx("p", { className: "text-gray-600 text-sm", children: "Start building cleaner communities with intelligent environmental infrastructure." })] }), _jsx(AnimatePresence, { children: error && (_jsx(motion.div, { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, className: "bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm", children: error })) }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [_jsxs(motion.div, { className: "space-y-3", initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.3 }, children: [_jsxs(motion.button, { type: "button", className: "w-full py-3 px-4 border border-gray-200 rounded-lg font-medium text-gray-700 transition flex items-center justify-center gap-3 group hover:bg-[#F8FAFC] hover:border-bright-green/30", disabled: loading, whileHover: { y: -2 }, whileTap: { scale: 0.98 }, children: [_jsxs("svg", { className: "w-5 h-5 group-hover:scale-110 transition", viewBox: "0 0 24 24", children: [_jsx("path", { fill: "currentColor", d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" }), _jsx("path", { fill: "currentColor", d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" }), _jsx("path", { fill: "currentColor", d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" }), _jsx("path", { fill: "currentColor", d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" })] }), "Continue with Google"] }), _jsxs(motion.button, { type: "button", className: "w-full py-3 px-4 border border-gray-200 rounded-lg font-medium text-gray-700 transition flex items-center justify-center gap-3 group hover:bg-[#F8FAFC] hover:border-bright-green/30", disabled: loading, whileHover: { y: -2 }, whileTap: { scale: 0.98 }, children: [_jsx("svg", { className: "w-5 h-5 group-hover:scale-110 transition", fill: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { d: "M17.05 13.5c0-1.8-1.46-3.26-3.26-3.26-1.8 0-3.26 1.46-3.26 3.26s1.46 3.26 3.26 3.26c1.8 0 3.26-1.46 3.26-3.26zm-5.1 0c0-1.01.82-1.84 1.84-1.84 1.01 0 1.84.82 1.84 1.84s-.82 1.84-1.84 1.84c-1.01 0-1.84-.82-1.84-1.84z" }) }), "Continue with Apple"] })] }), _jsxs(motion.div, { className: "relative flex items-center gap-4", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.4 }, children: [_jsx("div", { className: "flex-1 border-t border-gray-200" }), _jsx("span", { className: "text-sm text-gray-500 px-2 font-medium", children: "or continue with email" }), _jsx("div", { className: "flex-1 border-t border-gray-200" })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.45 }, children: [_jsx("label", { className: "block text-sm font-semibold text-gray-900 mb-2", children: "Work email" }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "relative", children: _jsx("input", { type: "email", value: email, onChange: (e) => handleEmailChange(e.target.value), placeholder: "you@company.com", className: "w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-bright-green focus:border-transparent transition bg-[#FAFBFC] hover:bg-white shadow-inner", style: { boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)' }, required: true, disabled: loading }) }), _jsx(AnimatePresence, { children: emailSuggestion && (_jsxs(motion.button, { type: "button", onClick: () => setEmail(emailSuggestion), initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, className: "text-sm text-bright-green hover:text-green-600 font-medium flex items-center gap-1", children: ["Did you mean ", _jsx("span", { className: "font-semibold", children: emailSuggestion }), "?"] })) }), _jsx(AnimatePresence, { children: email && !emailSuggestion && (_jsxs(motion.div, { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, className: "text-sm text-gray-600 italic", children: ["Hi", ' ', _jsx("span", { className: "font-semibold text-gray-900", children: email.split('@')[0] }), ". We'll tailor your workspace after signup."] })) })] })] }), _jsx(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.5 }, children: _jsx(PremiumPasswordField, { value: password, onChange: setPassword, onShowToggle: setShowPassword, showPassword: showPassword }) }), _jsx(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.55 }, children: _jsx(PremiumAccountTypeSelector, { selected: accountType, onChange: setAccountType }) }), _jsxs(motion.label, { className: "flex items-start gap-3 cursor-pointer group", initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.6 }, children: [_jsx(motion.input, { type: "checkbox", checked: agreeTerms, onChange: (e) => setAgreeTerms(e.target.checked), className: "mt-1 w-5 h-5 rounded cursor-pointer accent-bright-green", disabled: loading, whileHover: { scale: 1.1 }, whileTap: { scale: 0.95 } }), _jsxs("span", { className: "text-sm text-gray-600", children: ["I agree to the", ' ', _jsx("a", { href: "#", className: "text-bright-green hover:underline font-semibold", children: "Terms of Service" }), ' ', "and", ' ', _jsx("a", { href: "#", className: "text-bright-green hover:underline font-semibold", children: "Privacy Policy" })] })] }), _jsxs(motion.button, { type: "submit", disabled: !isFormValid || loading, className: "w-full rounded-lg font-bold text-white transition disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group", initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.65 }, whileHover: !isFormValid || loading ? {} : { y: -2 }, whileTap: !isFormValid || loading ? {} : { scale: 0.98 }, style: {
                                            background: isFormValid && !loading
                                                ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                                                : '#d1d5db',
                                            boxShadow: isFormValid && !loading
                                                ? '0 10px 30px rgba(16, 185, 129, 0.4)'
                                                : '0 4px 12px rgba(0, 0, 0, 0.1)',
                                            padding: submitState === 'creating' ? '8px 16px' : '12px 16px',
                                        }, children: [isFormValid && !loading && (_jsx(motion.div, { className: "absolute inset-0 bg-gradient-to-r from-bright-green via-emerald-500 to-green-600 opacity-0 group-hover:opacity-20 transition", whileHover: { x: ['100%', '-100%'] }, transition: { duration: 1, repeat: Infinity } })), _jsxs(AnimatePresence, { mode: "wait", children: [submitState === 'idle' && (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "flex items-center justify-center gap-2 relative z-10 py-3", children: ["Create Account", _jsx(motion.div, { animate: isFormValid && !loading ? { x: [0, 4, 0] } : {}, transition: { duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }, children: _jsx(ArrowRight, { className: "w-4 h-4" }) })] }, "idle")), submitState === 'creating' && (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "flex flex-col items-center justify-center gap-2 relative z-10 py-2", children: [_jsx(motion.span, { animate: { opacity: [0.5, 1, 0.5] }, transition: { duration: 1.5, repeat: Infinity }, className: "text-sm", children: "Creating workspace..." }), _jsx(motion.div, { className: "w-24 h-1 bg-white/30 rounded-full overflow-hidden", initial: { width: 0 }, animate: { width: '100%' }, transition: { duration: 2, ease: 'easeInOut' }, children: _jsx(motion.div, { className: "h-full bg-white rounded-full", animate: { scaleX: [0, 1] }, transition: { duration: 2, ease: 'easeInOut' }, style: { originX: 0 } }) })] }, "creating")), submitState === 'success' && (_jsxs(motion.div, { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0 }, className: "flex items-center justify-center gap-2 relative z-10 py-3", children: [_jsx(motion.div, { animate: { scale: [1, 1.1, 1] }, transition: { duration: 0.5 }, children: _jsx(CheckCircle, { className: "w-5 h-5" }) }), "Workspace Ready!"] }, "success"))] })] })] }), _jsxs(motion.p, { className: "text-center mt-5 text-gray-600 text-sm", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.7 }, children: ["Already registered?", ' ', _jsx(Link, { to: "/login", className: "text-bright-green hover:underline font-semibold", children: "Sign in" })] }), _jsx(motion.div, { className: "mt-6 pt-5 border-t border-gray-200 space-y-2 text-xs text-gray-600", initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.8 }, children: [
                                    { Icon: Shield, text: 'Secure authentication' },
                                    { Icon: Lock, text: 'Your information is encrypted' },
                                    { Icon: Zap, text: 'No credit card required' },
                                ].map((indicator, idx) => {
                                    const Icon = indicator.Icon;
                                    return (_jsxs(motion.div, { className: "flex items-center gap-3", initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.85 + idx * 0.05 }, children: [_jsx(motion.div, { animate: { scale: [1, 1.15, 1] }, transition: { delay: 0.9 + idx * 0.05, type: 'spring' }, children: _jsx(Icon, { className: "w-3.5 h-3.5 text-bright-green flex-shrink-0" }) }), _jsx("span", { className: "text-gray-700", children: indicator.text })] }, idx));
                                }) })] }) }), _jsx(AnimatePresence, { children: showNotification && (_jsx(motion.div, { initial: { opacity: 0, y: 20, x: 20 }, animate: { opacity: 1, y: 0, x: 0 }, exit: { opacity: 0, y: 20, x: 20 }, transition: { duration: 0.3 }, className: "fixed bottom-6 right-6 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-xs", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(motion.div, { className: "w-5 h-5 bg-bright-green rounded-full flex items-center justify-center flex-shrink-0", animate: { scale: [0, 1] }, transition: { type: 'spring', stiffness: 300, damping: 15 }, children: _jsx(CheckCircle, { className: "w-3 h-3 text-white", strokeWidth: 3 }) }), _jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-sm font-semibold text-gray-900", children: "Route Completed" }), _jsx("p", { className: "text-xs text-gray-500", children: "2 seconds ago" })] })] }) })) })] }) }));
}
