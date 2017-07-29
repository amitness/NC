chrome.runtime.sendMessage({
  method: "getLocalStorage"
}, function(response) {
  var usd = Number(response.USD);

  // ======================== TEST =============================
  regReplace(/\$\s?(,?\.?\d*)*/i, /\$/ig, usd);
  setInterval(function() {
    regReplace(/\$\s?(,?\.?\d*)*/i, /\$/ig, usd);
  }, Number(response.updateRate));

});


function regReplace(reg, filterReg, rate) {
  /*
    ARGS:
      reg:  RegEX to match currency string.
      filterReg:  RegEX to filter number from matched currency string.
      rate: exchange rate in NPR.
   */
  var elements = document.getElementsByTagName('*');
  var total = 0;
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
      var node = element.childNodes[j];

      if (node.nodeType === 3) {
        var text = node.nodeValue;
        var found = 0;
        while (reg.test(text)) {
          found++;
          total+=found;
          var cur_usd = reg.exec(text)[0].replace(filterReg, '');
          text = text.replace(reg, "Rs. " + Math.ceil(rate * Number(cur_usd)));
        }
        if (found > 0) {
          element.replaceChild(document.createTextNode(text), node);
        }
      }
    }
  }
  if (total>0) {
    console.log("[*] NC converted "+total+" price into NPR.");
  }
}
