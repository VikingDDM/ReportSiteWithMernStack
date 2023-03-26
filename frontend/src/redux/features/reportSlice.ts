import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IReportResponse } from '../api/types';

interface IReportState {
    report: IReportResponse | null;
}

const initialState: IReportState = {
    report: null,
};

export const reportSlice = createSlice({
    initialState,
    name: 'report',
    reducers: {
        getUserDailyReport: (state, action: PayloadAction<IReportResponse>) =>{
            state.report = action.payload;
        },
    },
});

export default reportSlice.reducer;
export const { getUserDailyReport } = reportSlice.actions;