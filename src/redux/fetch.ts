import axios from 'axios'
import { BigNumber } from 'bignumber.js'
import sharkpoolAbi from 'config/abi/autosharkPool.json'

import { parseInt } from 'lodash'
import { useGetZmbeBnbTomb } from '../state/hooks'
import {
  getBep20Contract,
  getDrFrankensteinContract,
  getPancakePair,
  getZombieContract,
  getDrBurnensteinContract,
  getRugMarketContract,
} from '../utils/contractHelpers'

import store from './store'
import {
  updateZombieAllowance,
  updateAccount,
  updateZombieTotalSupply,
  updateZombieBalance,
  updateZombiePriceBnb,
  updateBnbPriceUsd,
  updateDrFrankensteinZombieBalance,
  updateAuctionInfo,
  updateAuctionUserInfo,
  updateDrFrankensteinTotalAllocPoint,
  updateBnbBalance,
  updateSharkPoolInfo,
  updateSharkPoolUserInfo,
  updateBurnGravePoolInfo,
  updateBurnGraveUserInfo,
  updateRugMarketListing,
  addRugMarketListing,
} from './actions'
import {
  getAddress,
  getDrFrankensteinAddress,
  getMausoleumAddress,
  getSharkPoolAddress,
} from '../utils/addressHelpers'
import * as get from './get'
import mausoleumAbi from '../config/abi/mausoleum.json'
import mausoleumV3Abi from '../config/abi/mausoleumV3.json'
import { BIG_ZERO } from '../utils/bigNumber'
import { account, auctionById } from './get'
import web3 from '../utils/web3'
import { multicallv2 } from '../utils/multicall'
import { getId } from '../utils'
import { tokenByAddress } from '../utils/tokenHelper'
import { RugMarketListing } from './types'

export const initialData = (accountAddress: string, setZombiePrice?: any) => {
  store.dispatch(updateAccount(accountAddress))
  const zombie = getZombieContract()
  const drFrankenstein = getDrFrankensteinContract()
  zombie.methods
    .totalSupply()
    .call()
    .then((res) => {
      store.dispatch(updateZombieTotalSupply(new BigNumber(res)))
    })

  zombie.methods
    .balanceOf(getDrFrankensteinAddress())
    .call()
    .then((res) => {
      store.dispatch(updateDrFrankensteinZombieBalance(new BigNumber(res)))
    })

  bnbPriceUsd(setZombiePrice)

  drFrankenstein.methods
    .totalAllocPoint()
    .call()
    .then((res) => {
      store.dispatch(updateDrFrankensteinTotalAllocPoint(new BigNumber(res)))
    })

  if (accountAddress) {
    web3.eth.getBalance(accountAddress).then((res) => {
      store.dispatch(updateBnbBalance(new BigNumber(res)))
    })

    zombie.methods
      .allowance(accountAddress, getDrFrankensteinAddress())
      .call()
      .then((res) => {
        store.dispatch(updateZombieAllowance(new BigNumber(res)))
      })

    zombie.methods
      .balanceOf(accountAddress)
      .call()
      .then((res) => {
        store.dispatch(updateZombieBalance(new BigNumber(res)))
      })
  }

  // initialGraveData()
}

export const sharkPool = (
  id: number,
  poolUpdateObj?: { update: number; setUpdate: any },
  userUpdateObj?: { update: number; setUpdate: any },
) => {
  const pool = get.sharkPoolById(id)
  const address = getSharkPoolAddress(id)
  const token = getBep20Contract(getAddress(pool.stakeToken.address))

  let calls = [
    { address, name: 'unlockFeeInBnb', params: [] },
    { address, name: 'minStakeAmount', params: [] },
    { address, name: 'maxStakeAmount', params: [] },
    { address, name: 'depositTaxRate', params: [] },
    { address, name: 'requiresDeposit', params: [] },
    { address, name: 'minStakeTime', params: [] },
  ]

  multicallv2(sharkpoolAbi, calls).then((res) => {
    token.methods
      .balanceOf(address)
      .call()
      .then((balanceRes) => {
        store.dispatch(
          updateSharkPoolInfo(id, {
            unlockFee: new BigNumber(res[0].toString()),
            minStake: new BigNumber(res[1].toString()),
            maxStake: new BigNumber(res[2].toString()),
            depositTaxRate: res[3] / 100,
            requiresDeposit: res[4],
            minStakeTime: new BigNumber(res[5].toString()),
            totalStaked: new BigNumber(balanceRes.toString()),
          }),
        )
        if (poolUpdateObj) {
          poolUpdateObj.setUpdate(poolUpdateObj.update + 1)
        }
      })
  })

  if (account()) {
    calls = [{ address, name: 'userInfo', params: [account()] }]

    multicallv2(sharkpoolAbi, calls).then((res) => {
      store.dispatch(
        updateSharkPoolUserInfo(id, {
          stakedAmount: new BigNumber(res[0].amount.toString()),
          paidUnlock: res[0].paidUnlockFee,
          paidDeposit: res[0].paidDepositFee,
          nftMintDate: res[0].nftMintDate,
        }),
      )
      if (userUpdateObj) {
        userUpdateObj.setUpdate(userUpdateObj.update + 1)
      }
    })
  }
}

