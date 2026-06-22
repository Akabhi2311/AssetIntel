export function getToken() {

  if (typeof window === 'undefined') {
    return null;
  }

  return localStorage.getItem('token');
}


export function logout() {

  localStorage.removeItem('token');

  localStorage.removeItem('signup_email');

  localStorage.removeItem('reset_email');

  window.location.href = '/login';
}


export function isAuthenticated() {

  return !!getToken();
}