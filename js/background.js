if (!localStorage.apiURL) {
  localStorage.apiURL = "https://www.nrb.org.np/exportForexJSON.php";
}
if (!localStorage.lastUpdate) {
  localStorage.lastUpdate = false;
}
if (!localStorage.updateRate) {
  localStorage.updateRate = 1000;
}
if (!localStorage.totalConverted) {
  localStorage.totalConverted = 0;
}
if (!localStorage.isPause) {
  localStorage.isPause = false;
}
getData(); //get data from server
setInterval(function() {
  getData(); // repeat every 10 min.
}, 1000 * 60 * 10);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // serve data to content script
  // ===========================================================================
  if (request.method == "getLocalStorage") {
    // {method : "getLocalStorage"} to get whole localStorage
    if (request.key) {
      // {method: "getLocalStorage", key: "key"} to get single data
      sendResponse({
        key: localStorage[request.key]
      });
    } else {
      sendResponse(localStorage); // send whole localStorage if key is not given
    }
  }

  // ===========================================================================

  if (request.method == "count") {
    if (request.converted) {
      // {method: "count", converted: num} to increase total converted value
      localStorage["totalConverted"] = Number(localStorage["totalConverted"]) +
        Number(request.converted);
    }
  }

  // ===========================================================================
  if (request.method == "filter") {
    // {method: 'filter', url: 'url'}
    if (request.url) {
      if (filter(request.url)) {
        sendResponse({
          status: true
        });
      } else {
        localStorage.lastBlock = request.url;
        sendResponse({
          status: false
        });
      }
    }
  }
  // ===========================================================================
});


if (localStorage.isPause == "true") {
  chrome.browserAction.setIcon({path:"img/logo-gray.png"});
} else {
  chrome.browserAction.setIcon({path:"img/logo.php"});
}
