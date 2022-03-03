import React, { useState, useEffect } from 'react'
import { Modal, Flex, Text, Button } from '@rug-zombie-libs/uikit'
import nfts from 'config/constants/nfts'
import { BIG_ZERO } from 'utils/bigNumber'
import { useERC721, useNftOwnership, useNftSwapper } from 'hooks/useContract'
import { getAddress, getNftSwapperAddress } from 'utils/addressHelpers'
import BigNumber from 'bignumber.js'
import useToast from 'hooks/useToast'
import { useTranslation } from 'contexts/Localization'
import { useWeb3React } from '@web3-react/core'

interface ConvertNftProps {
  rznftid: number
  onDismiss?: () => void
}

const ConvertNftModal: React.FC<ConvertNftProps> = ({ rznftid, onDismiss }) => {
  const rznft = nfts.find((a) => a.id === rznftid)
  const { account } = useWeb3React()
  const { toastDefault } = useToast()
  const { t } = useTranslation()

  const nftOwnershipContract = useNftOwnership()
  const nftSwapperContract = useNftSwapper()
  const rzNftContract = useERC721(getAddress(rznft.address))

  const [nftBalance, setNftBalance] = useState(BIG_ZERO)
  const [ids, setIds] = useState([])
  const [selected, setSelected] = useState(null)
  const [approved, setApproved] = useState(false)

  useEffect(() => {
    if (selected && account) {
      rzNftContract.methods
        .getApproved(selected)
        .call()
        .then((res) => {
          setApproved(res === getNftSwapperAddress())
        })
    }
  }, [selected, account, rzNftContract.methods])

  useEffect(() => {
    if (account) {
      rzNftContract.methods
        .balanceOf(account)
        .call()
        .then((res) => {
          setNftBalance(new BigNumber(res))
        })
    }
  }, [rzNftContract.methods, account])

  useEffect(() => {
    if (account) {
      nftOwnershipContract.methods
        .checkOwnership(account, getAddress(rznft.address))
        .call()
        .then((res) => {
          setIds(res)
        })
    }
  }, [rznft.address, nftOwnershipContract.methods, account])

  function handleConvertNft() {
    if (account && approved) {
      nftSwapperContract.methods
        .swapNft(getAddress(rznft.address), selected)
        .send({ from: account })
        .then(() => {
          toastDefault(t(`Converted ${rznft.symbol}`))
          onDismiss()
        })
    }
  }

  const handleApproveNft = () => {
    if (account && !approved) {
      rzNftContract.methods
        .approve(getNftSwapperAddress(), selected)
        .send({ from: account })
        .then(() => {
          setApproved(true)
        })
    }
  }

  const approveButton = selected && !approved
  const convertButton = selected && approved

  return (
    <Modal onDismiss={onDismiss} title={`Convert ${rznft.symbol}`}>
      <Flex alignItems="center" justifyContent="space-between" mb="8px">
        <Text bold>Select ID of NFT:</Text>
        <Flex alignItems="center" minWidth="70px">
          <Text ml="4px" bold>
            {rznft.symbol}
          </Text>
        </Flex>
      </Flex>
      <Flex justifyContent="center">
        {rznft.type === 'image' ? (
          <img src={rznft.path} alt="NFT" style={{ maxWidth: '50%' }} className="sc-cxNHIi bjMxQn" />
        ) : (
          <video autoPlay loop className="sc-cxNHIi bjMxQn">
            <source src={rznft.path} type="video/webm" />
          </video>
        )}
      </Flex>
      <Text mt="8px" color="textSubtle" fontSize="12px" mb="8px" style={{ width: '100%' }}>
        Balance: {nftBalance.toString()}
        {nftBalance.isZero() ? (
          <Text mt="8px" ml="auto" color="tertiary" fontSize="12px" mb="8px">
            Must earn {rznft.symbol} NFT before you can swap
          </Text>
        ) : (
          <Text bold>IDS in your wallet:</Text>
        )}
      </Text>
      <Flex justifyContent="center">
        {ids.map((currentId) => {
          return (
            <div id={currentId} key={currentId} style={{ padding: '10px' }}>
              <Button
                onClick={() => {
                  setSelected(currentId)
                }}
                variant={currentId === selected ? 'secondary' : 'primary'}
              >
                {currentId}
              </Button>
            </div>
          )
        })}
      </Flex>
      <Flex justifyContent="center">
        <Button
          onClick={() => {
            if (selected) {
              handleApproveNft()
            }
          }}
          disabled={!approveButton}
          mt="8px"
          as="a"
          variant={selected ? 'secondary' : 'primary'}
        >
          APPROVE {rznft.symbol}
        </Button>
        <Text mt="8px" color="textSubtle" fontSize="12px" mb="8px" style={{ width: '10%' }} />
        <Button
          onClick={() => {
            if (selected) {
              handleConvertNft()
            }
          }}
          disabled={!convertButton}
          mt="8px"
          as="a"
          variant={selected ? 'secondary' : 'primary'}
        >
          CONVERT {rznft.symbol}
        </Button>
      </Flex>
    </Modal>
  )
}

export default ConvertNftModal
