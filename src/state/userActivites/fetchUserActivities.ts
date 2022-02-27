import { EventData } from 'web3-eth-contract'

import { BigNumber } from 'bignumber.js'
import { getDrFrankensteinContract } from '../../utils/contractHelpers'
import web3 from '../../utils/web3'
import { UserActivityType } from '../../config/constants/types'

const ACTIVITY_TYPE_TO_EVENT_NAME: Map<UserActivityType, string> = new Map([
  [UserActivityType.DrFDeposit, 'Deposit'],
  [UserActivityType.DrFWithdraw, 'Withdraw'],
  [UserActivityType.DrFHarvest, 'Withdraw'],
  [UserActivityType.DrFWithdrawEarly, 'WithdrawEarly'],
  [UserActivityType.DrFMintNft, 'ReviveRug'],
])

// excludes 'Withdraw' due to overlap between harvest and withdraw activity types
const EVENT_NAME_TO_ACTIVITY_TYPE: Map<string, UserActivityType> = new Map([
  ['Deposit', UserActivityType.DrFDeposit],
  ['WithdrawEarly', UserActivityType.DrFWithdrawEarly],
  ['ReviveRug', UserActivityType.DrFMintNft],
])

const EVENT_NAME_TO_USER_PROP: Map<string, string> = new Map(
  ['Deposit', 'Withdraw', 'WithdrawEarly'].map((event) => [event, 'user']).concat([['ReviveRug', 'to']]) as [
    string,
    string,
  ][],
)

const RELEVANT_EVENT_TYPES: Set<string> = new Set(ACTIVITY_TYPE_TO_EVENT_NAME.values())

const getEventType = (event: EventData) => {
  const { event: eventName, returnValues } = event

  if (!RELEVANT_EVENT_TYPES.has(eventName)) {
    return -1
  }

  if (eventName === 'Withdraw') {
    return new BigNumber(returnValues.amount).isZero() ? UserActivityType.DrFHarvest : UserActivityType.DrFWithdraw
  }

  return EVENT_NAME_TO_ACTIVITY_TYPE.get(eventName)
}

const isRelevantForUser = (user: string) => (event: EventData) => {
  const { event: eventName } = event
  if (!RELEVANT_EVENT_TYPES.has(event.event)) {
    return false
  }

  const eventUser = event.returnValues[EVENT_NAME_TO_USER_PROP[eventName]]
  return eventUser === user
}

// eslint-disable-next-line import/prefer-default-export
export const fetchDrFEvents = async (account: string, toBlock?: number) => {
  const drFrankenstein = getDrFrankensteinContract()
  const currentBlock = toBlock || (await web3.eth.getBlockNumber())
  const fromBlock = currentBlock - 5000

  const allEvents: EventData[] = await drFrankenstein.getPastEvents('allEvents', {
    fromBlock,
    toBlock: currentBlock,
  })

  return Promise.all(
    allEvents.filter(isRelevantForUser(account)).map(async (event) => {
      const { returnValues, blockNumber } = event
      let { timestamp } = await web3.eth.getBlock(blockNumber, false)
      if (typeof timestamp === 'string') {
        timestamp = parseInt(timestamp)
      }

      return {
        type: getEventType(event),
        data: returnValues,
        timestamp,
      }
    }),
  )
}
