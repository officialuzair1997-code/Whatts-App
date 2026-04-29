export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SOCKET: '/socket',
  FORGET_PASSWORD: '/forget-password',
  OTP: '/verify-otp',
  UPDATE_PASSWORD: '/update-password',
  PROFILE: '/profile',
  CALL: '/call/:id',
};


export const API_ENDPOINTS = {
  LOGIN: '/api/v1/auth/login',
  LOGOUT: '/api/v1/auth/logout',
  FORGET_PASSWORD: '/api/v1/auth/forget-password',
  VERIFY_OTP: '/api/v1/auth/verify-otp',
  UPDATE_PASSWORD: '/api/v1/auth/update-password',
  GET_PROFILE: '/api/v1/user/profile',
  UPDATE_PROFILE: '/api/v1/user/update-profile',
};
