chrome.runtime.sendMessage({method: "getLocalStorage", key: "USD"}, function(response) {
  console.log("From NC extension >> USD: "+response.data+"<<"); // log in all url 
});
