import type { RootState } from '../store'

export const allPaymentHistory = (state: RootState) => state.payHistoryState.paymentHistory;