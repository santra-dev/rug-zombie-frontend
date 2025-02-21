import React from 'react'
import { PrimaryButtonText } from 'components/Buttons'
import numeral from 'numeral'
import { getZombieAddress } from 'utils/addressHelpers'

import {
  ButtonsDiv,
  HeroContainer,
  HeroContent,
  PrimaryLinkButton,
  StakeNowButton,
  StakeNowButtonText,
  SubTextBox,
  TitleTextBox,
  TvlNumber,
  TvlText,
} from './styles'
import { BASE_EXCHANGE_URL } from '../../../../config'

interface HeroProps {
  tvl: any
  history: any
}

const Hero: React.FC<HeroProps> = ({ tvl, history }) => {
  return (
    <HeroContainer>
      <HeroContent>
        <TitleTextBox>Resurrect Your Dead Tokens</TitleTextBox>
        <SubTextBox>
          Turn your worthless tokens into assets. RugZombie is introducing the next generation of NFT utility, with
          GameFi, E-Commerce and metaverse features.
        </SubTextBox>
        <TvlText>Total value locked:</TvlText>
        <TvlNumber>&nbsp;{`$${numeral(tvl).format('(0.00 a)')}`}</TvlNumber>
        <ButtonsDiv>
          <PrimaryLinkButton
            onClick={() => {
              window.location.href = `${BASE_EXCHANGE_URL}/swap?outputCurrency=${getZombieAddress()}`
            }}
          >
            <PrimaryButtonText>Buy $ZMBE</PrimaryButtonText>
          </PrimaryLinkButton>
          <PrimaryLinkButton
            onClick={() => {
              history.push('/graveyard')
            }}
          >
            <PrimaryButtonText>View NFTs</PrimaryButtonText>
          </PrimaryLinkButton>
          <StakeNowButton
            onClick={() => {
              history.push('/graves')
            }}
          >
            <StakeNowButtonText>Stake Now</StakeNowButtonText>
          </StakeNowButton>
        </ButtonsDiv>
      </HeroContent>
    </HeroContainer>
  )
}

export default Hero