export const auction = (
  id: number,
  mausoleum: any,
  updateAuctionObj?: { update: boolean; setUpdate: any },
  updateUserObj?: { update: boolean; setUpdate: any },
  everyUpdateObj?: { update: boolean; setUpdate: any },
) => {
  const { aid, version } = auctionById(id)
  const v3 = version === 'v3'
  if (account()) {
    mausoleum.methods
      .bidsLength(aid)
      .call()
      .then((bidsLengthRes) => {
        const calls = [
          { address: getMausoleumAddress(version), name: 'userInfo', params: [aid, account()] },
          { address: getMausoleumAddress(version), name: 'auctionInfo', params: [aid] },
        ]
        if (!v3) {
          calls.push({ address: getMausoleumAddress(version), name: 'unlockFeeInBnb', params: [aid] })
        }
        for (let x = parseInt(bidsLengthRes) - 5; x <= parseInt(bidsLengthRes); x++) {
          if (x - 1 >= 0) {
            calls.push({ address: getMausoleumAddress(version), name: 'bidInfo', params: [aid, x - 1] })
          }
        }
        multicallv2(version === 'v3' ? mausoleumV3Abi : mausoleumAbi, calls).then((res) => {
          const start = parseInt(bidsLengthRes) - 6
          let index = start < -1 ? 0 : parseInt(bidsLengthRes) - 6

          const bids = res.slice(v3 ? 2 : 3, res.length).map((bid) => {
            index++
            return {
              id: index,
              amount: new BigNumber(bid.amount.toString()),
              bidder: bid.bidder,
            }
          })

          const userInfoRes = res[0]
          const auctionInfoRes = v3 ? res[1] : res[2]

          store.dispatch(
            updateAuctionInfo(id, {
              lastBidId: parseInt(bidsLengthRes),
              bids,
              endDate: auctionInfoRes.endDate?.toNumber(),
              finalized: auctionInfoRes.finalized,
              unlockFeeInBnb: v3 ? BIG_ZERO : new BigNumber(res[1].toString()),
            }),
          )
          store.dispatch(
            updateAuctionUserInfo(id, {
              bid: new BigNumber(userInfoRes.bid.toString()),
              paidUnlockFee: userInfoRes.paidUnlockFee,
            }),
          )
          if (updateUserObj && !updateUserObj.update) {
            updateUserObj.setUpdate(!updateUserObj.update)
          }
          if (everyUpdateObj) {
            everyUpdateObj.setUpdate(!everyUpdateObj.update)
          }
        })
      })
  } else {
    mausoleum.methods
      .bidsLength(aid)
      .call()
      .then((bidsLengthRes) => {
        const calls = [{ address: getMausoleumAddress(version), name: 'unlockFeeInBnb', params: [aid] }]
        for (let x = parseInt(bidsLengthRes) - 5; x <= parseInt(bidsLengthRes); x++) {
          if (x - 1 >= 0) {
            calls.push({ address: getMausoleumAddress(version), name: 'bidInfo', params: [aid, x - 1] })
          }
        }

        multicallv2(mausoleumAbi, calls).then((res) => {
          const auctionInfoRes = v3 ? res[1] : res[2]

          const start = parseInt(bidsLengthRes) - 6
          let index = start < -1 ? 0 : parseInt(bidsLengthRes) - 6
          const bids = res.slice(v3 ? 2 : 3, res.length).map((bid) => {
            index++
            return {
              id: index,
              amount: new BigNumber(bid.amount.toString()),
              bidder: bid.bidder,
            }
          })

          store.dispatch(
            updateAuctionInfo(id, {
              lastBidId: parseInt(bidsLengthRes),
              bids,
              endDate: auctionInfoRes.endDate.toNumber(),
              finalized: auctionInfoRes.finalized,
              unlockFeeInBnb: v3 ? BIG_ZERO : new BigNumber(res[1].toString()),
            }),
          )
          if (updateAuctionObj && !updateAuctionObj.update) {
            updateAuctionObj.setUpdate(!updateAuctionObj.update)
          }
          if (everyUpdateObj) {
            everyUpdateObj.setUpdate(!everyUpdateObj.update)
          }
        })
      })
  }
}

