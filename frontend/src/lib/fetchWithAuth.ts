import { logout } from './auth';

export async function fetchWithAuth(
  url: string,
  options: any = {}
) {

  const token =
    localStorage.getItem('token');

  const response = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization:
        `Bearer ${token}`,
    },
  });

  if (response.status === 401) {

    logout();

    return null;
  }

  return response;
}