export const objectIsEmpty = (obj) => {
    return Object.keys(obj).length === 0
}

export const dec2hex = (dec) => {
    return dec.toString(16).padStart(2, "0")
}

export const generateId = (len) => {
    var arr = new Uint8Array((len || 40) / 2)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, dec2hex).join('')
}