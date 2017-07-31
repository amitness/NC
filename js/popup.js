main();

function main() {
  varUpdate();
  varStatic();
  setInterval(varUpdate, Number(localStorage.updateRate));
}

function varUpdate() {
  $("#totalConverted")[0].innerText = localStorage.totalConverted;

  $("#lastUpdate")[0].innerText = Math.round(((new Date().getTime() -
    new Date(localStorage.lastUpdate).getTime()) / 1000 / 60)) + " min ago.";
}


function varStatic() {
  if (localStorage.isPause == "true") {
    powerBtn.classList.add("btn-danger");
    powerBtn.value = "OFF";
  } else {
    powerBtn.classList.add("btn-info");
    powerBtn.value = "ON";
  }

  $("#powerBtn").click(function() {
    if (localStorage.isPause == "true") {
      localStorage.isPause = false;
      this.classList.remove("btn-danger");
      this.classList.add("btn-info");
      this.value = "ON";
      chrome.browserAction.setIcon({path:"img/logo.png"});
    } else {
      localStorage.isPause = true;
      this.classList.remove("btn-info");
      this.classList.add("btn-danger");
      this.value = "OFF";
      chrome.browserAction.setIcon({path:"img/logo-gray.png"});
    }
  })
}
