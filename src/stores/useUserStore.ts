import { create } from 'zustand';
import type { User, UserProfile, UserSettings, OnboardingData } from '@/types';

// Дефолтный юзер (мок)
const DEFAULT_USER: User = {
    id: 'user-1',
    profile: {
        name: 'Даниил',
        age: 22,
        weight: 78.5,
        height: 180,
        gender: 'male',
        goal: 'gain_muscle',
        experience: 'intermediate',
    },
    settings: {
        darkTheme: true,
        notifications: true,
        language: 'ru',
        units: 'metric',
    },
    isOnboarded: true,
    level: 12,
    xp: 2450,
    streakDays: 5,
    joinedAt: '2026-01-15',
};

type UserState = {
    user: User;

    // Действия
    setUser: (user: User) => void;
    updateProfile: (data: Partial<UserProfile>) => void;
    updateSettings: (data: Partial<UserSettings>) => void;
    completeOnboarding: (data: OnboardingData) => void;
    addXP: (amount: number) => void;
    logout: () => void;
};

export const useUserStore = create<UserState>((set) => ({
    user: DEFAULT_USER,

    setUser: (user) => set({ user }),

    updateProfile: (data) =>
        set((state) => ({
            user: {
                ...state.user,
                profile: { ...state.user.profile, ...data },
            },
        })),

    updateSettings: (data) =>
        set((state) => ({
            user: {
                ...state.user,
                settings: { ...state.user.settings, ...data },
            },
        })),

    completeOnboarding: (data) =>
        set((state) => ({
            user: {
                ...state.user,
                isOnboarded: true,
                profile: {
                    ...state.user.profile,
                    name: data.name,
                    age: data.age,
                    weight: data.weight,
                    height: data.height,
                    gender: data.gender,
                    goal: data.goal,
                    experience: data.experience || 'beginner',
                },
            },
        })),

    addXP: (amount) =>
        set((state) => {
            const newXP = state.user.xp + amount;
            const xpPerLevel = 500;
            const newLevel = Math.floor(newXP / xpPerLevel) + 1;
            return {
                user: { ...state.user, xp: newXP, level: newLevel },
            };
        }),

    logout: () => set({ user: { ...DEFAULT_USER, isOnboarded: false } }),
}));
