import { useLoadingCallback } from 'react-loading-hook';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getFirebaseAuth, getTokens } from '../auth/firebase';
import { cookies } from 'next/headers';
import { authConfig } from '@/config/server-config';

export function useEmailPasswordAuth(setAuth) {
    return useLoadingCallback(async ({ email, password }) => {
        const auth = getFirebaseAuth();
        await signInWithEmailAndPassword(auth, email, password);
        const tokens = await getTokens(cookies(), authConfig);
        setAuth({ ...auth, tokens });
    });
}