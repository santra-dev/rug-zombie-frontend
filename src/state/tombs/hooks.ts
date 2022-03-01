import { useSelector } from 'react-redux'
import { ZMBE_BNB_TOMB_ID } from '../../config/constants/tombs'
import { getId } from '../../utils'
import { State, Tomb, TombsState } from '../types'

export const useGetTombs = (): TombsState => {
  return useSelector((state: State) => state.tombs)
}

export const useGetTombById = (pid: number): Tomb => useGetTombs().data
  .find((tomb) => getId(tomb.pid) === pid)

export const useGetZmbeBnbTomb = () => useGetTombById(getId(ZMBE_BNB_TOMB_ID))
