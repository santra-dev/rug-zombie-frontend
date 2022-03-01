import React from 'react'

import './Profile.Styles.css'
import { Flex } from '@rug-zombie-libs/uikit'
import { useAccount } from '../../state/hooks'
import ProfilePage from './ProfilePage'

const Profile: React.FC = () => {
  const account = useAccount()
  return (
    <>
      {account && account !== '' ? (
        <ProfilePage />
      ) : (
        <Flex style={{ paddingTop: '10px', width: '100%', justifyContent: 'center' }}>
          <div className="total-earned text-shadow">Connect Wallet to view your profile</div>
        </Flex>
      )}
    </>
  )
}

export default Profile
