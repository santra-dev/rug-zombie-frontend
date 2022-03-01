import React, { ReactNode, useState } from 'react'
import { AutoRenewIcon, Button, ButtonProps } from '@rug-zombie-libs/uikit'
import { useTranslation } from 'contexts/Localization'
import { usePredictionsContract } from 'hooks/useContract'
import useToast from 'hooks/useToast'
import { useAccount } from '../../../state/hooks'

interface ReclaimPositionButtonProps extends ButtonProps {
  epoch: number
  onSuccess?: () => Promise<void>
  children?: ReactNode
}

const ReclaimPositionButton: React.FC<ReclaimPositionButtonProps> = ({ epoch, onSuccess, children, ...props }) => {
  const [isPendingTx, setIsPendingTx] = useState(false)
  const { t } = useTranslation()
  const account = useAccount()
  const predictionsContract = usePredictionsContract()
  const { toastDefault, toastError } = useToast()

  const handleReclaim = () => {
    predictionsContract.methods
      .claim(epoch)
      .send({ from: account })
      .once('sending', () => {
        setIsPendingTx(true)
      })
      .once('receipt', async () => {
        if (onSuccess) {
          await onSuccess()
        }
        setIsPendingTx(false)
        toastDefault(t('Position reclaimed!'))
      })
      .once('error', (error) => {
        setIsPendingTx(false)
        toastError('Error', error?.message)
        console.error(error)
      })
  }

  return (
    <Button
      onClick={handleReclaim}
      isLoading={isPendingTx}
      endIcon={isPendingTx ? <AutoRenewIcon spin color="white" /> : null}
      {...props}
    >
      {children || t('Reclaim Position')}
    </Button>
  )
}

export default ReclaimPositionButton
