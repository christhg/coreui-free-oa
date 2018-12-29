function sleep (delay) {
  var start = new Date().getTime()
  while (new Date().getTime() < start + delay);
}

export default sleep
