// ============================================================
// VOID — Static data
// ============================================================

export const COLLECTION = {
  name: 'VOID GENESIS',
  symbol: 'VGEN',
  supply: 5000,
  minted: 4217,
  holders: 2841,
  floorPrice: '0.38',
  volumeTotal: '1,842',
  contractAddress: '0x4a3B8C7f2e9D1c6A0b5E8F3d7C2a1B9e4F6d0c8',
  deployBlock: 18_742_301,
  mintPrice: 0.08,
  maxPerWallet: 10,
}

export const NFTS = [
  { id: 1, name: 'Void Entity', seed: 'void-nft-1',   price: '0.52', rarity: 'Legendary', rank: 12 },
  { id: 2, name: 'Null Vector', seed: 'void-nft-2',   price: '0.38', rarity: 'Epic',      rank: 87 },
  { id: 3, name: 'Phantom Core',seed: 'void-nft-3',   price: '0.22', rarity: 'Rare',      rank: 203 },
  { id: 4, name: 'Abyss Fragment',seed:'void-nft-4',  price: '0.12', rarity: 'Common',    rank: 1422 },
  { id: 5, name: 'Dark Matter',  seed: 'void-nft-5',  price: '0.61', rarity: 'Legendary', rank: 4 },
  { id: 6, name: 'Signal Ghost', seed: 'void-nft-6',  price: '0.44', rarity: 'Epic',      rank: 51 },
  { id: 7, name: 'Entropy Loop', seed: 'void-nft-7',  price: '0.18', rarity: 'Rare',      rank: 319 },
  { id: 8, name: 'Null State',   seed: 'void-nft-8',  price: '0.09', rarity: 'Common',    rank: 2187 },
  { id: 9, name: 'Void Wraith',  seed: 'void-nft-9',  price: '0.73', rarity: 'Legendary', rank: 7 },
  { id: 10, name: 'Zero Protocol',seed:'void-nft-10', price: '0.41', rarity: 'Epic',      rank: 73 },
  { id: 11, name: 'Static Echo', seed: 'void-nft-11', price: '0.16', rarity: 'Rare',      rank: 481 },
  { id: 12, name: 'Hex Specter', seed: 'void-nft-12', price: '0.08', rarity: 'Common',    rank: 3012 },
  { id: 13, name: 'Cipher Shade',seed: 'void-nft-13', price: '0.55', rarity: 'Legendary', rank: 19 },
  { id: 14, name: 'Phase Rift',  seed: 'void-nft-14', price: '0.33', rarity: 'Epic',      rank: 96 },
  { id: 15, name: 'Bit Revenant',seed: 'void-nft-15', price: '0.14', rarity: 'Rare',      rank: 566 },
  { id: 16, name: 'Lost Packet', seed: 'void-nft-16', price: '0.07', rarity: 'Common',    rank: 4100 },
]

