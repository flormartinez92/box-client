import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserInfo {
  id_user?: string;
  name?: string;
  mail?: string;
  isAdmin?: boolean;
  isDisabled?: boolean;
}

export interface UserState {
  userInfo: UserInfo | null;
  userAuth: boolean | null;
}
const loadUserAuthFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const storedUserAuth = localStorage.getItem('userAuth');
    return storedUserAuth ? JSON.parse(storedUserAuth) : true;
  }
  return false;
};

const loadUserInfoFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const storedUserAuth = localStorage.getItem('userInfo');
    return storedUserAuth ? JSON.parse(storedUserAuth) : true;
  }
  return false;
};

const initialState: UserState = {
  userInfo: loadUserInfoFromLocalStorage() || null,
  userAuth: loadUserAuthFromLocalStorage() || null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserAuth: (state, { payload }: PayloadAction<boolean>) => {
      state.userAuth = true;

      localStorage.setItem('userAuth', JSON.stringify(payload));
    },
    setUserInfo: (state, { payload }: PayloadAction<UserInfo>) => {
      state.userInfo = payload;

      localStorage.setItem('userInfo', JSON.stringify(payload));

      state.userAuth = true;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setUserAuth, setUserInfo } = userSlice.actions;

export default userSlice;
