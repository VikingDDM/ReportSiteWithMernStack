import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SubmitDateState {
  submitDate: string;
}

const initialState: SubmitDateState = {
  submitDate: '',
};
export const submitDateSlice = createSlice({
  initialState,
  name: 'submitDate',
  reducers: {
    getSubmitDate: (state, action: PayloadAction<any>) => {
      state.submitDate = action.payload;
    },
  },
});

export default submitDateSlice.reducer;

export const { getSubmitDate } = submitDateSlice.actions;