export const hasCoda = (syllable: string) => {
  const code = syllable.charCodeAt(0)
  if (code >= 0xAC00 && code < 0xD700) {
    return (code - 0xAC00) % 28 > 0
  }
  else {
    return false
  }
}

export const alignPostposition = (subjective: string, sentence: string) => {
  const coda = hasCoda(subjective[subjective.length - 1])
  const postposition = (() => {
    if (sentence[0] === "은") {
      return coda ? "은" : "는"
    }
    else if (sentence[0] === "이") {
      return coda ? "이" : "가"
    }
    else if (sentence[0] === "을") {
      return coda ? "을" : "를"
    }
  })()
  return postposition + sentence.slice(1)
}

export const getPortionPlan = (length: number) => {
  if (length % 3 === 0) {
    return [...Array(length).fill(3)]
  }
  else if (length % 3 === 1) {
    return [...Array(length - 4).fill(3), 2, 2, 2, 2]
  }
  else {
    return [...Array(length - 2).fill(3), 2, 2]
  }
}