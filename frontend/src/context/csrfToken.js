export const getCsrfToken = () => {
    const csrfCookie = document.cookie.match(/(^|;) ?csrftoken=([^;]*)(;|$)/);
    return csrfCookie ? csrfCookie[2] : null;
  };
  