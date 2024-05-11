import { useState } from 'react';
import { useLoadingCallback } from 'react-loading-hook';
import { getFirebaseAuth, getGoogleProvider, loginWithProvider, signInWithEmailAndPassword, signInWithEmailLink, sendSignInLinkToEmail, isSignInWithEmailLink } from '../auth/firebase';
import { getTokens } from 'next-firebase-auth-edge';
import { cookies } from 'next/headers';
import { authConfig } from '@/config/server-config';

export function useAuthHandlers(setAuth, setHasLogged) {
    const [isEmailLoading, emailPasswordError, handleLoginWithEmailAndPassword] = useLoadingCallback(async ({ email, password }) => {
        setHasLogged(false);
        const auth = getFirebaseAuth();
        await signInWithEmailAndPassword(auth, email, password);
        const tokens = await getTokens(cookies(), authConfig);
        setAuth({ ...auth, tokens });
        setHasLogged(true);
    });

    const [isGoogleLoading, googleError, handleLoginWithGoogle] = useLoadingCallback(async () => {
        setHasLogged(false);
        const auth = getFirebaseAuth();
        await loginWithProvider(auth, getGoogleProvider(auth));
        setHasLogged(true);
    });

    const [isEmailLinkLoading, emailLinkError, handleLoginWithEmailLink] = useLoadingCallback(async () => {
        const auth = getFirebaseAuth();
        const email = window.prompt('Please provide your email');
        if (!email) return;
        window.localStorage.setItem('emailForSignIn', email);
        await sendSignInLinkToEmail(auth, email, {
            url: process.env.NEXT_PUBLIC_SERVER_URL + '/login',
            handleCodeInApp: true
        });
    });

    return {
        isEmailLoading,
        emailPasswordError,
        handleLoginWithEmailAndPassword,
        googleError,
        isGoogleLoading,
        handleLoginWithGoogle,
        isEmailLinkLoading,
        emailLinkError,
        handleLoginWithEmailLink
    };
}