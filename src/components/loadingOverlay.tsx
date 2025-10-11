'use client';
import { useGlobalStore } from '@/store/globalStore';

export default function LoadingOverlay() {
    const isLoading = useGlobalStore((s) => s.isLoading);

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="w-10 h-10 border-4 border-t-transparent border-white rounded-full animate-spin" />
        </div>
    );
}
