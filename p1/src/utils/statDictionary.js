export const statDict = {
  attackDamage: {
    text: '공격력',
    prefixes: ["헤라클레스의", "시련을 극복한", "결의의", "용맹한", "전투"],
    minValue: 3,
    maxValue: 15,
    sizeUnderFloat: 0,
  },
  maxHealth: {
    text: '최대 HP',
    prefixes: ["포세이돈의", "심해 아래", "바다의", "포용하는", "호신"],
    minValue: 5,
    maxValue: 25,
    sizeUnderFloat: 0,
  },
  attackSpeed: {
    text: '공격속도',
    prefixes: ["헤르메스의", "돌풍을 업은", "신속의", "날렵한", "경량화"],
    minValue: 0.04,
    maxValue: 0.2,
    sizeUnderFloat: 2,
  },
  criticalChance: {
    text: '치명타 확률(%)',
    prefixes: ["아프로디테의", "고혹적인", "매혹의", "치명적인", "가시"],
    minValue: 2,
    maxValue: 10,
    sizeUnderFloat: 0,
  },
  criticalDamage: {
    text: '치명타 피해 증가(%)',
    prefixes: ["아레스의", "광기에 물든", "살육의", "잔인한", "전쟁"],
    minValue: 4,
    maxValue: 20,
    sizeUnderFloat: 0,
  },
  flatArmor: {
    text: '고정 피해 감소',
    prefixes: ["헤파이스토스의", "벼려진", "불굴의", "강인한", "강철"],
    minValue: 1,
    maxValue: 8,
    sizeUnderFloat: 0,
  },
  leech: {
    text: '흡혈(%)',
    prefixes: ["백작의", "갈망하는", "흡혈의", "목마른", "혈석"],
    minValue: 1.2,
    maxValue: 6,
    sizeUnderFloat: 1,
  },
  goldBonus: {
    text: '처치 시 골드',
    prefixes: ["미다스의", "사치스러운", "욕망의", "화려한", "황금"],
    minValue: 1,
    maxValue: 10,
    sizeUnderFloat: 0,
  },
  expBonus: {
    text: '처치 시 경험치',
    prefixes: ["아테나의", "자애로운", "통찰의", "지혜로운", "비취"],
    minValue: 1,
    maxValue: 10,
    sizeUnderFloat: 0,
  },
  // 경험치 %로 전환, 투구 기본옵
  battleCry: {
    text: '첫 공격 강화(%)',
    prefixes: ["제우스의", "번개같은", "찰나의", "맹렬한", "돌격"],
    minValue: 4,
    maxValue: 20,
    sizeUnderFloat: 0,
  },
  regeneration: {
    text: '초당 회복량',
    prefixes: ["위그드라실의", "뿌리 내린", "신록의", "살아숨쉬는", "생목"],
    minValue: 2,
    maxValue: 10,
    sizeUnderFloat: 2,
  },
  dodge: {
    text: '회피율(%)',
    prefixes: ["하데스의", "어둠이 드리운", "밤의", "고요한", "흑요석"],
    minValue: 4,
    maxValue: 8,
    sizeUnderFloat: 2,
  }
  // percentArmor: {
  //   text: '방어구',
  //   prefixes: ["Sharpened", "Deadly", "Precise", "Lethal", "Fatal"],
  //   minValue: 4,
  //   maxValue: 20,
  //   sizeUnderFloat: 1,
  // },
  // 강화 +1
  // 처치 시 회복

};