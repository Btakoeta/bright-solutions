import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
export default function Onboarding() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        organizationName: '',
        phoneNumber: '',
        serviceAddress: '',
        city: '',
        state: '',
        zipCode: '',
    });
    const navigate = useNavigate();
    const totalSteps = 3;
    const handleNext = () => {
        if (step < totalSteps) {
            setStep(step + 1);
        }
        else {
            // Complete onboarding
            navigate('/dashboard');
        }
    };
    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };
    const steps = [
        {
            title: 'Tell us about your organization',
            subtitle: 'Help us personalize your experience',
            fields: [
                { name: 'organizationName', label: 'Organization Name', placeholder: 'e.g., Acme Corp' },
                { name: 'phoneNumber', label: 'Phone Number', placeholder: '+1 (555) 000-0000', type: 'tel' },
            ],
        },
        {
            title: 'Service details',
            subtitle: 'Where are you located?',
            fields: [
                { name: 'serviceAddress', label: 'Service Address', placeholder: '123 Main St' },
                { name: 'city', label: 'City', placeholder: 'City name' },
                { name: 'state', label: 'State', placeholder: 'State code' },
                { name: 'zipCode', label: 'ZIP Code', placeholder: '12345' },
            ],
        },
        {
            title: 'You\'re all set!',
            subtitle: 'Your account is ready',
            completion: true,
        },
    ];
    const currentStep = steps[step - 1];
    return (_jsx("div", { className: "min-h-screen bg-gray-50", style: {
            backgroundImage: `
          radial-gradient(circle at 15% 20%, rgba(16, 185, 129, 0.10), transparent 30%),
          radial-gradient(circle at 80% 75%, rgba(14, 165, 233, 0.08), transparent 28%)
        `,
            backgroundColor: '#f8fafc',
        }, children: _jsx("div", { className: "min-h-screen flex items-center justify-center px-6 py-16", children: _jsxs("div", { className: "w-full max-w-2xl", children: [_jsxs("div", { className: "mb-12", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("h2", { className: "text-sm font-semibold text-gray-900", children: ["Step ", step, " of ", totalSteps] }), _jsxs("span", { className: "text-sm text-gray-600", children: [Math.round((step / totalSteps) * 100), "%"] })] }), _jsx("div", { className: "h-1 bg-gray-200 rounded-full overflow-hidden", children: _jsx(motion.div, { className: "h-full bg-bright-green", initial: { width: 0 }, animate: { width: `${(step / totalSteps) * 100}%` }, transition: { duration: 0.5 } }) })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, transition: { duration: 0.4 }, className: "bg-white rounded-2xl shadow-lg p-8 lg:p-12", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-2", children: currentStep.title }), _jsx("p", { className: "text-gray-600", children: currentStep.subtitle })] }), currentStep.completion ? (_jsxs(motion.div, { initial: { scale: 0.9, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { delay: 0.2 }, className: "text-center py-12 space-y-6", children: [_jsx("div", { className: "flex justify-center", children: _jsx("div", { className: "p-4 bg-bright-green/10 rounded-full", children: _jsx(CheckCircle, { className: "w-16 h-16 text-bright-green" }) }) }), _jsxs("div", { className: "space-y-2", children: [_jsx("p", { className: "text-xl text-gray-600", children: "Your Bright Solutions account is ready to use." }), _jsx("p", { className: "text-gray-600", children: "Let's take you to your personalized dashboard." })] })] })) : (_jsxs("form", { onSubmit: (e) => {
                                    e.preventDefault();
                                    handleNext();
                                }, className: "space-y-6", children: [currentStep.fields?.map((field) => (_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-900 mb-2", children: field.label }), _jsx("input", { type: field.type || 'text', value: formData[field.name], onChange: (e) => setFormData((prev) => ({
                                                    ...prev,
                                                    [field.name]: e.target.value,
                                                })), placeholder: field.placeholder, className: "w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-bright-green focus:border-transparent transition" })] }, field.name))), _jsxs("div", { className: "flex gap-4 pt-6", children: [step > 1 && (_jsx("button", { type: "button", onClick: handleBack, className: "flex-1 py-3 px-6 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition", children: "Back" })), _jsxs("button", { type: "submit", className: "flex-1 py-3 px-6 bg-bright-green text-white font-bold rounded-lg hover:bg-green-600 transition flex items-center justify-center gap-2", children: [step === totalSteps ? 'Complete Setup' : 'Continue', _jsx(ArrowRight, { className: "w-4 h-4" })] })] })] })), currentStep.completion && (_jsx("div", { className: "flex gap-4 pt-8", children: _jsxs("button", { onClick: () => navigate('/dashboard'), className: "flex-1 py-3 px-6 bg-bright-green text-white font-bold rounded-lg hover:bg-green-600 transition flex items-center justify-center gap-2", children: ["Go to Dashboard", _jsx(ArrowRight, { className: "w-4 h-4" })] }) }))] }, step), step < totalSteps && (_jsx("div", { className: "text-center mt-6", children: _jsx("button", { className: "text-gray-600 hover:text-gray-900 text-sm font-medium", children: "Save and continue later" }) }))] }) }) }));
}
