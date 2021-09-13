export const dec2hex = (dec) => {
    return dec.toString(16).padStart(2, "0")
}

export const generateId = (len) => {
    var arr = new Uint8Array((len || 8) / 2)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, dec2hex).join('')
}
