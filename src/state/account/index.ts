/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BIG_ZERO } from '../../utils/bigNumber'
import { AccountBalances, AccountState } from '../types'
import fetchAccount from './fetchAccount'

const NO_USER_BALANCES: AccountBalances = {
  zombieBalance: BIG_ZERO,
  zombieAllowance: BIG_ZERO,
}

const initialState: AccountState = {
  balances: NO_USER_BALANCES,
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccount: (state, action: PayloadAction<AccountState>) => {
      const { payload: { balances } } = action
      state.balances = balances
    }
  }
})

export const { setAccount } = accountSlice.actions

// Thunks
export const fetchAccountAsync = (account: string) => async (dispatch) => {
  const accountState = await fetchAccount(account)
  dispatch(setAccount(accountState))
}

export default accountSlice.reducer
