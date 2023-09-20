const script = document.createElement('script')
script.type = 'module'
script.src = chrome.runtime.getURL('./core/dev_launch.js')
document.head.append(script)
