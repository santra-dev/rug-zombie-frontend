// eslint-disable-next-line import/prefer-default-export
import tokens from '../config/constants/tokens'
import artists from '../config/constants/artists'
import { BIG_ZERO } from '../utils/bigNumber'
import { Grave, PoolInfo, UserInfo } from './types'

const userInfo: UserInfo = {
  paidUnlockFee: false,
  tokenWithdrawalDate: 0,
  nftRevivalDate: 0,
  rugDeposited: BIG_ZERO,
  amount: BIG_ZERO,
  pendingZombie: BIG_ZERO,
}

const poolInfo: PoolInfo = {
  lpToken: undefined,
  unlockFee: BIG_ZERO,
  minimumStake: BIG_ZERO,
  totalStakingTokenStaked: BIG_ZERO,
  withdrawCooldown: 0,
  nftRevivalTime: 0,
  allocPoint: 0
}

const graves: Grave[] = [
  {
    pid: {
      56: 22,
      97: 0,
    },
    name: 'RugZombie Common',
    subtitle: 'Basic Zombie',
    path: 'images/rugZombie/BasicZombie.gif',
    type: 'image',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '7 days',
    rug: tokens.zmbe,
    artist: artists.RugZombie,
    stakingToken: '0x1D4CA2139E942b2EA9d7B40AF3805967242b7525',
    pcsVersion: 'v2',
    liquidityDetails: '',
    isEnding: false,
    isClosed: false,
    rarity: "Common",
    userInfo: { ...userInfo },
    poolInfo: { ...poolInfo },
  },
  {
    pid: {
      56: 0,
      97: 0,
    },
    name: 'RugZombie Common (Legacy)',
    subtitle: 'Basic Zombie',
    path: 'images/rugZombie/BasicZombie.gif',
    type: 'image',
    withdrawalCooldown: '30 days',
    nftRevivalTime: '30 days',
    rug: tokens.none,
    artist: artists.RugZombie,
    stakingToken: '',
    pcsVersion: 'v2',
    liquidityDetails: '',
    isClosed: true,
    isRetired: true,
    rarity: "Common",
    userInfo: { ...userInfo },
    poolInfo: { ...poolInfo },
  },
  {
    pid: {
      56: 23,
      97: 0,
    },
    name: 'RugZombie Uncommon',
    subtitle: 'Zombie Horde',
    path: 'images/rugZombie/Zombie Multiplier.png',
    type: 'image',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '14 days',
    rug: tokens.basicZmbe,
    artist: artists.RugZombie,
    stakingToken: '0x5E15E3431d2037d3Ce20238d8fF45faF551aD6b2',
    pcsVersion: 'none',
    liquidityDetails: 'None! You must earn the Basic Zombie NFT from the RugZombie Common Grave to gain access.',
    requiresNft: true,
    requiredNftPath: 'images/rugZombie/BasicZombie.gif',
    nftConverterPid: 0,
    graveNftToken: "0x22e42D9425b55FD2262bfF72a316bb052DDb2a77",
    nft: "Basic Zombie",
    rarity: "Uncommon",
    userInfo: { ...userInfo },
    poolInfo: { ...poolInfo },
  },
  {
    pid: {
      56: 24,
      97: 0,
    },
    name: 'RugZombie Rare',
    subtitle: 'Zombie Multiplexer',
    path: 'https://ipfs.io/ipfs/Qmdi7wTt8iF62ay8foD7nqP5F7qSB9YGaYgY3NL1URA5Cw',
    type: 'image',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '30 days',
    rug: tokens.horde,
    artist: artists.RugZombie,
    stakingToken: '0xF4b4460AD6Ebb969BF26a61298D2087404610a11',
    pcsVersion: 'none',
    liquidityDetails: 'None! You must earn the Zombie Horde NFT from the RugZombie Uncommon Grave to gain access.',
    requiresNft: true,
    requiredNftPath: 'images/rugZombie/Zombie Multiplier.png',
    nftConverterPid: 1,
    graveNftToken: "0xE30043524ADb329169b11eDfe833a9beDd4D2A11",
    nft: "Zombie Horde",
    rarity: "Rare",
    userInfo: { ...userInfo },
    poolInfo: { ...poolInfo },
  },
  {
    pid: {
      56: 27,
      97: 0,
    },
    name: 'Whale Pass Rare',
    subtitle: 'Season 1',
    path: 'https://ipfs.io/ipfs/QmQnj8i4k2kwoboNN2TMoJ5ugH1Mxav4r8zAsz6PmXvP7P',
    type: 'image',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '90 days',
    rug: tokens.basicZmbe,
    artist: artists.jussjoshinduh,
    stakingToken: '0x3e2e7DC42fc7FF54229fab4F92B859DDB28691B1',
    pcsVersion: 'none',
    liquidityDetails: 'None! You must earn the Basic Zombie NFT from the RugZombie Common Grave to gain access.',
    requiresNft: true,
    requiredNftPath: 'images/rugZombie/BasicZombie.gif',
    nftConverterPid: 0,
    graveNftToken: "0x22e42D9425b55FD2262bfF72a316bb052DDb2a77",
    nft: "Basic Zombie",
    isFeatured: true,
    rarity: "Rare",
    endDate: 1648051200,
    isEnding: true,
    userInfo: { ...userInfo },
    poolInfo: { ...poolInfo },
  },
  {
    pid: {
      56: 43,
      97: 1,
    },
    name: 'Ronin Gamez Legendary',
    subtitle: 'Ronin',
    path: 'https://ipfs.io/ipfs/QmceY5i3QbqUFmxdxpd5FyZsHakHTH8LvY8ToLUste9xQJ',
    type: 'image',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '30 days',
    rug: tokens.roningmz,
    artist: artists.ayaz_psd,
    stakingToken: '0xB459C6DD5ca76367df58E6874a35280b0531B451',
    pcsVersion: 'none',
    liquidityDetails: 'None! Trading on the Ronin contract has been halted, a new grave will be available for new stakers shortly.',
    isFeatured: true,
    isNew: true,
    rarity: "Legendary",
    userInfo: { ...userInfo },
    poolInfo: { ...poolInfo },
  },
  {
    pid: {
      56: 40,
      97: 1,
    },
    name: 'Iron Finance Legendary',
    subtitle: 'Collectorate #1',
    path: 'https://storage.googleapis.com/rug-zombie/Collectorate%20%231%20-%20compressed.jpeg',
    type: 'image',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '30 days',
    rug: tokens.iron,
    artist: artists.xvni,
    stakingToken: '0x7Db92fFC7EfA16010b86deEb05B25612d8A8343a',
    pcsVersion: 'v2',
    liquidityDetails: '',
    isFeatured: true,
    rarity: "Legendary",
    userInfo: { ...userInfo },
    poolInfo: { ...poolInfo },
  },
  {
    pid: {
      56: 42,
      97: 1,
    },
    name: 'Pancake Hunny Rare',
    subtitle: 'Hunny Badger Don\'t Care',
    path: 'https://ipfs.io/ipfs/QmaAaAY5HnSGo4UAAwJ4N4DLR8JatkXirZzerdiF85QZ8w',
    type: 'image',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '30 days',
    rug: tokens.hunny,
    artist: artists.jussjoshinduh,
    stakingToken: '0x705F7C0EBAeDE0E19Fb67472612e877AD24B25De',
    pcsVersion: 'v2',
    liquidityDetails: '',
    isNew: true,
    isFeatured: true,
    rarity: "Rare",
    userInfo: { ...userInfo },
    poolInfo: { ...poolInfo },
  },
  {
    pid: {
      56: 41,
      97: 1,
    },
    name: 'Minereum BSC Common',
    subtitle: 'Mines of Mineria',
    path: 'https://ipfs.io/ipfs/QmYZZSJahiBKWUhwJMcgQT4xJYnqFjWWT1XQSUnPdhZseU',
    type: 'image',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '7 days',
    rug: tokens.zmneb,
    artist: artists.canadiancryptojunkie,
    stakingToken: '0x3f078348817F5CbA98C67268e1789Cb82c7e5791',
    pcsVersion: 'none',
    liquidityDetails: 'None! zMinereum BSC can be claimed by MNEB holders on the home page or rolled for in the Catacombs! ',
    isNew: true,
    isFeatured: true,
    rarity: "Common",
    userInfo: { ...userInfo },
    poolInfo: { ...poolInfo },
  },
  {
    pid: {
      56: 39,
      97: 1,
    },
    name: 'Squid Game Rare',
    subtitle: 'Marbles',
    path: 'https://ipfs.io/ipfs/QmXNJtKYSRKNeoGDRgzfSjom69SJkGUVVz7gYUmnb5frHS',
    type: 'image',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '30 days',
    rug: tokens.squidgame,
    artist: artists.trippynazz,
    stakingToken: '0x641312df72429346Ce07963b7398353f33A8169b',
    pcsVersion: 'v2',
    liquidityDetails: '',
    isFeatured: true,
    rarity: "Rare",
    additionalDetails: [
      {
        name: 'SPONSORED BY L1GHT L1ST',
        url: 'https://l1ghtl1st.io/',
      },
    ],
    userInfo: { ...userInfo },
    poolInfo: { ...poolInfo },
  },
  {
    pid: {
      56: 37,
      97: 1,
    },
    name: 'Bogged Finance Rare',
    subtitle: 'Bog of War',
    path: 'https://ipfs.io/ipfs/QmZiTTWyAyru6Me4WvmvmcJSM1C6exeqiGcUTWkBUnwYUp',
    type: 'image',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '30 days',
    rug: tokens.zbog,
    artist: artists.TheLeap3d,
    stakingToken: '0xE5102566d966988c6DFF076c92aEabAff80879b6',
    pcsVersion: 'none',
    liquidityDetails: 'None! BOG holders can claim ZBOG using the Victim Pools home card.',
    isFeatured: true,
    rarity: "Rare",
    userInfo: { ...userInfo },
    poolInfo: { ...poolInfo },
  },
  {
    pid: {
      56: 38,
      97: 1,
    },
    name: 'BlackDiamond Rare',
    subtitle: 'The Double Black Diamond',
    path: 'https://ipfs.io/ipfs/QmQ12QcVoJtuzGmf8zaqGyHnXWidnCSs6tqFRHASpbYnuf',
    type: 'image',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '30 days',
    rug: tokens.zdiamonds,
    artist: artists.canadiancryptojunkie,
    stakingToken: '0x64DBC2eD265Ec5214A222251618fA78733D379d7',
    pcsVersion: 'v2',
    liquidityDetails: '',
    isFeatured: true,
    rarity: "Rare",
    userInfo: { ...userInfo },
    poolInfo: { ...poolInfo },
  },
  {
    pid: {
      56: 34,
      97: 1,
    },
    name: 'PokeCoin Uncommon',
    subtitle: 'Zash',
    path: 'https://ipfs.io/ipfs/Qmazy6NjT8tExujfoqHDuA5RmWZ6xdrbNiFQKkVMiWLXVu',
    type: 'image',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '14 days',
    rug: tokens.pokecoin,
    artist: artists.trippynazz,
    stakingToken: '0xf4501172Ef96BE446C8E49dA44849eDa629F7b7e',
    pcsVersion: 'v2',
    liquidityDetails: '',
    isFeatured: true,
    rarity: "Uncommon",
    userInfo: { ...userInfo },
    poolInfo: { ...poolInfo },
  },
  {
    pid: {
      56: 35,
      97: 1,
    },
    name: 'SaveTheKids Uncommon',
    subtitle: 'Me and the Boys',
    path: 'https://ipfs.io/ipfs/QmXsUgHfVLhTyiSk4VPbcr6iacEEDwo8KXfsK8tN4QXW55',
    type: 'image',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '14 days',
    rug: tokens.kids,
    artist: artists.trippynazz,
    stakingToken: '0x07Efe491CaCa3dD7369F3832Cc6ef0fbd7B53A28',
    pcsVersion: 'v2',
    liquidityDetails: '',
    isFeatured: true,
    rarity: "Uncommon",
    userInfo: { ...userInfo },
    poolInfo: { ...poolInfo },
  },
  {
    pid: {
      56: 30,
      97: 1,
    },
    name: 'PokeCoin Common',
    subtitle: 'Zomball',
    path: 'https://ipfs.io/ipfs/QmYsk7hJcPAdvSEyQZd9aC3iWq1KCN6UHVsEGvbNifY5rn',
    type: 'image',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '7 days',
    rug: tokens.pokecoin,
    artist: artists.trippynazz,
    stakingToken: '0xC9b0e59BC061Ce842Abb4693cad10Be1b09E9196',
    pcsVersion: 'v2',
    liquidityDetails: '',
    isFeatured: true,
    rarity: "Common",
    userInfo: { ...userInfo },
    poolInfo: { ...poolInfo },
  },
  {
    pid: {
      56: 31,
      97: 1,
    },
    name: 'Zombie Farm Common',
    subtitle: 'Randall-Farm',
    path: 'https://ipfs.io/ipfs/QmVg8ZnNjqP2iXZLWuGACJ1aT9ehHkw8PuaJ4n8XtLccwn',
    type: 'image',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '7 days',
    rug: tokens.zombie_no_relation,
    artist: artists.trippynazz,
    stakingToken: '0xc21b06fcC8036f42aba8F44b72667B9cD85E8cD2',
    pcsVersion: 'v2',
    liquidityDetails: '',
    isFeatured: true,
    rarity: "Common",
    userInfo: { ...userInfo },
    poolInfo: { ...poolInfo },
  },
  {
    pid: {
      56: 33,
      97: 1,
    },
    name: 'LifeLine Token Common',
    subtitle: 'Jonathan',
    path: 'https://ipfs.io/ipfs/QmQ7C6m85qWCjBnMyMHeuhf8xgYwcKjzr2iihvgwi9Yk6T',
    type: 'image',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '7 days',
    rug: tokens.llt,
    artist: artists.trippynazz,
    stakingToken: '0x67a64D76592141B20A49fB79762E98bA52e99a6B',
    pcsVersion: 'v1',
    liquidityDetails: '',
    isFeatured: true,
    rarity: "Common",
    userInfo: { ...userInfo },
    poolInfo: { ...poolInfo },
  },
  {
    pid: {
      56: 32,
      97: 1,
    },
    name: 'Bullish Jackpot Token Common',
    subtitle: 'Feeling Lucky',
    path: 'https://ipfs.io/ipfs/QmNqPjeXyruC29UdbQWF3dcWdZFZyv4E5BoTKs9aqmTCEo',
    type: 'image',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '7 days',
    rug: tokens.bjt,
    artist: artists.trippynazz,
    stakingToken: '0x651d914f7e5dbBBC6c968A4C822b319b10054747',
    pcsVersion: 'v2',
    liquidityDetails: '',
    additionalDetails: [
      {
        name: 'SPONSORED BY MAIN ST.',
        url: tokens.mainst.projectLink,
      },
    ],
    isFeatured: true,
    rarity: "Common",
    userInfo: { ...userInfo },
    poolInfo: { ...poolInfo },
  },
  {
    pid: {
      56: 26,
      97: 1,
    },
    name: 'Pantherswap Legendary',
    subtitle: 'The Killmonger',
    path: "images/rugZombie/The Killmonger min.jpeg",
    type: 'image',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '30 days',
    rug: tokens.panther,
    artist: artists.eyes_of_lamia,
    stakingToken: '0x0c6BE9c0c47d533be7e417E08b870935814c7dB8',
    pcsVersion: 'v2',
    liquidityDetails: '',
    isFeatured: true,
    isClosed: true,
    isEnding: true,
    endDate: 1637750171,
    rarity: "Legendary",
    userInfo: { ...userInfo },
    poolInfo: { ...poolInfo },
  },
  {
    pid: {
      56: 28,
      97: 1,
    },
    name: 'Bonfire Rare',
    subtitle: 'The Chosen',
    path: 'https://ipfs.io/ipfs/Qmet1ztQoPXekbc8AK3VkxJK62CAQJC35weUKM6iz4Mn8s',
    type: 'image',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '30 days',
    rug: tokens.bonfire,
    artist: artists.xvni,
    stakingToken: '0x58a7AE39deeAb5e7ad10EC9E9e575ab6b466ec6d',
    pcsVersion: 'v1',
    liquidityDetails: '',
    isFeatured: true,
    rarity: "Rare",
    userInfo: { ...userInfo },
    poolInfo: { ...poolInfo },
  },
  {
    pid: {
      56: 19,
      97: 1,
    },
    name: 'Emperor Token Rare',
    subtitle: 'Young Fool',
    path: 'https://storage.googleapis.com/rug-zombie/Young%20Fool.jpeg',
    type: 'image',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '30 days',
    rug: tokens.zmpr,
    artist: artists.jussjoshinduh,
    stakingToken: '0x62debcB9f311a170BfbDA089465085DA551B42d2',
    pcsVersion: 'none',
    liquidityDetails: 'None! The ZMPR token was airdropped to EMPR holders so you will have to ask around the telegram.',
    isEnding: false,
    isFeatured: true,
    rarity: "Rare",
    userInfo: { ...userInfo },
    poolInfo: { ...poolInfo },
  },
  {
    pid: {
      56: 21,
      97: 1,
    },
    name: 'Hyrule Swap Rare',
    subtitle: 'GlitchLink',
    path: 'https://storage.googleapis.com/rug-zombie/GlitchLink.webm',
    type: 'video',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '30 days',
    rug: tokens.grupee,
    artist: artists.none,
    stakingToken: '0x28E0c9aD40b658feDF239C442D2773E9dAb9a4f2',
    pcsVersion: 'Apeswap',
    liquidityDetails: '',
    isEnding: false,
    isFeatured: true,
    rarity: "Rare",
    userInfo: { ...userInfo },
    poolInfo: { ...poolInfo },
  },
  {
    pid: {
      56: 20,
      97: 1,
    },
    name: 'Hyrule Swap Uncommon',
    subtitle: 'Rugian Shield',
    path: 'https://storage.googleapis.com/rug-zombie/Rugian%20Shield.png',
    type: 'image',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '14 days',
    rug: tokens.rupee,
    artist: artists.none,
    stakingToken: '0xF83be0fb848CC0907858Db8B3f5CF88580c0C70e',
    pcsVersion: 'Apeswap',
    liquidityDetails: '',
    isEnding: false,
    isFeatured: true,
    rarity: "Uncommon",
    userInfo: { ...userInfo },
    poolInfo: { ...poolInfo },
  },
  {
    pid: {
      56: 1,
      97: 1,
    },
    name: 'VikingSwap Rare',
    subtitle: 'Viking Brains',
    path: 'images/rugZombie/VikingBrains.jpeg',
    type: 'image',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '30 days',
    rug: tokens.viking,
    artist: artists.TheLeap3d,
    stakingToken: '0x909e59fFFcF1481Df184831eEea6680Cd437A340',
    pcsVersion: 'v1',
    liquidityDetails: '',
    isNew: false,
    isEnding: false,
    isFeatured: false,
    rarity: "Rare",
    userInfo: { ...userInfo },
    poolInfo: { ...poolInfo },
  },
  {
    pid: {
      56: 2,
      97: 1,
    },
    name: 'MonsterSlayer Rare',
    subtitle: 'ZombieSlayer',
    path: 'images/rugZombie/ZombieSlayer.gif',
    type: 'image',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '30 days',
    rug: tokens.msc,
    artist: artists.ZomBaes,
    stakingToken: '0xD4Ced04fB7129CDB43ffef1cf3DE3Ac701c6cE33',
    pcsVersion: 'v1',
    liquidityDetails: '',
    isNew: false,
    isEnding: false,
    rarity: "Rare",
    userInfo: { ...userInfo },
    poolInfo: { ...poolInfo },
  },
  {
    pid: {
      56: 18,
      97: 1,
    },
    name: 'Thunderswap Rare',
    subtitle: 'Electric Zombie',
    path: 'images/rugZombie/Electric Zombie.png',
    type: 'image',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '30 days',
    rug: tokens.tndr,
    artist: artists.TheLeap3d,
    stakingToken: '0xdab566c6E63b06D641ABdCCaC4c6941C645812BD',
    pcsVersion: 'v1',
    liquidityDetails: '',
    isNew: false,
    isEnding: false,
    isFeatured: true,
    rarity: "Rare",
    userInfo: { ...userInfo },
    poolInfo: { ...poolInfo },
  },
  {
    pid: {
      56: 12,
      97: 1,
    },
    name: 'Autoshark Legendary',
    subtitle: 'Chompers',
    path: 'images/rugZombie/Chompers.webm',
    type: 'video',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '30 days',
    rug: tokens.zshark,
    artist: artists.deadtunnelrat,
    stakingToken: '0x8fab22cB7C58b193Fd498ed0EF3B574d70E4f759',
    pcsVersion: 'none',
    liquidityDetails: 'None! This grave is exclusive for victims of the flash loan attack on autoshark.',
    isNew: false,
    isEnding: true,
    isClosed: true,
    isRetired: true,
    endDate: 1630900799,
    latestEntryDate: "Aug. 4th, 2021",
    rarity: "Legendary",
    userInfo: { ...userInfo },
    poolInfo: { ...poolInfo },
  },
  {
    pid: {
      56: 15,
      97: 1,
    },
    name: 'RUGBIDEN Rare',
    subtitle: 'Zombiden',
    path: 'https://storage.googleapis.com/rug-zombie/RUGBIDEN.webm',
    type: 'video',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '30 days',
    rug: tokens.rugbiden,
    artist: artists.ZomBaes,
    stakingToken: '0xF462EFC96E47d6Fa2b03e1f8757aA38FeAa9aC3d',
    pcsVersion: 'v1',
    liquidityDetails: '',
    isNew: false,
    isEnding: false,
    rarity: "Rare",
    userInfo: { ...userInfo },
    poolInfo: { ...poolInfo },
  },
  {
    pid: {
      56: 16,
      97: 1,
    },
    name: 'Burger Swap Rare',
    subtitle: 'Zomburger',
    path: 'images/rugZombie/Zomburger.jpeg',
    type: 'image',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '30 days',
    rug: tokens.burger,
    artist: artists.jussjoshinduh,
    stakingToken: '0x6351b17cecb2A143c72Af9AF8075667Aa6A139F6',
    pcsVersion: 'v1',
    liquidityDetails: '',
    isNew: false,
    isEnding: false,
    rarity: "Rare",
    userInfo: { ...userInfo },
    poolInfo: { ...poolInfo },
  },
  {
    pid: {
      56: 13,
      97: 1,
    },
    name: 'The US Dollar Rare',
    subtitle: 'DeadDollar',
    path: 'images/rugZombie/DeadDollar.png',
    type: 'image',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '30 days',
    rug: tokens.busd,
    artist: artists.TheLeap3d,
    stakingToken: '0xB95B670b9Cd0Da6D9C65dab68c41c394633410b4',
    pcsVersion: 'v2',
    liquidityDetails: '',
    isNew: false,
    isEnding: false,
    rarity: "Rare",
    userInfo: { ...userInfo },
    poolInfo: { ...poolInfo },
  },
  {
    pid: {
      56: 3,
      97: 1,
    },
    name: 'Defi100 Rare',
    subtitle: 'Zombie100',
    path: 'images/rugZombie/Zombie100.gif',
    type: 'image',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '30 days',
    rug: tokens.d100,
    artist: artists.ZomBaes,
    stakingToken: '0xfB33d25b41F1b0fa95AEa52486C3F05f2aDEE396',
    pcsVersion: 'v1',
    liquidityDetails: '',
    isNew: false,
    isEnding: false,
    rarity: "Rare",
    userInfo: { ...userInfo },
    poolInfo: { ...poolInfo },
  },
  {
    pid: {
      56: 10,
      97: 1,
    },
    name: 'Merlin Lab Rare',
    subtitle: 'My name is MERL',
    path: 'images/rugZombie/My Name Is MERL.png',
    type: 'image',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '30 days',
    rug: tokens.merl,
    artist: artists.none,
    pcsVersion: 'v2',
    stakingToken: '0xD1e00C08E938B808F2d65dd108aE50948a9Ca1b4',
    liquidityDetails: '',
    isNew: false,
    isEnding: false,
    rarity: "Rare",
    userInfo: { ...userInfo },
    poolInfo: { ...poolInfo },
  },
  {
    pid: {
      56: 4,
      97: 1,
    },
    name: 'Fairmoon Rare',
    subtitle: 'Raremoon',
    path: 'images/rugZombie/Raremoon.jpeg',
    type: 'image',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '30 days',
    rug: tokens.fairmoon,
    artist: artists.TheLeap3d,
    stakingToken: '0x26dF9e0fbd5624941767516BbF218554CfA3A110',
    pcsVersion: 'v1',
    liquidityDetails: '',
    isNew: false,
    isEnding: false,
    rarity: "Rare",
    userInfo: { ...userInfo },
    poolInfo: { ...poolInfo },
  },
  {
    pid: {
      56: 14,
      97: 1,
    },
    name: 'Uranium Finance Uncommon',
    subtitle: 'The Rad Chad',
    path: 'images/rugZombie/The Rad Chad.png',
    type: 'image',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '14 days',
    rug: tokens.u92,
    artist: artists.jussjoshinduh,
    pcsVersion: 'v2',
    stakingToken: '0xB0CEA8C1AaA7a62de12BC5c15f0de1694ED9fab7',
    liquidityDetails: '',
    isNew: false,
    isEnding: false,
    rarity: "Uncommon",
    userInfo: { ...userInfo },
    poolInfo: { ...poolInfo },
  },
  {
    pid: {
      56: 5,
      97: 1,
    },
    name: 'Fairmoon Uncommon',
    subtitle: 'Zombie on the Moon',
    path: 'images/rugZombie/FairmoonUncommon.webm',
    type: 'video',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '14 days',
    rug: tokens.fairmoon,
    artist: artists.none,
    pcsVersion: 'v1',
    stakingToken: '0x645ad805c464133Eba5c4152Ce14547a01F821f7',
    liquidityDetails: '',
    isNew: false,
    isEnding: false,
    rarity: "Uncommon",
    userInfo: { ...userInfo },
    poolInfo: { ...poolInfo },
  },
  {
    pid: {
      56: 25,
      97: 1,
    },
    name: 'Kitty Cake Common',
    subtitle: 'Meowser',
    path: 'https://ipfs.io/ipfs/QmeRBJF6shwm23FrvCQ3SU69wWFcN3kJXNqseTxCyvi3LN',
    type: 'image',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '7 days',
    rug: tokens.kcake,
    artist: artists.none,
    stakingToken: '0x183cc4571E6758b093fEf3760e4dbA2ba06dAA13',
    pcsVersion: 'v2',
    liquidityDetails: '',
    isEnding: false,
    isFeatured: true,
    rarity: "Common",
    userInfo: { ...userInfo },
    poolInfo: { ...poolInfo },
  },
  {
    pid: {
      56: 6,
      97: 1,
    },
    name: 'Fairmoon Common',
    subtitle: 'Fairmoon Common',
    path: 'images/rugZombie/FairmoonCommon.webm',
    type: 'video',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '7 days',
    rug: tokens.fairmoon,
    artist: artists.none,
    pcsVersion: 'v1',
    stakingToken: '0x02F6DE73919aE9d43A1E0520dBCBF81bCda5B514',
    liquidityDetails: '',
    isNew: false,
    isEnding: false,
    rarity: "Common",
    userInfo: { ...userInfo },
    poolInfo: { ...poolInfo },
  },
  {
    pid: {
      56: 7,
      97: 1,
    },
    name: 'Gorilla Yield Common',
    subtitle: 'Gorilla Yield Common',
    path: 'images/rugZombie/yApeCommon.jpeg',
    type: 'image',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '7 days',
    rug: tokens.yape,
    artist: artists.none,
    pcsVersion: 'v1',
    stakingToken: '0x9EbD27Bd3957F13f8E7fef988E96B8EE1998bc80',
    liquidityDetails: '',
    isNew: false,
    isEnding: false,
    rarity: "Common",
    userInfo: { ...userInfo },
    poolInfo: { ...poolInfo },
  },
  {
    pid: {
      56: 8,
      97: 1,
    },
    name: 'Dragon Farm Finance Common',
    subtitle: 'Dragon Farm Finance Common',
    path: 'images/rugZombie/CommonDragonFarmFinance.webm',
    type: 'video',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '7 days',
    rug: tokens.dragon,
    artist: artists.none,
    pcsVersion: 'v1',
    stakingToken: '0x634A554d2FF1609d50740240140B452dF60D035c',
    liquidityDetails: '',
    isNew: false,
    isEnding: false,
    rarity: "Common",
    userInfo: { ...userInfo },
    poolInfo: { ...poolInfo },
  },
  {
    pid: {
      56: 9,
      97: 1,
    },
    name: 'yPanda Common',
    subtitle: 'yPanda Common',
    path: 'images/rugZombie/yPandaCommon.jpeg',
    type: 'image',
    withdrawalCooldown: '3 days',
    nftRevivalTime: '7 days',
    rug: tokens.ypanda,
    artist: artists.none,
    pcsVersion: 'v1',
    stakingToken: '0xFceB2967AB8EcC29589E9232f78f8441832d2aD6',
    liquidityDetails: '',
    isNew: false,
    isEnding: false,
    isClosed: false,
    rarity: "Common",
    userInfo: { ...userInfo },
    poolInfo: { ...poolInfo },
  },
]

export default graves
