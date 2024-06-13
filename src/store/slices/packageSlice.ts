import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export const packageSlice = createSlice({
  name: 'package',
  initialState: false,
  reducers: {
    setPackage: (state, { payload }: PayloadAction<boolean>) => {
      return payload;
    }
  }
});

export const { setPackage } = packageSlice.actions;

export default packageSlice;
