"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function GlobalLoading() {
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        // Khi route thay đổi, bật loading
        setIsLoading(true);

        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 400); // 0.4s để tạo cảm giác chuyển mượt

        return () => clearTimeout(timer);
    }, [pathname]);

    return (
        isLoading && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 text-white">
                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-white"></div>
            </div>
        )
    );
}