export const initialSharkPoolData = (
  setPoolData?: { update: number; setUpdate: any },
  setUserData?: { update: number; setUpdate: any },
) => {
  let index = 0
  get.sharkPools().forEach((sp) => {
    sharkPool(
      sp.id,
      setPoolData ? { update: setPoolData.update + index, setUpdate: setPoolData.setUpdate } : undefined,
      setUserData ? { update: setUserData.update + index, setUpdate: setUserData.setUpdate } : undefined,
    )
    index++
  })
}

const zombiePriceBnb = (setZombiePrice?: any) => {
  getPancakePair(getAddress(useGetZmbeBnbTomb().lpAddress))
    .methods.getReserves()
    .call()
    .then((res) => {
      const price = new BigNumber(res._reserve1).div(res._reserve0)
      store.dispatch(updateZombiePriceBnb(price))
      if (setZombiePrice) {
        setZombiePrice(price)
      }
    })
}

const bnbPriceUsd = (setZombiePrice?: any) => {
  axios.get('https://api.binance.com/api/v3/avgPrice?symbol=BNBBUSD').then((res) => {
    store.dispatch(updateBnbPriceUsd(res.data.price))
    if (setZombiePrice) {
      // FIXME
      zombiePriceBnb(setZombiePrice)
    }
  })
}

export const burnGrave = (
  id: number,
  setUserInfoState?: { update: boolean; setUpdate: any },
  setPoolInfoState?: { update: boolean; setUpdate: any },
) => {
  const drBurnenstein = getDrBurnensteinContract()

  drBurnenstein.methods
    .graveInfo(id)
    .call()
    .then((res) => {
      store.dispatch(
        updateBurnGravePoolInfo(id, {
          isEnabled: res.isEnabled,
          depositType: parseInt(res.depositType.toString()),
          depositAddress: res.deposit.toString(),
          unlockFee: new BigNumber(res.unlockFee.toString()),
          minimumStake: new BigNumber(res.minimumStake.toString()),
          mintingTime: new BigNumber(res.mintingTime.toString()),
          tokensToBurn: new BigNumber(res.burnTokens.toString()),
          burnReduction: res.burnHours,
          maxBurned: new BigNumber(res.maxBurned.toString()),
          totalStaked: new BigNumber(res.totalStaked.toString()),
          totalBurned: new BigNumber(res.totalBurned.toString()),
        }),
      )
      if (setPoolInfoState) {
        setPoolInfoState.setUpdate(!setPoolInfoState.update)
      }
    })

  if (account()) {
    drBurnenstein.methods
      .userInfo(id, account())
      .call()
      .then((res) => {
        store.dispatch(
          updateBurnGraveUserInfo(id, {
            stakedAmount: new BigNumber(res.amount.toString()),
            hasDeposited: res.deposited,
            hasUnlocked: res.paidUnlockFee,
            nftMintDate: parseInt(res.nftMintDate),
            burnedAmount: new BigNumber(res.burnedAmount.toString()),
          }),
        )
        if (setUserInfoState) {
          setUserInfoState.setUpdate(!setUserInfoState.update)
        }
      })
  }
}

export const initialBurnGraveData = (setUserState?, setPoolState?) => {
  get.burnGraves().forEach((g) => {
    burnGrave(getId(g.id), setUserState, setPoolState)
  })
}

export const updateRugMarketListings = () => {
  const rugMarketContract = getRugMarketContract()

  rugMarketContract.methods
    .totalListings()
    .call()
    .then((totalListings) => {
      for (let index = 0; index < Number(totalListings); index++) {
        rugMarketContract.methods
          .listings(index)
          .call()
          .then((listing) => {
            store.dispatch(
              updateRugMarketListing({
                id: index,
                owner: listing.owner,
                token: tokenByAddress(listing.token),
                quantity: listing.quantity,
                price: listing.price,
                taxedToken: listing.taxedToken,
                state: listing.state,
              }),
            )
          })
      }
    })
}

export const addRugMarketListings = (listing: RugMarketListing) => {
  store.dispatch(addRugMarketListing(listing))
}
