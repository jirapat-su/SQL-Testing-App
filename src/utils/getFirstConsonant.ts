const getFirstConsonant = (name?: string) => {
  if (!name) return ''

  const thaiConsonants = /[\u0E01-\u0E2E]/
  const englishLetters = /[a-z]/i

  for (const char of name) {
    if (thaiConsonants.test(char) || englishLetters.test(char)) {
      return char.toUpperCase()
    }
  }

  return name.charAt(0).toUpperCase()
}

export { getFirstConsonant }
