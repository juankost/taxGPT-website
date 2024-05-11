import { useLoadingCallback } from 'react-loading-hook';
import { loginWithProvider, getGoogleProvider } from '../login/firebase';
import { getFirebaseAuth } from '../auth/firebase';

export function useGoogleAuth(setHasLogged) {
    return useLoadingCallback(async () => {
        setHasLogged(false);
        const auth = getFirebaseAuth();
        await loginWithProvider(auth, getGoogleProvider(auth));
        setHasLogged(true);
    });
}