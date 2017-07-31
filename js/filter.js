function filter(url) {
  // Write a function for url based filter.
  // Return true or flase

  if (localStorage.isPause == "true") {
    return false; // if paused
  } // end:

  return true;
}
