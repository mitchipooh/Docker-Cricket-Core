import { useState, useEffect } from 'react';
import { apiFetch } from '../lib/api';
import type { UserProfile } from '../types';

export const useAuth = () => {
    const [user, setUser] = useState<any>(null);
    const [liteUser, setLiteUser] = useState<UserProfile | null>(() => {
        try {
            const saved = localStorage.getItem('cc_lite_user');
            return saved ? JSON.parse(saved) : null;
        } catch { return null; }
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem('cc_user_profile');
        const token = localStorage.getItem('cc_auth_token');
        if (savedUser && token) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const signInWithHandle = async (handle: string, password: string) => {
        setLoading(true);
        try {
            const data = await apiFetch('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ handle, password })
            });

            if (data.token) {
                localStorage.setItem('cc_auth_token', data.token);
                localStorage.setItem('cc_user_profile', JSON.stringify(data.user));
                setUser(data.user);
                return { data: data.user };
            }
            return { error: { message: 'Login failed' } };
        } catch (e: any) {
            return { error: e };
        } finally {
            setLoading(false);
        }
    };

    const signUpWithEmail = async (email: string, password: string, name: string) => {
        setLoading(true);
        try {
            const handle = `@${email.split('@')[0]}`;
            const data = await apiFetch('/auth/register', {
                method: 'POST',
                body: JSON.stringify({ email, password, name, handle })
            });

            if (data.token) {
                localStorage.setItem('cc_auth_token', data.token);
                localStorage.setItem('cc_user_profile', JSON.stringify(data.user));
                setUser(data.user);
                return { data: data.user };
            }
            return { error: { message: 'Registration failed' } };
        } catch (e: any) {
            return { error: e };
        } finally {
            setLoading(false);
        }
    };

    const signOut = async () => {
        setLiteUser(null);
        setUser(null);
        localStorage.removeItem('cc_lite_user');
        localStorage.removeItem('cc_auth_token');
        localStorage.removeItem('cc_user_profile');
        return { error: null };
    };

    const getUserProfile = async (): Promise<UserProfile | null> => {
        if (liteUser) return liteUser;
        return user;
    };

    return {
        user,
        liteUser,
        loading,
        signInWithHandle,
        signUpWithEmail,
        signOut,
        getUserProfile,
        // Mocking OAuth for now as it's not implemented on the local backend
        signInWithGoogle: async () => ({ error: { message: 'Google Login not available in local mode' } }),
        signInWithFacebook: async () => ({ error: { message: 'Facebook Login not available in local mode' } }),
        signInWithEmail: async (email: string, password: string) => signInWithHandle(email, password)
    };
};
