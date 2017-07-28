function getData() {
  //get data from api >
  $.getJSON(localStorage.apiURL, function(data, status, xhr) {
    if (status == "success") {
      $.each(data.Conversion.Currency, function(key, val) {
        localStorage[val.BaseCurrency]=val.TargetBuy;
      });
      localStorage["lastUpdate"] = new Date();
      console.log("[*] data updated.");
    }
  if (status == 'error') {
    console.log("[!] error while updating.")
  }
  })
}
