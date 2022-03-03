import BigNumber from 'bignumber.js'
import bep20Abi from '../../config/abi/erc20.json'
import { getDrFrankensteinAddress, getZombieAddress } from '../../utils/addressHelpers'
import { BIG_ZERO } from '../../utils/bigNumber'
import multicall from '../../utils/multicall'
import { AccountBalances, AccountState } from '../types'

const fetchBalances = async (account: string): Promise<AccountBalances> => {
  if (!account) {
    return {
      zombieBalance: BIG_ZERO,
      zombieAllowance: BIG_ZERO,
    }
  }

  const zombieAddress = getZombieAddress()
  const drFrankensteinAddress = getDrFrankensteinAddress()
  const [ zombieBalance, zombieAllowance ] = await multicall(bep20Abi, [
    { address: zombieAddress, name: 'balanceOf', params: [account] },
    { address: zombieAddress, name: 'allowance', params: [account, drFrankensteinAddress] },
  ])

  return {
    zombieBalance: new BigNumber(zombieBalance),
    zombieAllowance: new BigNumber(zombieAllowance),
  }
}

const fetchAccount = async (account: string): Promise<AccountState> => {
  const balances = await fetchBalances(account)

  return {
    balances,
  }
}

export default fetchAccount
