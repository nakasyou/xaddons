export const mainTweetLoaded = () => new Promise((resolve) => {
  const interval = setInterval(() => {
    if (document.querySelector('div.r-1r5su4o:nth-child(4)')) {
      resolve(null)
      clearInterval(interval)
    }
  })
})