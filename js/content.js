chrome.runtime.sendMessage({
  method: "getLocalStorage"
}, function(response) {
  var usd = Number(response.USD);
  var localStorage = response;
  // ======================== TEST =============================
  regReplace(/(\$|usd|usd:)\s?(,?\.?\d)+/i, /[^0-9.]/ig, usd);
  setInterval(function() {
    regReplace(/(\$|usd|usd:)\s?(,?\.?\d)+/i, /[^0-9.]/ig, usd);
  }, Number(localStorage.updateRate));

});


function regReplace(reg, filterReg, rate) {
  /*
    ARGS:
      reg:  RegEX to match currency string.
      filterReg:  RegEX to filter number from matched currency string.
      rate: exchange rate in NPR to conver.
   */
  chrome.runtime.sendMessage({
      method: "filter",
      url: location.href
    },
    function(response) {
      if (response.status) {
        var total = 0;
        var elements = document.getElementsByTagName('*');
        for (var i = 0; i < elements.length; i++) {
          var element = elements[i];

          for (var j = 0; j < element.childNodes.length; j++) {
            var node = element.childNodes[j];

            if (node.nodeType === 3) {
              var text = node.nodeValue;
              var found = 0;
              while (reg.test(text)) {
                found++;
                total++;
                var cur_usd = reg.exec(text)[0].replace(filterReg, '');
                text = text.replace(reg, "Rs. " + Math.ceil(rate * Number(cur_usd)));
              }
              if (found > 0) {
                element.replaceChild(document.createTextNode(text), node);
              }
            }
          }
        }
        if (total > 0) {
          console.log("[*] NC converted " + total + " price into NPR.");
          chrome.runtime.sendMessage({
            method: "count",
            converted: total
          });
        }
      }
    });

}
