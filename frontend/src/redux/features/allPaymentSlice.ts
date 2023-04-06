import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AllPaymentState {
  paymentHistories: any;
}

const initialState: AllPaymentState = {
  paymentHistories: [],
};
export const allPayHistorySlice = createSlice({
  initialState,
  name: 'allPayHistory',
  reducers: {
    getAllPayHistories: (state, action: PayloadAction<any>) => {
      state.paymentHistories = action.payload;
    },
  },
});

export default allPayHistorySlice.reducer;

export const { getAllPayHistories } = allPayHistorySlice.actions;