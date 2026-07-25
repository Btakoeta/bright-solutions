import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
export default function SustainabilityCarousel() {
    const images = [
        {
            url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop',
            alt: 'Street Transformation - Before and After Cleanup in Yaoundé',
            title: 'Street Transformation Success'
        },
        {
            url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
            alt: 'Clean Streets in Yaoundé - Environmental Sustainability',
            title: 'Clean Streets in Yaoundé'
        },
        {
            url: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&h=600&fit=crop',
            alt: 'Women Organizing Waste Collection Program - African Community',
            title: 'Women Leading Waste Programs'
        },
        {
            url: 'https://images.unsplash.com/photo-1517457373614-b7152f800bb1?w=800&h=600&fit=crop',
            alt: 'Children Learning About Recycling and Environmental Awareness',
            title: 'Children Learning Recycling'
        },
        {
            url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop',
            alt: 'Modern Waste Management Facility in Africa',
            title: 'Modern Waste Facility'
        },
        {
            url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop',
            alt: 'Community Environmental Cleanup - Clean Streets',
            title: 'Community Cleanup Effort'
        },
        {
            url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop',
            alt: 'Sustainable Waste Management Practices',
            title: 'Sustainable Practices'
        },
        {
            url: 'https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?w=800&h=600&fit=crop',
            alt: 'African Recycling and Waste Management Initiative',
            title: 'Recycling Programs'
        },
        {
            url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
            alt: 'Thriving African Community - Clean Environment',
            title: 'Thriving Communities'
        },
    ];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlay, setIsAutoPlay] = useState(true);
    useEffect(() => {
        if (!isAutoPlay)
            return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3500); // Change image every 3.5 seconds
        return () => clearInterval(interval);
    }, [isAutoPlay, images.length]);
    const goToPrevious = () => {
        setIsAutoPlay(false);
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };
    const goToNext = () => {
        setIsAutoPlay(false);
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };
    const goToSlide = (index) => {
        setIsAutoPlay(false);
        setCurrentIndex(index);
    };
    return (_jsxs("div", { className: "relative h-96 lg:h-full group", children: [_jsxs("div", { className: "absolute inset-0 bg-gradient-to-br from-bright-green/20 to-blue-500/20 rounded-3xl border border-bright-green/30 backdrop-blur-sm overflow-hidden", children: [_jsx("img", { src: images[currentIndex].url, alt: images[currentIndex].alt, className: "w-full h-full object-cover transition-all duration-500" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" }), _jsxs("div", { className: "absolute bottom-8 left-8 right-8 z-20", children: [_jsx("h3", { className: "text-2xl font-bold text-white drop-shadow-lg", children: images[currentIndex].title }), _jsxs("p", { className: "text-gray-200 text-sm mt-2 drop-shadow", children: [currentIndex + 1, " of ", images.length] })] })] }), _jsx("button", { onClick: goToPrevious, onMouseEnter: () => setIsAutoPlay(false), onMouseLeave: () => setIsAutoPlay(true), className: "absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-bright-green/80 hover:bg-bright-green text-white p-2 rounded-full transition opacity-0 group-hover:opacity-100 transform hover:scale-110", children: _jsx(ChevronLeft, { className: "w-6 h-6" }) }), _jsx("button", { onClick: goToNext, onMouseEnter: () => setIsAutoPlay(false), onMouseLeave: () => setIsAutoPlay(true), className: "absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-bright-green/80 hover:bg-bright-green text-white p-2 rounded-full transition opacity-0 group-hover:opacity-100 transform hover:scale-110", children: _jsx(ChevronRight, { className: "w-6 h-6" }) }), _jsx("div", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2", children: images.map((_, index) => (_jsx("button", { onClick: () => goToSlide(index), className: `w-2 h-2 rounded-full transition ${index === currentIndex
                        ? 'bg-bright-green w-8'
                        : 'bg-white/50 hover:bg-white/80'}` }, index))) }), _jsx("div", { className: "absolute -bottom-6 -right-6 bg-gray-900 border border-bright-green/30 rounded-2xl p-6 backdrop-blur-sm max-w-sm animate-slide-up z-40", children: _jsxs("div", { className: "flex items-center gap-3 mb-4", children: [_jsx("div", { className: "w-12 h-12 bg-bright-green/20 rounded-lg flex items-center justify-center", children: _jsx("span", { className: "text-bright-green font-bold", children: "\uD83C\uDF0D" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-bold", children: "Real-Time Tracking" }), _jsx("p", { className: "text-sm text-gray-400", children: "Know exactly when your truck arrives" })] })] }) })] }));
}
