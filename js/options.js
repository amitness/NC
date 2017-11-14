updateRate.value = Number(localStorage.updateRate)/1000;
apiUrl.value = localStorage.apiURL;
fetchDelay.value = Number(localStorage.fetchDelay)/1000/60;

$("#updateRate").change(function() {
  localStorage.updateRate = this.value*1000;
});

$("#apiUrl").change(function() {
  localStorage.apiURL = this.value;
});

$("#fetchDelay").change(function() {
  localStorage.fetchDelay = this.value*1000*60;
});
