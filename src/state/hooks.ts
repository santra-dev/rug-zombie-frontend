import { useWeb3React } from '@web3-react/core'
import { useSelector } from 'react-redux'
import { getAddress } from 'utils/addressHelpers'
import axios from 'axios'
import { State } from './types'
import { getContract, getPancakePair } from '../utils/contractHelpers'
import pancakeFactoryAbi from '../config/abi/pancakeFactoryAbi.json'
import tokens from '../config/constants/tokens'
import contracts from '../config/constants/contracts'

export const getBnbPriceinBusd = () => {
  return axios.get('https://api.binance.com/api/v3/avgPrice?symbol=BNBBUSD')
}

export const fetchZmbeBnbAddress = (): Promise<string> => {
  return getContract(pancakeFactoryAbi, getAddress(contracts.pancakeFactory))
    .methods.getPair(getAddress(tokens.zmbe.address), getAddress(tokens.wbnb.address))
    .call()
}

export const fetchLpReserves = (address): Promise<any> => {
  return getPancakePair(address).methods.getReserves().call()
}

// Block
export const useAccount = () => useWeb3React().account

export const useBlock = () => {
  return useSelector((state: State) => state.block)
}

export const useInitialBlock = () => {
  return useSelector((state: State) => state.block.initialBlock)
}

export const useGetUserActivities = () => {
  return useSelector((state: State) => state.userActivity)
}

export { useGetNfts, useGetNftById, useGetNftTotalSupply } from './nfts/hooks'
export { useGetGraves, useGetGraveByPid, useGetFilteredGraves } from './graves/hooks'
export { useGetSpawningPools, useGetFilteredSpawningPools } from './spawningPools/hooks'
export { useGetTombs, useGetTombById, useGetZmbeBnbTomb } from './tombs/hooks'
