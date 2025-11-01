import jwt from 'jsonwebtoken';

export type Tokens = {
  accessToken: string | null;
  refreshToken: string | null;
};

export type TokenCheckResult = {
  tokens: Tokens;
  valid: boolean;
  error?: string;
};

export type TokenRemainingInfo = {
  expiresAt: Date | null;
  remainingMs: number | null;
  remainingSec: number | null;
  formatted?: string;
};

function getRefreshTokenFromCookie(setCookieHeader: string | null) {    
    if (!setCookieHeader) return;
        
    const refreshCookie = setCookieHeader.split(';')[0];
    const [, value] = refreshCookie.split('=');
    
    return value;
}

/**
 * Возвращает сколько осталось времени до истечения JWT токена
 */
export function getTokenRemainingTime(token: string): TokenRemainingInfo {
  try {
    const decoded = jwt.decode(token) as { exp?: number } | null;
    if (!decoded?.exp) {
      return { expiresAt: null, remainingMs: null, remainingSec: null };
    }

    const expiresAt = new Date(decoded.exp * 1000);
    const now = Date.now();
    const remainingMs = expiresAt.getTime() - now;
    const remainingSec = Math.floor(remainingMs / 1000);

    // Форматируем для логов/отладки
    const minutes = Math.floor(remainingSec / 60);
    const seconds = remainingSec % 60;

    const formatted = `${minutes}m ${seconds}s`;

    return { expiresAt, remainingMs, remainingSec, formatted };
  } catch (err) {
    console.error("Ошибка при декодировании токена:", err);
    return { expiresAt: null, remainingMs: null, remainingSec: null };
  }
}

/**
 * Получаем expiry из JWT access token
 */
function getAccessTokenExpiry(accessToken: string): number | null {
  try {
    const decoded = jwt.decode(accessToken) as { exp?: number } | null;
    // console.log({accessToken, decoded});
    return decoded?.exp ? decoded.exp * 1000 : null;
  } catch (err) {
    console.error("Invalid access token", err);
    return null;
  }
}

/**
 * Проверяем токены и при необходимости обновляем accessToken через backend
 */
export async function checkAndRefreshTokens(currentTokens: Tokens): Promise<TokenCheckResult> {
  const { accessToken, refreshToken } = currentTokens;

  const accessTokenExpiry = accessToken ? getAccessTokenExpiry(accessToken) : null;

  const accessTokenInfo = getTokenRemainingTime(accessToken || '');
  const refreshTokenInfo = getTokenRemainingTime(refreshToken || '');

  if (accessTokenInfo.remainingMs !== null) {
    console.log(`Access Token истечет через: ${accessTokenInfo.formatted}`);
  } else {
    console.log("Невозможно определить срок жизни токена");
  }

  if (refreshTokenInfo.remainingMs !== null) {
    console.log(`Refresh Token истечет через: ${refreshTokenInfo.formatted}`);
  } else {
    console.log("Невозможно определить срок жизни токена");
  }

  // 1️⃣ Токен ещё валиден
  if (accessToken && accessTokenExpiry && Date.now() < accessTokenExpiry) {
    return { tokens: currentTokens, valid: true };
  }

  console.log('go to refresh')

  // 2️⃣ Access token просрочен, пробуем refresh через backend
  if (!refreshToken) {
    return { tokens: currentTokens, valid: false, error: "No refresh token available" };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_URL}/api/v1/refresh-token`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Cookie: `refresh_token=${refreshToken}`,
      },
    });

    if (!res.ok) throw new Error('Refresh failed');

    const data = await res.json();
    const newRefreshToken = getRefreshTokenFromCookie(res.headers.get('set-cookie'));

    if (!newRefreshToken) throw new Error('Refresh failed');

    const newTokens: Tokens = {
      accessToken: data.data.access_token,
      refreshToken: newRefreshToken,
    };

    return { tokens: newTokens, valid: true };
  } catch (err) {
    console.log("Refresh token failed", err);

    // 3️⃣ Если refresh не удался — возвращаем старые токены
    return { tokens: currentTokens, valid: false, error: "Tokens expired or invalid" };
  }
}
