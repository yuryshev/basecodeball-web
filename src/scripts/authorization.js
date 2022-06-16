export function setWithExpiry(key, value, ttl) {
    const now = new Date()

    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = {
        value: value,
        expiry: now.getTime() + ttl,
    }
    window.localStorage.setItem(key, JSON.stringify(item))
}

export function getWithExpiry(key) {
    const itemStr = window.localStorage.getItem(key)
    // if the item doesn't exist, return null
    if (!itemStr) {
        return null
    }
    const item = JSON.parse(itemStr)
    const now = new Date()
    if (now.getTime() > item.expiry) {
        
        // If the item is expired, delete the item from storage
        // and return null
        window.localStorage.removeItem(key)
        return null
    }
    return item.value
}

export function is_authorize(){
    return getWithExpiry('access_token') != null
}