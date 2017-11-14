chrome.runtime.sendMessage({
  method: "getLocalStorage"
}, function(response) {
  var usd = Number(response.USD);
  var eur = Number(response.EUR);
  var localStorage = response;
  // ======================== TEST =============================
  var arg = [{
      reg: /(\$|usd|usd:)\s?(,?\.?\d)+/i,
      filterReg: /[^0-9.]/ig,
      rate: usd
      // End USD
    },
    {
      reg: /(\€|eur|eur:)\s?(,?\.?\d)+/i,
      filterReg: /[^0-9.]/ig,
      rate: eur
      // End EUR
    }
  ];
  chrome.runtime.sendMessage({
      method: "filter",
      url: location.href
    },
    function(filter) {
      if (filter.status) {
        chrome.runtime.sendMessage({
          method: "mode"
        }, function(mode) {
          if (mode == "auto") {
            regReplace(arg);
            setInterval(function() {
              regReplace(arg);
            }, Number(localStorage.updateRate));
          } else if (mode == "manual") {
            var map = {};
            onkeydown = onkeyup = function(e) {
              e = e || event; // to deal with IE
              map[e.keyCode] = e.type == 'keydown';
              if (map[32] === true && map[17] === true && map[67] === true) {
                regReplace(arg);
              }
            };
          }
          // end mode
        });
      }
      // end filter
    });
  // end main
});


function regReplace(data) {
  /*
    ARGS:
    data: {[
      reg:  RegEX to match currency string.
      filterReg:  RegEX to filter number from matched currency string.
      rate: exchange rate in NPR to conver.]}
   */

  var total = 0;
  var elements = document.getElementsByTagName('*');
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
      var node = element.childNodes[j];

      if (node.nodeType === 3) {
        var text = node.nodeValue;
        var found = 0;
        for (var k = 0; k < data.length; k++) {
          var core_return = regReplaceCore(data[k], text);
          text = core_return.text;
          found += core_return.found;
          if (core_return.found > 0) {
            total += core_return.found;
            found = 0;
            node.nodeValue = text;
          }
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

function regReplaceCore(data, text) {
  var found = 0;
  while (data.reg.test(text)) {
    found++;
    var cur = data.reg.exec(text)[0].replace(data.filterReg, '');
    text = text.replace(data.reg, "Rs. " + Math.ceil(data.rate * Number(cur)));
  }
  return {
    text: text,
    found: found
  };
}
