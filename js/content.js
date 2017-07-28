chrome.runtime.sendMessage({method: "getLocalStorage", key: "USD"}, function(response) {
  var usd = response.data;
  console.log(usd);
});