export const NFT_TRAITS = {
  1:  [{ type:'Background',value:'Void Black',rarity:'3.2%'},{type:'Body',value:'Obsidian Armor',rarity:'1.8%'},{type:'Eyes',value:'Crimson Halo',rarity:'2.1%'},{type:'Aura',value:'Death Glow',rarity:'0.9%'},{type:'Accessory',value:'Skull Pendant',rarity:'1.2%'},{type:'Weapon',value:'Entropy Blade',rarity:'0.7%'}],
  2:  [{ type:'Background',value:'Deep Space',rarity:'8.4%'},{type:'Body',value:'Cyber Suit',rarity:'5.2%'},{type:'Eyes',value:'Violet Pulse',rarity:'4.3%'},{type:'Aura',value:'Static Field',rarity:'3.1%'},{type:'Accessory',value:'Data Chain',rarity:'6.2%'},{type:'Weapon',value:'Phase Blade',rarity:'3.8%'}],
  3:  [{ type:'Background',value:'Grid Fog',rarity:'12.1%'},{type:'Body',value:'Neon Shell',rarity:'9.7%'},{type:'Eyes',value:'Cyan Shard',rarity:'11.2%'},{type:'Aura',value:'Hex Mist',rarity:'8.9%'},{type:'Accessory',value:'Circuit Ring',rarity:'10.3%'},{type:'Weapon',value:'Signal Gun',rarity:'9.1%'}],
  4:  [{ type:'Background',value:'Grey Haze',rarity:'28.3%'},{type:'Body',value:'Default Shell',rarity:'31.2%'},{type:'Eyes',value:'White Orbs',rarity:'29.7%'},{type:'Aura',value:'None',rarity:'42.1%'},{type:'Accessory',value:'None',rarity:'51.2%'},{type:'Weapon',value:'None',rarity:'48.3%'}],
  5:  [{ type:'Background',value:'Singularity',rarity:'0.6%'},{type:'Body',value:'Dark Matter Form',rarity:'0.4%'},{type:'Eyes',value:'Event Horizon',rarity:'0.8%'},{type:'Aura',value:'Collapse Field',rarity:'0.3%'},{type:'Accessory',value:'Gravity Core',rarity:'0.5%'},{type:'Weapon',value:'Void Lance',rarity:'0.2%'}],
  6:  [{ type:'Background',value:'Neon Grid',rarity:'4.8%'},{type:'Body',value:'Ghost Form',rarity:'3.9%'},{type:'Eyes',value:'Green Haze',rarity:'5.1%'},{type:'Aura',value:'Signal Burst',rarity:'3.4%'},{type:'Accessory',value:'Tech Visor',rarity:'4.2%'},{type:'Weapon',value:'Arc Pistol',rarity:'3.7%'}],
  7:  [{ type:'Background',value:'Purple Haze',rarity:'10.2%'},{type:'Body',value:'Fractal Coat',rarity:'8.8%'},{type:'Eyes',value:'Loop Vision',rarity:'9.4%'},{type:'Aura',value:'Entropy Ring',rarity:'7.6%'},{type:'Accessory',value:'Null Charm',rarity:'11.1%'},{type:'Weapon',value:'Time Shard',rarity:'8.3%'}],
  8:  [{ type:'Background',value:'Static',rarity:'30.1%'},{type:'Body',value:'Base Form',rarity:'33.7%'},{type:'Eyes',value:'Grey Dots',rarity:'31.9%'},{type:'Aura',value:'None',rarity:'44.2%'},{type:'Accessory',value:'None',rarity:'53.8%'},{type:'Weapon',value:'None',rarity:'50.1%'}],
  9:  [{ type:'Background',value:'Wraith Realm',rarity:'0.8%'},{type:'Body',value:'Specter Frame',rarity:'0.6%'},{type:'Eyes',value:'Vortex Gaze',rarity:'1.1%'},{type:'Aura',value:'Soul Veil',rarity:'0.4%'},{type:'Accessory',value:'Bone Crown',rarity:'0.7%'},{type:'Weapon',value:'Reaper Staff',rarity:'0.3%'}],
  10: [{ type:'Background',value:'Binary Rain',rarity:'5.9%'},{type:'Body',value:'Protocol Suit',rarity:'4.7%'},{type:'Eyes',value:'Data Stream',rarity:'6.2%'},{type:'Aura',value:'Code Burst',rarity:'4.1%'},{type:'Accessory',value:'Zero Badge',rarity:'5.3%'},{type:'Weapon',value:'Logic Cannon',rarity:'4.8%'}],
  11: [{ type:'Background',value:'Interference',rarity:'11.4%'},{type:'Body',value:'Wave Shell',rarity:'9.2%'},{type:'Eyes',value:'Echo Lens',rarity:'10.8%'},{type:'Aura',value:'Static Ring',rarity:'8.3%'},{type:'Accessory',value:'Pulse Bead',rarity:'12.2%'},{type:'Weapon',value:'Waveform Axe',rarity:'9.7%'}],
  12: [{ type:'Background',value:'Dark Grey',rarity:'29.4%'},{type:'Body',value:'Hex Shell',rarity:'32.1%'},{type:'Eyes',value:'Yellow Dots',rarity:'28.7%'},{type:'Aura',value:'None',rarity:'41.3%'},{type:'Accessory',value:'None',rarity:'52.4%'},{type:'Weapon',value:'None',rarity:'49.7%'}],
  13: [{ type:'Background',value:'Cipher Space',rarity:'1.1%'},{type:'Body',value:'Shade Form',rarity:'0.9%'},{type:'Eyes',value:'Code Eyes',rarity:'1.4%'},{type:'Aura',value:'Encrypt Field',rarity:'0.7%'},{type:'Accessory',value:'Hash Pendant',rarity:'1.0%'},{type:'Weapon',value:'Cipher Key',rarity:'0.6%'}],
  14: [{ type:'Background',value:'Rift Space',rarity:'6.7%'},{type:'Body',value:'Phase Coat',rarity:'5.4%'},{type:'Eyes',value:'Rift Vision',rarity:'7.1%'},{type:'Aura',value:'Shift Ring',rarity:'4.9%'},{type:'Accessory',value:'Phase Shard',rarity:'5.8%'},{type:'Weapon',value:'Rift Blade',rarity:'5.2%'}],
  15: [{ type:'Background',value:'Dark Blue',rarity:'13.2%'},{type:'Body',value:'Revenant Form',rarity:'10.9%'},{type:'Eyes',value:'Bit Scan',rarity:'11.7%'},{type:'Aura',value:'Memory Leak',rarity:'9.1%'},{type:'Accessory',value:'Bit Ring',rarity:'12.8%'},{type:'Weapon',value:'Byte Cutter',rarity:'10.4%'}],
  16: [{ type:'Background',value:'Charcoal',rarity:'31.8%'},{type:'Body',value:'Lost Shell',rarity:'34.2%'},{type:'Eyes',value:'Blank Gaze',rarity:'30.4%'},{type:'Aura',value:'None',rarity:'43.7%'},{type:'Accessory',value:'None',rarity:'54.1%'},{type:'Weapon',value:'None',rarity:'51.3%'}],
}

