import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Trash2, Plus, X } from 'lucide-react';
import api from '../services/api';
export default function Subscriptions() {
    const [subscriptions, setSubscriptions] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        serviceType: 'TRASH',
        frequency: 'WEEKLY',
        containerSize: 64,
        price: 25,
    });
    useEffect(() => {
        fetchSubscriptions();
    }, []);
    const fetchSubscriptions = async () => {
        try {
            const res = await api.get('/subscriptions');
            setSubscriptions(res.data);
        }
        catch (error) {
            console.error('Failed to fetch subscriptions:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/subscriptions', formData);
            setFormData({
                serviceType: 'TRASH',
                frequency: 'WEEKLY',
                containerSize: 64,
                price: 25,
            });
            setShowForm(false);
            fetchSubscriptions();
        }
        catch (error) {
            console.error('Failed to create subscription:', error);
        }
    };
    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this subscription?')) {
            try {
                await api.delete(`/subscriptions/${id}`);
                fetchSubscriptions();
            }
            catch (error) {
                console.error('Failed to delete subscription:', error);
            }
        }
    };
    if (loading) {
        return _jsx("div", { className: "p-8", children: "Loading..." });
    }
    return (_jsxs("div", { className: "p-8", children: [_jsxs("div", { className: "flex justify-between items-center mb-8", children: [_jsx("h1", { className: "text-4xl font-bold", children: "Waste Services" }), _jsxs("button", { onClick: () => setShowForm(!showForm), className: "btn btn-primary flex items-center gap-2", children: [_jsx(Plus, { className: "w-5 h-5" }), "Add Service"] })] }), showForm && (_jsxs("div", { className: "card mb-8", children: [_jsx("h2", { className: "text-2xl font-bold mb-6", children: "New Service Subscription" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Service Type" }), _jsxs("select", { value: formData.serviceType, onChange: (e) => setFormData({ ...formData, serviceType: e.target.value }), className: "input", children: [_jsx("option", { value: "TRASH", children: "Trash" }), _jsx("option", { value: "RECYCLING", children: "Recycling" }), _jsx("option", { value: "COMPOSTING", children: "Composting" }), _jsx("option", { value: "BULKY_ITEMS", children: "Bulky Items" }), _jsx("option", { value: "HAZARDOUS_WASTE", children: "Hazardous Waste" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Frequency" }), _jsxs("select", { value: formData.frequency, onChange: (e) => setFormData({ ...formData, frequency: e.target.value }), className: "input", children: [_jsx("option", { value: "WEEKLY", children: "Weekly" }), _jsx("option", { value: "BIWEEKLY", children: "Bi-Weekly" }), _jsx("option", { value: "MONTHLY", children: "Monthly" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Container Size (Gallons)" }), _jsx("input", { type: "number", value: formData.containerSize, onChange: (e) => setFormData({ ...formData, containerSize: parseInt(e.target.value) }), className: "input" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Monthly Price ($)" }), _jsx("input", { type: "number", step: "0.01", value: formData.price, onChange: (e) => setFormData({ ...formData, price: parseFloat(e.target.value) }), className: "input" })] })] }), _jsxs("div", { className: "flex gap-4", children: [_jsx("button", { type: "submit", className: "btn btn-primary flex-1", children: "Create Subscription" }), _jsx("button", { type: "button", onClick: () => setShowForm(false), className: "btn btn-secondary flex-1", children: "Cancel" })] })] })] })), _jsx("div", { className: "grid gap-4", children: subscriptions.length === 0 ? (_jsxs("div", { className: "card text-center py-12", children: [_jsx(Trash2, { className: "w-16 h-16 text-gray-400 mx-auto mb-4" }), _jsx("p", { className: "text-gray-600 mb-4", children: "No active subscriptions yet." }), _jsx("button", { onClick: () => setShowForm(true), className: "btn btn-primary", children: "Create Your First Service" })] })) : (subscriptions.map((sub) => (_jsxs("div", { className: "card", children: [_jsxs("div", { className: "flex justify-between items-start mb-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-xl font-bold", children: sub.serviceType }), _jsxs("p", { className: "text-gray-600", children: [sub.frequency, " | ", sub.containerSize, " gallon container"] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("p", { className: "text-2xl font-bold text-bright-green", children: ["$", sub.price, "/month"] }), _jsx("span", { className: `text-xs font-bold px-3 py-1 rounded-full inline-block mt-2 ${sub.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`, children: sub.status })] })] }), sub.collections && sub.collections.length > 0 && (_jsxs("div", { className: "border-t pt-4 mt-4", children: [_jsx("p", { className: "text-sm font-medium text-gray-600", children: "Last Collections" }), _jsx("div", { className: "mt-2 space-y-2", children: sub.collections.slice(0, 3).map((col, idx) => (_jsx("div", { className: "text-sm text-gray-600", children: new Date(col.collectedAt).toLocaleDateString() }, idx))) })] })), _jsxs("button", { onClick: () => handleDelete(sub.id), className: "mt-4 btn btn-secondary w-full flex items-center justify-center gap-2", children: [_jsx(X, { className: "w-4 h-4" }), "Cancel Subscription"] })] }, sub.id)))) })] }));
}
