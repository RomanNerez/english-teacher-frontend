export function getCookieValue(setCookie: string[] | undefined, name: string): string | null {
    if (!setCookie || !Array.isArray(setCookie)) return null;

    for (const cookieStr of setCookie) {
        const parts = cookieStr.split(';').map((part) => part.trim());
        const [cookieName, cookieValue] = parts[0].split('=');

        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }

    return null;
}