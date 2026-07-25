import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import api from '../services/api';
import { User } from 'lucide-react';
export default function Settings() {
    const [profile, setProfile] = useState(null);
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState(false);
    useEffect(() => {
        fetchProfile();
    }, []);
    const fetchProfile = async () => {
        try {
            const res = await api.get('/users/me');
            setProfile(res.data);
            setFormData(res.data);
        }
        catch (error) {
            console.error('Failed to fetch profile:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put('/users/me', {
                firstName: formData?.firstName,
                lastName: formData?.lastName,
                phone: formData?.phone,
                address: formData?.address,
                city: formData?.city,
                state: formData?.state,
                zipCode: formData?.zipCode,
            });
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
            fetchProfile();
        }
        catch (error) {
            console.error('Failed to update profile:', error);
        }
    };
    if (loading || !formData) {
        return _jsx("div", { className: "p-8", children: "Loading..." });
    }
    return (_jsxs("div", { className: "p-8", children: [_jsx("h1", { className: "text-4xl font-bold mb-8", children: "Account Settings" }), saved && (_jsx("div", { className: "bg-green-100 text-green-700 px-4 py-3 rounded-lg mb-4", children: "Settings saved successfully!" })), _jsxs("div", { className: "grid md:grid-cols-3 gap-8", children: [_jsxs("div", { className: "card text-center", children: [_jsx("div", { className: "w-20 h-20 bg-bright-green rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx(User, { className: "w-10 h-10 text-white" }) }), _jsxs("h2", { className: "text-xl font-bold mb-2", children: [formData.firstName, " ", formData.lastName] }), _jsx("p", { className: "text-gray-600", children: formData.email }), _jsx("p", { className: "text-sm text-gray-600 mt-2", children: formData.userType })] }), _jsxs("div", { className: "md:col-span-2 card", children: [_jsx("h2", { className: "text-2xl font-bold mb-6", children: "Profile Information" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "First Name" }), _jsx("input", { type: "text", name: "firstName", value: formData.firstName, onChange: handleChange, className: "input" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Last Name" }), _jsx("input", { type: "text", name: "lastName", value: formData.lastName, onChange: handleChange, className: "input" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Email" }), _jsx("input", { type: "email", value: formData.email, disabled: true, className: "input opacity-50 cursor-not-allowed" }), _jsx("p", { className: "text-xs text-gray-600 mt-1", children: "Email cannot be changed" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Phone" }), _jsx("input", { type: "tel", name: "phone", value: formData.phone || '', onChange: handleChange, className: "input", placeholder: "(123) 456-7890" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Address" }), _jsx("input", { type: "text", name: "address", value: formData.address || '', onChange: handleChange, className: "input", placeholder: "123 Main St" })] }), _jsxs("div", { className: "grid md:grid-cols-3 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "City" }), _jsx("input", { type: "text", name: "city", value: formData.city || '', onChange: handleChange, className: "input" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "State" }), _jsx("input", { type: "text", name: "state", value: formData.state || '', onChange: handleChange, className: "input" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Zip Code" }), _jsx("input", { type: "text", name: "zipCode", value: formData.zipCode || '', onChange: handleChange, className: "input" })] })] }), _jsx("button", { type: "submit", className: "btn btn-primary w-full", children: "Save Changes" })] })] })] }), _jsxs("div", { className: "mt-8 card border-l-4 border-yellow-400", children: [_jsx("h3", { className: "text-lg font-bold mb-2", children: "Account Type" }), _jsx("p", { className: "text-gray-600", children: formData.userType }), _jsx("p", { className: "text-sm text-gray-600 mt-2", children: "To change your account type, please contact our support team." })] })] }));
}
