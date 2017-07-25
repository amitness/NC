function replace(){
  var text = document.getElementsByTagName("body")[0].innerHTML;
  text=text.replace("/$[0-9]{*}/ig", "test");
  console.log(text+"re");
}
replace();
