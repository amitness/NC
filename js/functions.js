function getData() {
  //get data from api >
  $.getJSON(localStorage.apiURL, function(data, status, xhr) {
    if (status == "success") {
      $.each(data.Conversion.Currency, function(key, val) {
        if (val.BaseValue != "1") {
          localStorage[val.BaseCurrency]=Number(val.TargetBuy)/Number(val.BaseValue);
        }else{
          localStorage[val.BaseCurrency]=Number(val.TargetBuy);
        }
      });
      localStorage["lastUpdate"] = new Date();
      console.log("[*] data updated.");
    }
  if (status == 'error') {
    console.log("[!] error while updating.")
  }
  })
}
