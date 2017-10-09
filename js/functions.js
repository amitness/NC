function getData() {
  //get data from api > change BaseValue to 1 > store each to localStorage
  $.getJSON(localStorage.apiURL, function(data, status, xhr) {
    if (status == "success") {
      $.each(data.Conversion.Currency, function(key, val) {
        if (val.BaseValue != "1") {
          localStorage[val.BaseCurrency] = Number(val.TargetBuy) / Number(val.BaseValue);
        } else {
          localStorage[val.BaseCurrency] = val.TargetBuy;
          // NOTE: localStorage store everything as string
        }
      });
      localStorage.lastUpdate = new Date();
      console.log("[*] data updated.");
    }
  if (status == 'error') {
    console.log("[!] error while updating.");
  }
  });
}
