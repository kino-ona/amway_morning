import { LoginRes } from '~/apis/model/userModel'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '~/utils/constants/auth'

function getLoginRes(): Nullable<Pick<LoginRes, 'token' | 'type'>> {
  const token = getWithExpiry<string>(ACCESS_TOKEN_KEY)
  if (token) {
    return JSON.parse(token) as Pick<LoginRes, 'token' | 'type'>
  }

  return null
}

export function getToken(): Nullable<string> {
  const login = getLoginRes()
  if (login) {
    return login.token
  }
  return null
}

export function getTokenType(): Nullable<string> {
  const login = getLoginRes()
  if (login) {
    return login.type
  }
  return null
}

export function setToken({ token, type }: Pick<LoginRes, 'token' | 'type'>, expire = 3600): void {
  return setWithExpiry(ACCESS_TOKEN_KEY, JSON.stringify({ token, type }), expire)
}

export function removeToken(): void {
  return localStorage.removeItem(ACCESS_TOKEN_KEY)
}

export function setRefreshToken(token: string, expire = 3600 * 24): void {
  return setWithExpiry(REFRESH_TOKEN_KEY, token, expire)
}

export function getRefreshToken(): Nullable<string> {
  return getWithExpiry(REFRESH_TOKEN_KEY)
}

export function removeRefreshToken(): void {
  return localStorage.removeItem(REFRESH_TOKEN_KEY)
}

function setWithExpiry(key: string, value: unknown, expire: number): void {
  const now = new Date()

  // `item` is an object which contains the original value
  // as well as the time when it's supposed to expire
  const item = {
    value: value,
    expiry: now.getTime() + expire * 1000,
  }
  localStorage.setItem(key, JSON.stringify(item))
}

function getWithExpiry<T>(key: string): Nullable<T> {
  const itemStr = localStorage.getItem(key)
  // if the item doesn't exist, return null
  if (!itemStr) {
    return null
  }
  const item = JSON.parse(itemStr)
  const now = new Date()
  // compare the expiry time of the item with the current time
  if (now.getTime() > item.expiry) {
    // If the item is expired, delete the item from storage
    // and return null
    localStorage.removeItem(key)
    return null
  }
  return item.value
}
