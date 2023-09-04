
function generateRandomLetters() {
  const letters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
    'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  let randomLetters = ''
  const len = 5
  for (let i = 1; i <= len; i++) {
    randomLetters += letters[Math.round(Math.random() * (letters.length - 1))]
  }
  //以下為確認至少有一個數字
  const num = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  let sw = 0
  for (let i in randomLetters) {
    if (num.includes(randomLetters[i])) {
      sw = 1
    }
  }
  if (!sw) {
    const randomNum = num[Math.round(Math.random() * (num.length - 1))]
    randomLetters = randomLetters.replace(randomLetters[Math.round(Math.random() * (randomLetters.length - 1))], randomNum)
  }
  return randomLetters
}

module.exports = generateRandomLetters

