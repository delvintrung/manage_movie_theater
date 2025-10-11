"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GlobalStore {
    isLoggedIn: boolean;
    isLoading: boolean;
    changeLoginStatus: (status: boolean) => void;
    changeLoadingStatus: (status: boolean) => void;
}

export const useGlobalStore = create<GlobalStore>()(
    persist(
        (set) => ({
            isLoggedIn: false,
            isLoading: false,
            changeLoginStatus: (status) =>
                set((state) => ({ ...state, isLoggedIn: status })),
            changeLoadingStatus: (status) =>
                set((state) => ({ ...state, isLoading: status })),
        }),
        {
            name: "global-storage",
            partialize: (state) => ({ isLoggedIn: state.isLoggedIn }),
        }
    )
);
