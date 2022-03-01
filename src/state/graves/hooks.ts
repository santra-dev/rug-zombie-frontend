import { createSelector } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { getId } from '../../utils'
import { Grave, GraveState, State } from '../types'

export const useGetGraves = (): GraveState => {
  return useSelector((state: State) => state.graves)
}

export const useGetFilteredGraves = (filter: string[]): Grave[] => {
  return useSelector((state: State) => selectFilteredGraves(state, filter))
}

const selectFilteredGraves = createSelector(
  (state: State) => state.graves,
  (state: State) => state.nfts,
  (state: State, filter: string[]) => filter,
  (graves, nfts, filter) => {
    // search parameters
    if (filter[0] !== '') {
      return graves.data.filter(({ name, rug: { symbol }, nftId }) => {
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
      case 'All graves':
      case 'All types':
        return graves.data.filter((g) => !g.isRetired && g.poolInfo.allocPoint.gt(0))
      case 'Staked':
        return graves.data.filter((g) => g.userInfo.amount.gt(0))
      case 'NFT-only':
        return graves.data.filter((g) => !g.isRetired && g.poolInfo.allocPoint.isZero())
      case 'Retired':
        return graves.data.filter((g) => g.isRetired)
      case 'Legendary':
        return graves.data.filter((g) => nfts.data.find((n) => n.id === g.nftId).rarity === 'Legendary')
      case 'Rare':
        return graves.data.filter((g) => nfts.data.find((n) => n.id === g.nftId).rarity === 'Rare')
      case 'Uncommon':
        return graves.data.filter((g) => nfts.data.find((n) => n.id === g.nftId).rarity === 'Uncommon')
      case 'Common':
        return graves.data.filter((g) => nfts.data.find((n) => n.id === g.nftId).rarity === 'Common')
      default:
        return graves.data
    }
  },
)

export const useGetGraveByPid = (pid: number): Grave => {
  return useGetGraves().data.find((g) => getId(g.pid) === pid)
}
