import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
export default function AnimatedCounter({ end, duration = 2, suffix = '', prefix = '', decimals = 0, color = 'text-bright-green' }) {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !isVisible) {
                setIsVisible(true);
            }
        }, { threshold: 0.1 });
        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [isVisible]);
    useEffect(() => {
        if (!isVisible)
            return;
        const startTime = Date.now();
        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / (duration * 1000), 1);
            const newCount = Math.floor(end * progress * Math.pow(10, decimals)) / Math.pow(10, decimals);
            setCount(newCount);
            if (progress === 1) {
                clearInterval(interval);
            }
        }, 16); // ~60fps
        return () => clearInterval(interval);
    }, [isVisible, end, duration, decimals]);
    return (_jsx("div", { ref: ref, children: _jsxs("p", { className: `text-4xl font-bold ${color}`, children: [prefix, count.toFixed(decimals), suffix] }) }));
}
