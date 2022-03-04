import BigNumber from 'bignumber.js'
import { useSelector } from 'react-redux'
import { PCS_ZMBE_BNB_TOMB_PID } from '../../config/constants/tombs'
import { getId } from '../../utils'
import { State, Tomb } from '../types'

export const useGetTombs = () => {
  return useSelector((state: State) => state.tombs)
}

export const useGetTombByPid = (pid: number): Tomb => useGetTombs().data
  .find((tomb) => getId(tomb.pid) === pid)

export const useGetZombieBnbTomb = (): Tomb => useGetTombByPid(getId(PCS_ZMBE_BNB_TOMB_PID))
export const useGetZombieBnbLpPriceBnb = (): BigNumber => useGetZombieBnbTomb().poolInfo.lpPriceBnb
export const useGetZombiePerZombieBnbLp = (): BigNumber => useGetZombieBnbTomb().poolInfo.lpReserves[0].div()