export const ROADMAP = [
  {
    phase: 0,
    title: 'Genesis',
    quarter: 'Q1 2024',
    status: 'completed',
    goals: [
      'Core smart contract development & audit',
      'Brand identity and visual system creation',
      'Website & minting dApp launch',
      'Discord & Twitter community foundation',
      'Whitelist campaign — 10,000 applicants',
    ],
  },
  {
    phase: 1,
    title: 'Mint Event',
    quarter: 'Q2 2024',
    status: 'completed',
    goals: [
      'Public mint — 5,000 VOID GENESIS tokens',
      'Reveal mechanism — randomized metadata reveal',
      'Rarity ranking publication on Rarity.tools',
      'OpenSea & Blur listings with verified collection',
      '50 ETH raised for ecosystem development',
    ],
  },
  {
    phase: 2,
    title: 'Expansion',
    quarter: 'Q3 2024',
    status: 'active',
    goals: [
      'VOID DAO governance token airdrop to holders',
      'Staking platform — earn VOID tokens by holding',
      'Exclusive holder lounge in the metaverse',
      'Collaborative drops with 3 partner studios',
      'IRL event in Tokyo — VOID Convergence',
    ],
  },
  {
    phase: 3,
    title: 'VOID Ecosystem',
    quarter: 'Q4 2024',
    status: 'upcoming',
    goals: [
      'VOID Marketplace — 0% fee P2P trading',
      'Generative AI art studio for holders',
      'Cross-chain bridge to Polygon & Arbitrum',
      'VOID Academy — Web3 education platform',
      'Series A funding round — $8M target',
    ],
  },
  {
    phase: 4,
    title: 'VOID Genesis 2',
    quarter: 'Q1 2025',
    status: 'upcoming',
    goals: [
      'Second collection drop — 10,000 supply',
      'Holder-exclusive presale and migration bonuses',
      'Animated traits & interchangeable accessories',
      'Physical merchandise integration via NFC chips',
      'Global gallery tour — NYC, London, Seoul, Tokyo',
    ],
  },
]

export const TEAM = [
  {
    name: 'Sable Zero',
    role: 'Founder & Creative Director',
    bio: 'Former lead designer at Dapper Labs & ConsenSys. Built three top-50 NFT collections before founding VOID. Obsessed with the intersection of art, identity, and cryptographic ownership.',
    seed: 'void-team-1',
    socials: [{ label: '↗ Twitter', href: '#' }, { label: '↗ LinkedIn', href: '#' }],
  },
  {
    name: 'Nova Hex',
    role: 'Co-Founder & CTO',
    bio: '10 years in cryptography and distributed systems. Wrote zero-knowledge circuits for two L2 protocols. Architected the VOID smart contract suite from scratch with four professional audits.',
    seed: 'void-team-2',
    socials: [{ label: '↗ GitHub', href: '#' }, { label: '↗ Twitter', href: '#' }],
  },
  {
    name: 'Lyra Void',
    role: 'Lead Generative Artist',
    bio: 'Computational artist with exhibitions at Art Basel, Frieze, and NFT.NYC. Created all 5,000 VOID GENESIS artworks using a custom Python + Blender pipeline she developed over 18 months.',
    seed: 'void-team-3',
    socials: [{ label: '↗ Instagram', href: '#' }, { label: '↗ Foundation', href: '#' }],
  },
  {
    name: 'Dash Protocol',
    role: 'Head of Community',
    bio: 'Built the BAYC Discord from 0 to 200K members. Professional community architect with deep roots in crypto Twitter since 2017. Host of the weekly Void Sessions spaces show.',
    seed: 'void-team-4',
    socials: [{ label: '↗ Twitter', href: '#' }, { label: '↗ Discord', href: '#' }],
  },
  {
    name: 'Echo Market',
    role: 'Head of Partnerships',
    bio: 'Former Goldman Sachs associate turned Web3 dealmaker. Closed $22M in partnership deals across DeFi, GameFi, and metaverse projects. Negotiated the VOID × Adidas collab.',
    seed: 'void-team-5',
    socials: [{ label: '↗ LinkedIn', href: '#' }, { label: '↗ Twitter', href: '#' }],
  },
  {
    name: 'Glitch Byte',
    role: 'Smart Contract Engineer',
    bio: 'Solidity developer with 6 years on-chain. Authored the VOID staking contracts, the DAO governance module, and the custom ERC-721A extension that saved holders $400K in gas fees.',
    seed: 'void-team-6',
    socials: [{ label: '↗ GitHub', href: '#' }, { label: '↗ Twitter', href: '#' }],
  },
]

export const PARTNERS = [
  { name: 'OpenSea',    type: 'Marketplace' },
  { name: 'Chainlink',  type: 'Oracle' },
  { name: 'Alchemy',    type: 'Infrastructure' },
  { name: 'Ledger',     type: 'Hardware Wallet' },
  { name: 'Dune',       type: 'Analytics' },
  { name: 'Gitcoin',    type: 'Public Goods' },
  { name: 'Arbitrum',   type: 'L2 Partner' },
]

export const AS_SEEN = ['NFT.NYC', 'CoinDesk', 'Decrypt', 'The Block', 'Bankless', 'Defiant']
