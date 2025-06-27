export function getLocalStorageItem<T>(item: string): T | null {
  const itemString = localStorage.getItem(item)
  if (!itemString) {
    return null
  }
  return JSON.parse(itemString)
}