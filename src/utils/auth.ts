export function setTokens(accessToken: string, refreshToken: string) {
    const expires = new Date(Date.now() + 60 * 60 * 1000).toUTCString(); // 1h
    document.cookie = `accessToken=${accessToken}; path=/; expires=${expires}`;
    document.cookie = `refreshToken=${refreshToken}; path=/; expires=${expires}`;
}

export function getAccessToken(): string | null {
    const match = document.cookie.match(/(?:^| )accessToken=([^;]*)/);
    return match ? decodeURIComponent(match[1]) : null;
}

export function getRefreshToken(): string | null {
    const match = document.cookie.match(/(?:^| )refreshToken=([^;]*)/);
    return match ? decodeURIComponent(match[1]) : null;
}

export function clearTokens() {
    document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
}