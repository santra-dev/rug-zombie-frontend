import BigNumber from 'bignumber.js'
import { useSelector } from 'react-redux'
import { ZMBE_BNB_TOMB_ID } from '../../config/constants/tombs'
import { getId } from '../../utils'
import { BIG_ZERO } from '../../utils/bigNumber'
import { getBalanceNumber } from '../../utils/formatBalance'
import { useGetBnbPriceUsd } from '../prices/hooks'
import { State, Tomb, TombsState } from '../types'

export const useGetTombs = (): TombsState => {
  return useSelector((state: State) => state.tombs)
}

export const useGetTombById = (pid: number): Tomb => useGetTombs().data
  .find((tomb) => getId(tomb.pid) === pid)

export const useGetZmbeBnbTomb = (): Tomb => useGetTombById(getId(ZMBE_BNB_TOMB_ID))
export const useGetZmbeBnbLpPriceBnb = (): BigNumber => useGetZmbeBnbTomb().poolInfo.lpPriceBnb

interface TombTvls {
  userTvl: BigNumber,
  totalTvl: BigNumber,
}

export const useGetTombTvlsBnb = (): TombTvls => useGetTombs().data.reduce(
  (
    { userTvl, totalTvl },
    {
      userInfo: { amount },
      poolInfo: { tokenAmount, lpPriceBnb },
    },
  ) => ({
    userTvl: userTvl.plus(getBalanceNumber(amount.times(lpPriceBnb))),
    totalTvl: totalTvl.plus(getBalanceNumber(tokenAmount.times(lpPriceBnb))),
  }) ,
  {
    userTvl: BIG_ZERO,
    totalTvl: BIG_ZERO,
  },
)

export const useGetTombTvlsUsd = (): TombTvls => {
  const bnbPriceUsd = useGetBnbPriceUsd()
  const { userTvl: userTvlBnb, totalTvl: totalTvlBnb } = useGetTombTvlsBnb()

  return {
    userTvl: userTvlBnb.times(bnbPriceUsd),
    totalTvl: totalTvlBnb.times(bnbPriceUsd),
  }
}
