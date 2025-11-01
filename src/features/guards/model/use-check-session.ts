import { useSession as useNextSession } from 'next-auth/react';
import { useCallback, useMemo } from 'react';

export function useSession() {
    const { data, status, update } = useNextSession();
    const isValidBackendToken = useCallback(() => data?.isValidBackendToken === true, [data]);
    const isUnauthenticated = useCallback(
        () => status === 'unauthenticated' || !isValidBackendToken(),
        [status, data]
    );
    const isAuthenticated = useCallback(
        () => status === 'authenticated' && isValidBackendToken(),
        [status, data]
    );

    return useMemo(() => ({
        data,
        status,
        isLoading: () => status === 'loading',
        isUnauthenticated,
        isAuthenticated,
        update
    }), [status]);
}
