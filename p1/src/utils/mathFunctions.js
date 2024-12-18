export function generateTripleRatio() {
  const a = Math.random();
  const b = Math.random();
  const c = Math.random();

  const sum = a + b + c;

  return [a / sum, b / sum, c / sum];
}

export function goodRound(number, pow) {
  return Math.round(number * (10 ** pow)) / (10 ** pow);
}