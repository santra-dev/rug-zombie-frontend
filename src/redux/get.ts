import { BigNumber } from 'bignumber.js'
import axios from 'axios'
import store from './store'
import {
  Auction,
  SharkPool,
  BurnGrave,
  RugMarketListing,
} from './types'
import { getId } from '../utils'
import * as actions from './actions'

export const account = (): string => {
  return store.getState().account
}

export const zombieBalance = (): BigNumber => {
  return store.getState().zombie.balance
}

export const bnbBalance = (): BigNumber => {
  return store.getState().bnbBalance
}

export const zombieTotalSupply = (): BigNumber => {
  return store.getState().zombie.totalSupply
}

export const zombiePriceBnb = (): BigNumber => {
  return store.getState().zombie.priceBnb
}

export const drFrankensteinZombieBalance = (): BigNumber => {
  return store.getState().drFrankenstein.zombieBalance
}

export const totalAllocPoint = (): BigNumber => {
  return store.getState().drFrankenstein.totalAllocPoint
}

export const coingeckoPrice = (id: string) => {
  return axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`)
}

export const sharkPools = (): SharkPool[] => {
  return store.getState().sharkPools
}

export const sharkPoolById = (id: number): SharkPool => {
  return store.getState().sharkPools.find((a) => a.id === id)
}

export const auctions = (): Auction[] => {
  return store.getState().auctions
}

export const auctionById = (id: number): Auction => {
  return auctions().find((a) => a.id === id)
}

export const burnGraves = (): BurnGrave[] => {
  return store.getState().burnGraves
}

export const burnGraveById = (id: number): BurnGrave => {
  return store.getState().burnGraves.find((a) => getId(a.id) === id)
}

export const rugMarketListings = (filter, wallet): RugMarketListing[] => {
  switch (filter) {
    case 0:
      return store.getState().rugMarketListings.filter((listing) => listing.state === '0' && listing.owner !== wallet)
    case 1:
      return store.getState().rugMarketListings.filter((listing) => listing.owner === wallet)
    case 2:
      return store.getState().rugMarketListings.filter((listing) => listing.state === '1')
    default:
      return store.getState().rugMarketListings
  }
}

export const rugMarketListingById = (id: number): RugMarketListing => {
  return store.getState().rugMarketListings.find((listing) => listing.id === id)
}

export const markRugMarketListingSold = (id: number) => {
  store.dispatch(actions.markRugMarketListingSold(id))
}

export const cancelRugMarketListing = (id: number) => {
  store.dispatch(actions.cancelRugMarketListing(id))
}
