import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { MapPin, Truck, AlertCircle } from 'lucide-react';
import api from '../services/api';
export default function Tracking() {
    const [trucks, setTrucks] = useState([]);
    const [selectedTruck, setSelectedTruck] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchTrucks = async () => {
            try {
                const res = await api.get('/trucks');
                setTrucks(res.data);
                if (res.data.length > 0) {
                    setSelectedTruck(res.data[0]);
                }
            }
            catch (error) {
                console.error('Failed to fetch trucks:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchTrucks();
        const interval = setInterval(fetchTrucks, 30000);
        return () => clearInterval(interval);
    }, []);
    if (loading) {
        return _jsx("div", { className: "p-8", children: "Loading..." });
    }
    if (trucks.length === 0) {
        return (_jsxs("div", { className: "p-8", children: [_jsx("h1", { className: "text-4xl font-bold mb-8", children: "Truck Tracking" }), _jsxs("div", { className: "card text-center py-12", children: [_jsx(Truck, { className: "w-16 h-16 text-gray-400 mx-auto mb-4" }), _jsx("p", { className: "text-gray-600 mb-4", children: "No trucks available for tracking yet." }), _jsx("p", { className: "text-sm text-gray-500", children: "Once your service is scheduled, you'll be able to track your collection truck here." })] })] }));
    }
    const getStatusColor = (status) => {
        switch (status) {
            case 'ACTIVE':
                return 'bg-green-100 text-green-800';
            case 'IDLE':
                return 'bg-gray-100 text-gray-800';
            case 'IN_MAINTENANCE':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };
    return (_jsxs("div", { className: "p-8", children: [_jsx("h1", { className: "text-4xl font-bold mb-8", children: "Truck Tracking" }), _jsxs("div", { className: "grid md:grid-cols-3 gap-8", children: [_jsx("div", { className: "md:col-span-2", children: _jsx("div", { className: "card h-96 flex items-center justify-center bg-gray-100", children: _jsxs("div", { className: "text-center", children: [_jsx(MapPin, { className: "w-16 h-16 text-gray-400 mx-auto mb-4" }), _jsx("p", { className: "text-gray-600", children: "Map view coming soon" }), selectedTruck && selectedTruck.locations && selectedTruck.locations.length > 0 && (_jsxs("div", { className: "mt-4 text-sm text-gray-600", children: [_jsx("p", { children: "Last known location:" }), _jsxs("p", { className: "font-mono", children: [selectedTruck.locations[0].latitude.toFixed(4), ", ", selectedTruck.locations[0].longitude.toFixed(4)] })] }))] }) }) }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-lg font-bold mb-4", children: "Active Trucks" }), trucks.map((truck) => (_jsx("button", { onClick: () => setSelectedTruck(truck), className: `w-full card text-left mb-3 cursor-pointer border-2 transition-colors ${selectedTruck?.id === truck.id
                                            ? 'border-bright-green'
                                            : 'border-transparent'}`, children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Truck, { className: "w-5 h-5 text-bright-green" }), _jsxs("div", { children: [_jsx("p", { className: "font-bold", children: truck.licensePlate }), _jsx("p", { className: "text-sm text-gray-600", children: truck.truckType })] })] }), _jsx("span", { className: `text-xs font-bold px-2 py-1 rounded ${getStatusColor(truck.status)}`, children: truck.status })] }) }, truck.id)))] }), selectedTruck && (_jsxs("div", { className: "card border-t-4 border-bright-green", children: [_jsx("h3", { className: "font-bold mb-4", children: selectedTruck.licensePlate }), _jsxs("div", { className: "space-y-3 text-sm", children: [_jsxs("div", { children: [_jsx("p", { className: "text-gray-600", children: "Truck Type" }), _jsx("p", { className: "font-medium", children: selectedTruck.truckType })] }), _jsxs("div", { children: [_jsx("p", { className: "text-gray-600", children: "Capacity" }), _jsxs("p", { className: "font-medium", children: [selectedTruck.capacity, " gallons"] })] }), _jsxs("div", { children: [_jsx("p", { className: "text-gray-600", children: "Status" }), _jsx("span", { className: `inline-block text-xs font-bold px-2 py-1 rounded ${getStatusColor(selectedTruck.status)}`, children: selectedTruck.status })] }), selectedTruck.locations && selectedTruck.locations.length > 0 && (_jsxs("div", { className: "pt-3 border-t", children: [_jsx("p", { className: "text-gray-600", children: "Last Location Update" }), _jsxs("p", { className: "font-mono text-xs mt-2", children: [selectedTruck.locations[0].latitude.toFixed(4), ", ", selectedTruck.locations[0].longitude.toFixed(4)] }), _jsx("p", { className: "text-xs text-gray-500 mt-1", children: new Date(selectedTruck.locations[0].timestamp).toLocaleString() }), selectedTruck.locations[0].speed && (_jsxs("p", { className: "text-xs text-gray-600 mt-1", children: ["Speed: ", selectedTruck.locations[0].speed, " mph"] }))] }))] })] }))] })] }), _jsx("div", { className: "mt-8 card bg-blue-50 border-l-4 border-blue-400", children: _jsxs("div", { className: "flex gap-3", children: [_jsx(AlertCircle, { className: "w-5 h-5 text-blue-600 flex-shrink-0" }), _jsxs("div", { children: [_jsx("p", { className: "font-bold text-blue-900", children: "Real-time Tracking" }), _jsx("p", { className: "text-sm text-blue-800", children: "Truck locations update in real-time. Your collection truck's location will appear here once service is scheduled." })] })] }) })] }));
}
