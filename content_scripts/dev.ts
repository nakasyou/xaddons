const script = document.createElement('script')
script.type = 'module'
script.src = chrome.runtime.getURL('./content_scripts/dev_launch.js')
document.head.append(script)
