import React from 'react'
import { AutoRenewIcon, HistoryIcon, IconButton } from '@rug-zombie-libs/uikit'
import { useAppDispatch } from 'state'
import { setHistoryPaneState } from 'state/predictions'
import { useAccount } from '../../../state/hooks'

const HistoryButton = () => {
  const isFetchingHistory = false
  const dispatch = useAppDispatch()
  const account = useAccount()

  const handleClick = () => {
    dispatch(setHistoryPaneState(true))
  }

  return (
    <IconButton variant="subtle" ml="8px" onClick={handleClick} isLoading={isFetchingHistory} disabled={!account}>
      {isFetchingHistory ? <AutoRenewIcon spin color="white" /> : <HistoryIcon width="24px" color="white" />}
    </IconButton>
  )
}

export default HistoryButton
