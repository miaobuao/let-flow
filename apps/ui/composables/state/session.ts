import type { LoginRequest, LoginResponse } from '@let-flow/api';
import type { Dayjs } from 'dayjs';

import dayjs from 'dayjs';

const SESSION_KEY = 'user-session';
type Session = Omit<LoginResponse, 'expires'> & { expires: Dayjs };

export const useSessionStore = defineStore('session', () => {
  const session = ref<Session>();
  watch(session, (value) => {
    if (value) {
      apiConfig.baseOptions.headers.Authorization = `Bearer ${value.token}`;
    } else {
      apiConfig.baseOptions = void 0;
    }
  });

  function save() {
    if (session.value)
      localStorage.setItem(SESSION_KEY, JSON.stringify(session.value));
  }

  async function load() {
    const value = localStorage.getItem(SESSION_KEY);
    if (!value) return;
    const data: LoginResponse = JSON.parse(value);
    try {
      session.value = parseLoginResponse(data);
    } catch (e) {
      localStorage.removeItem(SESSION_KEY);
      throw e;
    }
    return session.value;
  }

  async function login(body: LoginRequest) {
    const { data } = await sessionApi.create(body);
    localStorage.removeItem(SESSION_KEY);
    session.value = parseLoginResponse(data);
    return session.value;
  }

  function logout() {
    session.value = void 0;
    window.localStorage.removeItem(SESSION_KEY);
    return sessionApi.destroy();
  }

  function parseLoginResponse(response: LoginResponse): Session {
    const expires = dayjs(response.expires);
    if (isExpired(expires)) {
      throw new Error('session.error.expired');
    }
    // TODO: check fields
    return {
      ...response,
      expires,
    };
  }

  return {
    session,
    login,
    logout,
    save,
    load,
  };
});
