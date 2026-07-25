import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../services/api';
import { Trash2, Plus } from 'lucide-react';
export default function WasteStats() {
    const [summary, setSummary] = useState(null);
    const [records, setRecords] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        wasteType: 'TRASH',
        weight: '',
        volume: '',
        notes: '',
    });
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const [summaryRes, recordsRes] = await Promise.all([
                api.get('/waste/summary'),
                api.get('/waste'),
            ]);
            setSummary(summaryRes.data);
            setRecords(recordsRes.data);
        }
        catch (error) {
            console.error('Failed to fetch waste data:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/waste', {
                ...formData,
                weight: parseFloat(formData.weight),
                volume: formData.volume ? parseFloat(formData.volume) : null,
            });
            setFormData({
                wasteType: 'TRASH',
                weight: '',
                volume: '',
                notes: '',
            });
            setShowForm(false);
            fetchData();
        }
        catch (error) {
            console.error('Failed to create waste record:', error);
        }
    };
    if (loading) {
        return _jsx("div", { className: "p-8", children: "Loading..." });
    }
    const chartData = summary ? Object.entries(summary.byType).map(([type, data]) => ({
        name: type,
        weight: data.weight,
        count: data.count,
    })) : [];
    const colors = ['#10B981', '#059669', '#047857', '#065F46', '#064E3B'];
    return (_jsxs("div", { className: "p-8", children: [_jsxs("div", { className: "flex justify-between items-center mb-8", children: [_jsx("h1", { className: "text-4xl font-bold", children: "Waste Analytics" }), _jsxs("button", { onClick: () => setShowForm(!showForm), className: "btn btn-primary flex items-center gap-2", children: [_jsx(Plus, { className: "w-5 h-5" }), "Log Waste"] })] }), showForm && (_jsxs("div", { className: "card mb-8", children: [_jsx("h2", { className: "text-2xl font-bold mb-6", children: "Log Waste Disposal" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Waste Type" }), _jsxs("select", { value: formData.wasteType, onChange: (e) => setFormData({ ...formData, wasteType: e.target.value }), className: "input", children: [_jsx("option", { value: "TRASH", children: "Trash" }), _jsx("option", { value: "RECYCLING", children: "Recycling" }), _jsx("option", { value: "COMPOSTING", children: "Composting" }), _jsx("option", { value: "BULKY_ITEMS", children: "Bulky Items" }), _jsx("option", { value: "HAZARDOUS_WASTE", children: "Hazardous Waste" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Weight (kg)" }), _jsx("input", { type: "number", step: "0.1", value: formData.weight, onChange: (e) => setFormData({ ...formData, weight: e.target.value }), className: "input", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Volume (cubic meters) - Optional" }), _jsx("input", { type: "number", step: "0.01", value: formData.volume, onChange: (e) => setFormData({ ...formData, volume: e.target.value }), className: "input" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Notes" }), _jsx("input", { type: "text", value: formData.notes, onChange: (e) => setFormData({ ...formData, notes: e.target.value }), className: "input", placeholder: "Optional notes" })] })] }), _jsxs("div", { className: "flex gap-4", children: [_jsx("button", { type: "submit", className: "btn btn-primary flex-1", children: "Log Waste" }), _jsx("button", { type: "button", onClick: () => setShowForm(false), className: "btn btn-secondary flex-1", children: "Cancel" })] })] })] })), summary && (_jsxs("div", { className: "grid md:grid-cols-3 gap-4 mb-8", children: [_jsxs("div", { className: "card", children: [_jsx("p", { className: "text-gray-600 text-sm", children: "Total Weight Disposed" }), _jsxs("p", { className: "text-3xl font-bold text-bright-green", children: [(summary.totalWeight / 1000).toFixed(1), "T"] }), _jsxs("p", { className: "text-xs text-gray-600 mt-2", children: [summary.recordCount, " collections"] })] }), _jsxs("div", { className: "card", children: [_jsx("p", { className: "text-gray-600 text-sm", children: "Total Volume" }), _jsxs("p", { className: "text-3xl font-bold text-bright-green", children: [summary.totalVolume.toFixed(1), "m\u00B3"] })] }), _jsxs("div", { className: "card", children: [_jsx("p", { className: "text-gray-600 text-sm", children: "Waste Types" }), _jsx("p", { className: "text-3xl font-bold text-bright-green", children: Object.keys(summary.byType).length })] })] })), _jsxs("div", { className: "grid md:grid-cols-2 gap-8 mb-8", children: [chartData.length > 0 && (_jsxs("div", { className: "card", children: [_jsx("h2", { className: "text-xl font-bold mb-4", children: "Waste by Type (Weight)" }), _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(BarChart, { data: chartData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "name" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Bar, { dataKey: "weight", fill: "#10B981" })] }) })] })), chartData.length > 0 && (_jsxs("div", { className: "card", children: [_jsx("h2", { className: "text-xl font-bold mb-4", children: "Waste Distribution" }), _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsx(PieChart, { children: _jsx(Pie, { data: chartData, cx: "50%", cy: "50%", labelLine: false, label: ({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`, outerRadius: 80, fill: "#8884d8", dataKey: "count", children: chartData.map((entry, index) => (_jsx(Cell, { fill: colors[index % colors.length] }, `cell-${index}`))) }) }) })] }))] }), _jsxs("div", { className: "card", children: [_jsx("h2", { className: "text-xl font-bold mb-4", children: "Recent Waste Records" }), records.length === 0 ? (_jsxs("div", { className: "text-center py-8", children: [_jsx(Trash2, { className: "w-12 h-12 text-gray-400 mx-auto mb-2" }), _jsx("p", { className: "text-gray-600", children: "No waste records yet" })] })) : (_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b", children: [_jsx("th", { className: "text-left py-3 px-4 font-bold", children: "Date" }), _jsx("th", { className: "text-left py-3 px-4 font-bold", children: "Type" }), _jsx("th", { className: "text-left py-3 px-4 font-bold", children: "Weight (kg)" }), _jsx("th", { className: "text-left py-3 px-4 font-bold", children: "Volume (m\u00B3)" }), _jsx("th", { className: "text-left py-3 px-4 font-bold", children: "Notes" })] }) }), _jsx("tbody", { children: records.map((record) => (_jsxs("tr", { className: "border-b hover:bg-gray-50", children: [_jsx("td", { className: "py-3 px-4", children: new Date(record.date).toLocaleDateString() }), _jsx("td", { className: "py-3 px-4 font-medium", children: record.wasteType }), _jsx("td", { className: "py-3 px-4", children: record.weight }), _jsx("td", { className: "py-3 px-4", children: record.volume?.toFixed(2) || '-' }), _jsx("td", { className: "py-3 px-4 text-sm text-gray-600", children: "-" })] }, record.id))) })] }) }))] })] }));
}
