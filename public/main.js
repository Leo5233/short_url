const shortBtn = document.querySelector('#shorten')
const urlInput = document.querySelector('.url-input')

function isValidUrl(url) {
  return url && url.length > 10 && (!(url.includes('<') || url.includes('>') || url.includes(' '))) && (url.includes('http://') || url.includes('https://'))
}

//攔截無效網址
shortBtn.addEventListener('click', event => {
  const URL = urlInput.value.trim()
  if (!isValidUrl(URL)){
    event.preventDefault()
    alert('please write in correct URL format')
  }
  console.log(URL)

  
})
//按下copy鍵複製網址
const copyBtn = document.querySelector('#copy-btn')
copyBtn.addEventListener('click', event => {
  const copyText = document.querySelector('#short-url')
  copyText.select();
  navigator.clipboard.writeText(copyText.value);

})

