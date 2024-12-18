export const potions = [
  {
      itemType: 'potion',
      itemName: '소형 포션',
      rarity: 'uncommon',
      itemLevel: 10,
      refined: 0,
      mainValue: 10,
      statTexts: ['소모품', '구매 즉시 체력 회복 +10'],
      statRarities: ['common', 'uncommon'],
      options: {}
  },
  {
      itemType: 'potion',
      itemName: '중형 포션',
      rarity: 'rare',
      itemLevel: 75,
      refined: 0,
      mainValue: 100,
      statTexts: ['소모품', '구매 즉시 체력 회복 +100'],
      statRarities: ['common', 'rare'],
      options: {}
  },
  {
      itemType: 'potion',
      itemName: '대형 포션',
      rarity: 'epic',
      itemLevel: 500,
      refined: 0,
      mainValue: 1000,
      statTexts: ['소모품', '구매 즉시 체력 회복 +1000'],
      statRarities: ['common', 'epic'],
      options: {}
  },
]

export const autoItems = [
    {
        itemType: 'auto',
        itemName: '일반 장비 자동 판매',
        rarity: 'common',
        itemLevel: 1000,
        refined: 0,
        mainValue: 0,
        statTexts: ['소모품', '구매 이후 일반 등급 자동 판매'],
        statRarities: ['common', 'common'],
        options: {}
    },
    {
        itemType: 'auto',
        itemName: '고급 장비 자동 판매',
        rarity: 'uncommon',
        itemLevel: 10000,
        refined: 0,
        mainValue: 0,
        statTexts: ['소모품', '구매 이후 고급 등급 자동 판매'],
        statRarities: ['common', 'uncommon'],
        options: {}
    },
    {
        itemType: 'auto',
        itemName: '희귀 장비 자동 판매',
        rarity: 'rare',
        itemLevel: 100000,
        refined: 0,
        mainValue: 0,
        statTexts: ['소모품', '구매 이후 희귀 등급 자동 판매'],
        statRarities: ['common', 'rare'],
        options: {}
    },
]