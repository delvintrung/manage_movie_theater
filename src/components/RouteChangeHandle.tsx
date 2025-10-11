'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useGlobalStore } from '@/store/globalStore';
export default function RouteChangeHandler() {
    const pathname = usePathname();
    const setLoading = useGlobalStore((s) => s.changeLoadingStatus);

    useEffect(() => {
        setLoading(true);

        const timer = setTimeout(() => setLoading(false), 400);

        return () => clearTimeout(timer);
    }, [pathname, setLoading]);

    return null;
}
