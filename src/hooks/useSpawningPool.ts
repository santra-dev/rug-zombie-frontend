// Approve an address
import { Contract } from 'web3-eth-contract'
import { BigNumber } from 'bignumber.js'
import { useCallback } from 'react'
import { useAppDispatch } from '../state'
import { useAccount } from '../state/hooks'
import { spStake, spUnlock, spUnstake, spUnstakeEarly } from '../utils/callHelpers'
import { BIG_ZERO } from '../utils/bigNumber'
import { fetchSpawningPoolsUserDataAsync } from '../state/spawningPools'

export const useStake = (spawningPoolContract: Contract, amount: BigNumber) => {
  const dispatch = useAppDispatch()
  const account = useAccount()

  const handleStake = useCallback(async () => {
    try {
      const tx = await spStake(spawningPoolContract, amount.toString(), account)
      // @ts-ignore
      dispatch(fetchSpawningPoolsUserDataAsync(account))
      return tx
    } catch (e) {
      return false
    }
  }, [spawningPoolContract, amount, account, dispatch])

  return { onStake: handleStake }
}

export const useUnstake = (spawningPoolContract: Contract, amount: BigNumber) => {
  const dispatch = useAppDispatch()
  const account = useAccount()

  const handleUnstake = useCallback(async () => {
    try {
      const tx = await spUnstake(spawningPoolContract, amount.toString(), account)
      // @ts-ignore
      dispatch(fetchSpawningPoolsUserDataAsync(account))
      return tx
    } catch (e) {
      return false
    }
  }, [spawningPoolContract, amount, account, dispatch])

  return { onUnstake: handleUnstake }
}

export const useUnstakeEarly = (spawningPoolContract: Contract, amount: BigNumber) => {
  const dispatch = useAppDispatch()
  const account = useAccount()

  const handleUnstakeEarly = useCallback(async () => {
    try {
      const tx = await spUnstakeEarly(spawningPoolContract, amount, account)
      // @ts-ignore
      dispatch(fetchSpawningPoolsUserDataAsync(account))
      return tx
    } catch (e) {
      return false
    }
  }, [spawningPoolContract, amount, account, dispatch])

  return { onUnstakeEarly: handleUnstakeEarly }
}

export const useHarvest = (spawningPoolContract: Contract) => {
  const dispatch = useAppDispatch()
  const account = useAccount()

  const handleHarvest = useCallback(async () => {
    try {
      const tx = await spUnstake(spawningPoolContract, BIG_ZERO, account)
      // @ts-ignore
      dispatch(fetchSpawningPoolsUserDataAsync(account))
      return tx
    } catch (e) {
      return false
    }
  }, [spawningPoolContract, account, dispatch])

  return { onHarvest: handleHarvest }
}

export const useUnlock = (spawningPoolContract: Contract, amount: BigNumber) => {
  const dispatch = useAppDispatch()
  const account = useAccount()

  const handleUnlock = useCallback(async () => {
    try {
      const tx = await spUnlock(spawningPoolContract, amount, account)
      // @ts-ignore
      dispatch(fetchSpawningPoolsUserDataAsync(account))
      return tx
    } catch (e) {
      return false
    }
  }, [spawningPoolContract, amount, account, dispatch])

  return { onUnlock: handleUnlock }
}
