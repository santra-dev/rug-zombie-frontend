import { useSelector } from 'react-redux'
import BigNumber from 'bignumber.js'
import { PriceState, State, TokenPrices } from '../types'
import { getWbnbAddress, getZombieAddress } from '../../utils/addressHelpers'

export const useGetPrices = (): PriceState => useSelector((state: State) => state.prices)

export const useGetPricesByTokenAddress = (address: string): TokenPrices => useGetPrices().prices[address.toLowerCase()]

export const useGetUsdPriceByTokenAddress = (address: string): number => {
  const prices = useGetPricesByTokenAddress(address)
  return prices && prices.priceUsd
}

export const useGetBnbPriceByTokenAddress = (address: string): number => {
  const prices = useGetPricesByTokenAddress(address)
  return prices && prices.priceBnb
}

export const useGetBnbPriceUsd = (): number =>
  useGetUsdPriceByTokenAddress(getWbnbAddress())
export const useGetZombiePriceBnb = (): BigNumber =>
  new BigNumber(useGetBnbPriceByTokenAddress(getZombieAddress()))
export const useGetZombiePriceUsd = (): number =>
  useGetUsdPriceByTokenAddress(getZombieAddress())

