const getTheme = (): 'light' | 'dark' => {
  if (typeof localStorage !== 'undefined' && localStorage.getItem('theme'))
    return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
  return 'light'
}

export default getTheme
