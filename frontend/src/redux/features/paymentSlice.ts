import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaymentState {
  paymentHistory: any;
}

const initialState: PaymentState = {
  paymentHistory: [],
};
export const payHistorySlice = createSlice({
  initialState,
  name: 'payHistory',
  reducers: {
    getAllPayHistory: (state, action: PayloadAction<any>) => {
      state.paymentHistory = action.payload;
    },
  },
});

export default payHistorySlice.reducer;

export const { getAllPayHistory } = payHistorySlice.actions;