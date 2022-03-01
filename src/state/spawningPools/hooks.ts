import { createSelector } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { now } from '../../utils/timerHelpers'
import { SpawningPool, SpawningPoolState, State } from '../types'

export const useGetSpawningPools = (): SpawningPoolState => {
  return useSelector((state: State) => state.spawningPools)
}

export const useGetSpawningPoolById = (id: number): SpawningPool => useGetSpawningPools().data
  .find((spawningPool) => spawningPool.id === id)

export const useGetFilteredSpawningPools = (filter: string[]): SpawningPool[] => {
  return useSelector((state: State) => selectFilteredSpawningPools(state, filter))
}

const selectFilteredSpawningPools = createSelector(
  (state: State) => state.spawningPools,
  (state: State) => state.nfts,
  (state: State, filter: string[]) => filter,
  (spawningPools, nfts, filter) => {
    // search parameters
    if (filter[0] !== '') {
      return spawningPools.data.filter(({ name, rewardToken: { symbol }, nftId }) => {
        const searchString = filter[0].toLowerCase()
        const hasNameMatch = name.toLowerCase().includes(searchString)
        const hasSymbolMatch = symbol.toLowerCase().includes(searchString)
        const hasNftNameMatch = nfts.data
          .find((n) => n.id === nftId)
          .name.toLowerCase()
          .includes(searchString)

        return hasNameMatch || hasSymbolMatch || hasNftNameMatch
      })
    }

    // filter parameters
    switch (filter[1]) {
      case 'All Pools':
        return spawningPools.data.filter((sp) => sp.endDate > now())
      case 'Staked':
        return spawningPools.data.filter((sp) => sp.userInfo.amount.gt(0))
      case 'Ended':
        return spawningPools.data.filter((sp) => sp.endDate <= now())
      default:
        return spawningPools.data.filter((sp) => sp.endDate > now())
    }
  },
)
