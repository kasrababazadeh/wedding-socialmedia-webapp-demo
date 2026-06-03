import { useEffect } from 'react';

export default function useRTL() {
useEffect(() => {
document.documentElement.setAttribute('dir', 'rtl');
document.documentElement.setAttribute('lang', 'fa');
}, []);
}