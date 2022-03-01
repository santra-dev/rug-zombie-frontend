import React from 'react'
import { useWalletModal } from '@rug-zombie-libs/uikit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import { useAccount } from '../state/hooks'
import { PrimaryButton } from './Buttons'
import { Text } from './TopMenu/styles'
import { formatAddress } from '../utils'

export const ConnectButton = styled(PrimaryButton)`
  padding: 0 25px 0 25px;
  margin-right: 20px;
  &:hover {
    cursor: pointer;
  }
`

export const ConnectText = styled(Text)`
  color: black;
  &:hover {
    text-shadow: 0 0 5px limegreen;
  }
  font-weight: bold;
`

const UnlockButton = (props) => {
  const { t } = useTranslation()
  const account = useAccount()
  const { login, logout } = useAuth()
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account)

  return (
    <ConnectButton onClick={account ? onPresentAccountModal : onPresentConnectModal} {...props}>
      <ConnectText>{account ? formatAddress(account) : t('Connect')}</ConnectText>
    </ConnectButton>
  )
}

export default UnlockButton
