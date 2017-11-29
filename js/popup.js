
main();

function main() {
  varUpdate();
  varStatic();
  setInterval(varUpdate, Number(localStorage.updateRate));
}

function varUpdate() {
  lastUpdate = new Date().getTime() - new Date(localStorage.lastUpdate).getTime();
  $("#lastUpdate")[0].innerText = lastUpdate /(1000) <60 ? Math.floor(lastUpdate/1000)+
  " sec" : lastUpdate/(1000*60)<60 ? Math.floor(lastUpdate/(1000*60))+
  " min" : lastUpdate/(1000*60*60)<24 ? Math.floor(lastUpdate/(1000*60*60))+
  " hr" :  Math.floor(lastUpdate/(1000*60*60*24))+" days"; // preety printed updated time.
  $("#forex-usd")[0].innerText = "Rs. "+localStorage.USD;
  $("#totalConverted")[0].innerText = localStorage.totalConverted;
}


function varStatic() {
  // Start powerBtn
  if (localStorage.isPause == "true") {
    powerBtn.classList.add("btn-danger");
    powerBtn.value = "OFF";
  } else {
    powerBtn.classList.add("btn-success");
    powerBtn.value = "ON";
  }
  $("#powerBtn").click(function() {
    if (localStorage.isPause == "true") {
      localStorage.isPause = false;
      this.classList.remove("btn-danger");
      this.classList.add("btn-success");
      this.value = "ON";
      chrome.browserAction.setIcon({path:"img/logo.png"});
    } else {
      localStorage.isPause = true;
      this.classList.remove("btn-success");
      this.classList.add("btn-danger");
      this.value = "OFF";
      chrome.browserAction.setIcon({path:"img/logo-gray.png"});
    }
  });
  // End powerBtn

  // Start modeBtn
  if (localStorage.mode == "auto") {
    modeBtn.value = "Auto";
    modeBtn.classList.add("btn-primary");
  } else if(localStorage.mode == "manual") {
    modeBtn.value = "Manual";
    modeBtn.classList.add("btn-warning");
    $(".man-show").show();
  }

  $("#modeBtn").click(function() {
    if (localStorage.mode == "auto") {
      localStorage.mode = "manual";
      this.classList.remove("btn-primary");
      this.classList.add("btn-warning");
      modeBtn.value = "Manual";
      $(".man-show").slideDown();
    } else {
      localStorage.mode = "auto";
      this.classList.remove("btn-warning");
      this.classList.add("btn-primary");
      modeBtn.value = "Auto";
      $(".man-show").slideUp();
    }
  });
}
