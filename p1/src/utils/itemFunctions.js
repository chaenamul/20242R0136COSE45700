import { statDict } from '../utils/statDictionary';
import { goodRound } from './mathFunctions';

export const rarityText = {
  common: '일반',
  uncommon: '고급',
  rare: '희귀',
  epic: '영웅',
  mythic: '전설'
}

export const rarityIndex = {
  common: 0,
  uncommon: 1,
  rare: 2,
  epic: 3,
  mythic: 4
}

export const indexToRarity = Object.fromEntries(
  Object.entries(rarityIndex).map(([key, value]) => [value, key])
);

export const rarityColors = {
  common: '#ffffff',
  uncommon: '#1eff00',
  rare: '#368aff',
  epic: '#e822ff',
  mythic: '#ff8000'
};

export const itemTypeIndex = {
  sword: 0,
  helmet: 1,
  breastplate: 2,
  leggings: 3,
  gloves: 4,
  boots: 5
};

export const indexToItemType = Object.fromEntries(
  Object.entries(itemTypeIndex).map(([key, value]) => [value, key])
);

const rarityMultiplier = {
  common: 0.75,
  uncommon: 1,
  rare: 1.25,
  epic: 1.8,
  mythic: 2.5
}

export function createItemData(rarity, level) {
  const itemType = indexToItemType[Math.floor(Math.random() * 6)];
  const mainValue = Math.round((level * (5 + 2 * Math.random())) * rarityMultiplier[rarity]);

  const itemData = {
    itemType: itemType,
    itemName: '',
    rarity: rarity,
    itemLevel: level,
    refined: 0,
    mainValue: mainValue,
    statTexts: [],
    statRarities: ['common'],
    options: {}
  };
  if (itemType == 'sword') {
    itemData['itemName'] = '검';
    itemData.statTexts.push(`공격력 +${mainValue}`);
  } else if (itemType == 'helmet') {
    itemData['itemName'] = '투구'
    itemData.statTexts.push(`최대 HP +${mainValue}`);
  } else if (itemType == 'breastplate') {
    itemData['itemName'] = '흉갑'
    itemData.statTexts.push(`최대 HP +${mainValue}`);
  } else if (itemType == 'leggings') {
    itemData['itemName'] = '레깅스'
    itemData.statTexts.push(`최대 HP +${mainValue}`);
  } else if (itemType == 'gloves') {
    itemData['itemName'] = '장갑'
    itemData.statTexts.push(`최대 HP +${mainValue}`);
  } else if (itemType == 'boots') {
    itemData['itemName'] = '부츠'
    itemData.statTexts.push(`최대 HP +${mainValue}`);
  }

  let optionNumber = 0;
  const randomValue = Math.random();
  switch (rarity) {
    case 'common':
      optionNumber = Math.round(randomValue);
      break;
    case 'uncommon':
      optionNumber = Math.floor(randomValue + 1.2);
      break;
    case 'rare':
      optionNumber = Math.floor(randomValue + 1.7);
      break;
    case 'epic':
      optionNumber = Math.floor(randomValue + 2.7);
      break;
    case 'mythic':
      optionNumber = Math.floor(randomValue + 4.2); // up to 5
      break;
    default:
      optionNumber = Math.round(randomValue);
  }

  for (let i = 0; i < optionNumber; i++) {
    const { prefix, statText, statRarity, ...randomOption } = createRandomOption(i, rarity);
  
    for (const [key, value] of Object.entries(randomOption)) {
      itemData.options[key] = (itemData.options[key] || 0) + value;
    }
  
    if (i == 0) {
      itemData.itemName = prefix + itemData.itemName;
    } else {
      itemData.itemName = prefix + ' ' + itemData.itemName;
    }

    itemData.statTexts.push(statText);
    itemData.statRarities.push(statRarity);
  }

  return itemData;
}

function createRandomOption(prefixIndex, rarity) {
  const statKeys = Object.keys(statDict);
  const randomStatKey = statKeys[Math.floor(Math.random() * statKeys.length)];
  const statData = statDict[randomStatKey];
  const statValue = goodRound(rarityMultiplier[rarity] * (
    statData.minValue + (Math.random() * (statData.maxValue - statData.minValue))
  ), statData.sizeUnderFloat);
  const statText = `${statData.text} +${statValue}`

  const statLimit = statData.maxValue * rarityMultiplier['mythic']
  let statRarity = 'common';
  if (statValue < statLimit / 5) {
    statRarity = 'common';
  } else if (statValue < statLimit * 2 / 5) {
    statRarity = 'uncommon';
  } else if (statValue < statLimit * 3 / 5) {
    statRarity = 'rare';
  } else if (statValue < statLimit * 4 / 5) {
    statRarity = 'epic';
  } else {
    statRarity = 'mythic';
  }

  const selectedPrefix = statData.prefixes[4 - prefixIndex];
  return {
    [randomStatKey]: statValue,
    prefix: selectedPrefix,
    statText: statText,
    statRarity: statRarity
  };
}

export function refineItem(item) {
  const newItem = item;
  // const upgradeValue = goodRound(100 + Math.round(((4.5 + Math.random()) / 2) * rarityMultiplier[item.rarity]), 2);
  const upgradeValue = goodRound(100 + Math.round(2 * rarityMultiplier[item.rarity]), 2);
  const mainColor = '#ff' + Math.max(15 - item.refined, 0).toString(16).repeat(4);
  newItem.refined++;
  console.log(upgradeValue);
  newItem.mainValue = Math.ceil(item.mainValue * upgradeValue / 100);
  newItem.statTexts[0] = item.statTexts[0].replace(/(\+\d+)/, `+${newItem.mainValue}`);
  newItem.statRarities[0] = mainColor;
  // console.log(newItem);
  return newItem;
}

// sample item
      // leggings: {
      //   itemType: 'leggings',
      //   itemName: '레깅스',
      //   rarity: 'common',
      //   itemLevel: 1,
      //   refined: 0,
      //   mainValue: 5,
      //   statTexts: ['최대 HP +5'],
      //   statRarities: ['common'],
      //   options: {}
      // },