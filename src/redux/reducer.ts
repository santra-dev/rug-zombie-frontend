import { BIG_ZERO } from '../utils/bigNumber'
import * as types from './actionTypes'
import sharkPools from './sharkPools'
import auctions from './auctions'
import burnGraves from './burnGraves'
import { getId } from '../utils'
import rugMarketListings from './rugMarketListings'
import { RugMarketListing } from './types'

const defaultState = {
  account: '',
  burnGraves,
  sharkPools,
  bnbPriceUsd: 0,
  auctions,
  rugMarketListings,
  bnbBalance: BIG_ZERO,
  zombie: {
    allowance: BIG_ZERO,
    totalSupply: BIG_ZERO,
    balance: BIG_ZERO,
    priceBnb: BIG_ZERO,
  },
  drFrankenstein: {
    zombieBalance: BIG_ZERO,
    totalAllocPoint: BIG_ZERO,
  },
}

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case types.UPDATE_ACCOUNT:
      return {
        ...state,
        account: action.payload.account,
      }
    case types.UPDATE_ZOMBIE_ALLOWANCE:
      return {
        ...state,
        zombie: { ...state.zombie, allowance: action.payload.allowance },
      }
    case types.UPDATE_ZOMBIE_TOTAL_SUPPLY:
      return {
        ...state,
        zombie: { ...state.zombie, totalSupply: action.payload.totalSupply },
      }
    case types.UPDATE_ZOMBIE_BALANCE:
      return {
        ...state,
        zombie: { ...state.zombie, balance: action.payload.balance },
      }
    case types.UPDATE_DR_FRANKENSTEIN_ZOMBIE_BALANCE:
      return {
        ...state,
        drFrankenstein: { ...state.drFrankenstein, zombieBalance: action.payload.zombieBalance },
      }
    case types.UPDATE_DR_FRANKENSTEIN_TOTAL_ALLOC_POINT:
      return {
        ...state,
        drFrankenstein: { ...state.drFrankenstein, totalAllocPoint: action.payload.totalAllocPoint },
      }
    case types.UPDATE_AUCTION_INFO:
      return {
        ...state,
        auctions: state.auctions.map((auction) =>
          auction.id === action.payload.id
            ? { ...auction, auctionInfo: { ...auction.auctionInfo, ...action.payload.auctionInfo } }
            : auction,
        ),
      }
    case types.UPDATE_AUCTION_USER_INFO:
      return {
        ...state,
        auctions: state.auctions.map((auction) =>
          auction.id === action.payload.id
            ? { ...auction, userInfo: { ...auction.userInfo, ...action.payload.userInfo } }
            : auction,
        ),
      }
    case types.UPDATE_BNB_BALANCE:
      return {
        ...state,
        bnbBalance: action.payload.bnbBalance,
      }
    case types.UPDATE_SHARKPOOL_INFO:
      return {
        ...state,
        sharkPools: state.sharkPools.map((sharkPool) =>
          sharkPool.id === action.payload.id
            ? { ...sharkPool, poolInfo: { ...sharkPool.poolInfo, ...action.payload.poolInfo } }
            : sharkPool,
        ),
      }
    case types.UPDATE_SHARKPOOL_USER_INFO:
      return {
        ...state,
        sharkPools: state.sharkPools.map((sharkPool) =>
          sharkPool.id === action.payload.id
            ? { ...sharkPool, userInfo: { ...sharkPool.userInfo, ...action.payload.userInfo } }
            : sharkPool,
        ),
      }

    case types.UPDATE_BURNGRAVE_POOL_INFO:
      return {
        ...state,
        burnGraves: state.burnGraves.map((burnGrave) =>
          getId(burnGrave.id) === action.payload.id
            ? { ...burnGrave, poolInfo: { ...burnGrave.poolInfo, ...action.payload.poolInfo } }
            : burnGrave,
        ),
      }

    case types.UPDATE_BURNGRAVE_USER_INFO:
      return {
        ...state,
        burnGraves: state.burnGraves.map((burnGrave) =>
          getId(burnGrave.id) === action.payload.id
            ? { ...burnGrave, userInfo: { ...burnGrave.userInfo, ...action.payload.userInfo } }
            : burnGrave,
        ),
      }
    case types.ADD_RUG_MARKET_LISTING:
      return {
        ...state,
        rugMarketListings: pushListingIfNotExists(action.payload.listing),
      }
    case types.UPDATE_RUG_MARKET_LISTING:
      return {
        ...state,
        rugMarketListings: pushListingIfNotExists(action.payload.listing),
      }
    case types.MARK_RUG_MARKET_LISTING_SOLD:
      return {
        ...state,
        rugMarketListings: markRugMarketListingSold(action.payload.listingId),
      }
    case types.CANCEL_RUG_MARKET_LISTING:
      return {
        ...state,
        rugMarketListings: cancelRugMarketListing(action.payload.listingId),
      }

    default:
      return state
  }
}

function cancelRugMarketListing(listingId): RugMarketListing[] {
  const index = rugMarketListings.findIndex((listing) => listing.id === listingId)
  const listings = rugMarketListings
  // @ts-ignore
  listings[index].state = '2'
  return listings
}

function markRugMarketListingSold(listingId): RugMarketListing[] {
  const index = rugMarketListings.findIndex((listing) => listing.id === listingId)
  const listings = rugMarketListings
  // @ts-ignore
  listings[index].state = '1'
  return listings
}

function pushListingIfNotExists(newListing): RugMarketListing[] {
  const index = rugMarketListings.findIndex((listing) => listing.id === newListing.id)
  const listings = rugMarketListings
  if (index === -1) {
    listings.push(newListing)
  }
  return listings
}
