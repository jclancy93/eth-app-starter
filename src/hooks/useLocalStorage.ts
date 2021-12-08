import { useEffect, useState } from 'react'

function getItem(key: string) {
  if (typeof window === 'undefined') {
    return null
  }

  const item = window.localStorage.getItem(key)
  if (item !== null) {
    try {
      return JSON.parse(item)
    } catch {
      // ignore error
    }
  }
}

function setItem(key: string, value: any) {
  if (value === undefined) {
    window.localStorage.removeItem(key)
  } else {
    const toStore = JSON.stringify(value)
    window.localStorage.setItem(key, toStore)
    return JSON.parse(toStore)
  }
}

export function useLocalStorage() {
  const TRANSACTION_KEY = 'transactions'
  const [value, setValue] = useState(() => getItem(TRANSACTION_KEY))

  useEffect(() => {
    setValue(getItem(TRANSACTION_KEY))
  }, [TRANSACTION_KEY])

  useEffect(() => {
    setItem(TRANSACTION_KEY, value)
  }, [value, TRANSACTION_KEY])

  return [value, setValue] as const
}