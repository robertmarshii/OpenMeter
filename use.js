loadScripts([
  'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@0.11.6',
  'https://use.openmeter.co.uk/openmeter.min.js'
], () => {
  //Change the position type/mode - default absolute/relative/inline, 1=true, 0=false
  position = "absolute";
  float = "right";
  inline = 0;
  //Change which side the Open Meter Circle appears on, 1=true, 0=false
  left = 0; 
  right = 1;
  //Using + or -, move the Open Meter Circle up, down, left and right
  heightMargin = -60;
  leftMargin = 50;
  //Custom password text response
  text1 = "Your password is very common.";
  text2 = "Your password is either too short or is very common.";
  text3 = "Your password is too short or is often used.";
  text4 = "Your password is very weak, try making it longer.";
  text5 = "Your password is either too short or needs more variation in the characters it uses.";
  text6 = "Your password is weak, try combining several different passwords together.";
  text7 = "Your password acceptable, make it stronger by adding characters.";
  text8 = "Your password is of moderate strength, it can easily be improved.";
  text9 = "Your password is probably too short, try using two passwords together.";
  text10 = "Your password should be longer or have more variation.";
  text11 = "Your password is okay, it could be better.";
  text12 = "Your password is pretty good.";
  text13 = "Your password is good.";
  text14 = "Your password is very good.";
  text15 = "Your password is very strong, well done.";
  text16 = "Your password is super strong, can you remember it?";
  //Custom model and character length
  modelJSON = modelJSON;
  maxChar = maxChar;
  //Console response
  console.log('Open Meter Ready!');
});

function loadScript(url, callback) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  script.onreadystatechange = callback;
  script.onload = callback;
  document.head.appendChild(script);
}

function loadScripts(urls, callback) {
  var loadedCount = 0;
  var multiCallback = () => {
  loadedCount++;
  if (loadedCount >= urls.length) {
      callback.call(this, arguments);
  }
  };
  for (var url of urls) {
  loadScript(url, multiCallback);
  }
}