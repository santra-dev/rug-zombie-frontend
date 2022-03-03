import BigNumber from 'bignumber.js'
import { useSelector } from 'react-redux'
import { AccountState, State } from '../types'

export const useAccount = (): AccountState => useSelector((state: State) => state.account)
export const useZombieBalance = (): BigNumber => useAccount().balances.zombieBalance
export const useZombieAllowance = (): BigNumber => useAccount().balances.zombieAllowance
