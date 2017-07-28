if (!localStorage.apiURL) {
  localStorage.apiURL = "https://www.nrb.org.np/exportForexJSON.php";
}
if (!localStorage.lastUpdate) {
  localStorage.lastUpdate = false;
}

getData(); //get data from server
setInterval(function () {
  getData(); // repeat every 10 min.
}, 1000*60*10);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // serve data to content script
    if (request.method == "getLocalStorage")
      sendResponse({data : localStorage[request.key]});
    else
      sendResponse({}); // empty.
});
