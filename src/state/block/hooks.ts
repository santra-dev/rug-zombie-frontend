import { useSelector } from 'react-redux'
import { BlockState, State } from '../types'

const useBlock = (): BlockState => useSelector((state: State) => state.block)

export default useBlock
