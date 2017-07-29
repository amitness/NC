if (!localStorage.apiURL) {
  localStorage.apiURL = "https://www.nrb.org.np/exportForexJSON.php";
}
if (!localStorage.lastUpdate) {
  localStorage.lastUpdate = false;
}
if (!localStorage.updateRate) {
  localStorage.updateRate = 1000;
}

getData(); //get data from server
setInterval(function () {
  getData(); // repeat every 10 min.
}, 1000*60*10);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // serve data to content script
    if (request.method == "getLocalStorage")
      if(request.key){
        sendResponse({key : localStorage[request.key]});
      }else{
        sendResponse(localStorage); // send whole localStorage if key is not given
      }
    else
      sendResponse({}); // empty.
});
