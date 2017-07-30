main();

function main() {
  varUpdate();
}

function varUpdate() {
  $("#totalConverted")[0].innerText = localStorage.totalConverted;

  $("#lastUpdate")[0].innerText = Math.round(((new Date().getTime()
    -new Date(localStorage.lastUpdate).getTime())/1000/60)) + " min ago.";

    if (localStorage.isPause == "true") {
      powerBtn.classList.add("btn-danger");
      powerBtn.value = "Paused";
    }else{
      powerBtn.classList.add("btn-info");
      powerBtn.value = "Running";
    }

  $("#powerBtn").click(function(){
    if (localStorage.isPause == "true") {
      localStorage.isPause = false;
      this.classList.remove("btn-danger");
      this.classList.add("btn-info");
      this.value = "Running";
    }else{
      localStorage.isPause = true;
      this.classList.remove("btn-info");
      this.classList.add("btn-danger");
      this.value = "Paused";
    }
  })

}
