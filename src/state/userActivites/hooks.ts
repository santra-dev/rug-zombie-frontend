import { useSelector } from 'react-redux'
import { State } from '../types'

const useGetUserActivities = () => {
  return useSelector((state: State) => state.userActivity)
}

export default useGetUserActivities
