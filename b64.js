const Index = (() => {
  const a = []

  for (let i = 0; i < 64; i++) {
    if (i < 26) {
      a.push(String.fromCharCode('A'.charCodeAt() + i))
    } else if (i < 52) {
      a.push(String.fromCharCode('a'.charCodeAt() + i - 26))
    } else if (i < 62) {
      a.push(String.fromCharCode('0'.charCodeAt() + i - 52))
    } else if (i === 62) {
      a.push('+')
    } else {
      a.push('/')
    }
  }

  return a
})()

const Reverse = (() => {
  const a = {}

  for (let i = 0; i < 64; i++) {
    a[Index[i]] = i
  }

  return a
})()

const str2b64 = (str) => {
  let out = ""
  let i = 0
  let length = str.length

  while (i < length) {
    let c1 = str.charCodeAt(i++) & 0xff;

    out += Index[c1 >> 2]
    if (i === length) {
      out += Index[(c1 & 0x3) << 4]
      out += '=='
      break
    }

    let c2 = str.charCodeAt(i++) & 0xff;

    out += Index[(c1 & 0x3) << 4 | (c2 & 0xf0) >> 4]
    if (i === length) {
      out += Index[(c2 & 0xf) << 2]
      out += '='
      break
    }

    let c3 = str.charCodeAt(i++);
    out += Index[(c2 & 0xf) << 2 | (c3 & 0xC0) >> 6]
    out += Index[c3 & 0x3f]
  }

  return out
}
