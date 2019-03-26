var p,t,l,k,b,v;
var color = "rgba(220,140,40,.6)";
var once = 0;
var left = 0;
var right = 1;
var maxChar = 27;
var inline = 1;
var float = "left";
var m = "";
var position = "absolute";
var modelJSON = 'https://use.openmeter.co.uk/my-model-1q.json';
var heightMargin = 0;
var leftMargin = 0;

async function processModel(){
const model = await tf.loadModel(modelJSON);
  fraw(true,model);
}

function fraw(go,model) {
  try{
    if(go === true) {
        var chars = p.toString().split('');
        var a = [];
        var fake = 34 - chars.length;
        if(!p) return null;
        while(fake) {a.push(0);fake--;}
        for (var i = chars.length-1, charsLength = 0; i >= charsLength; i -= 1) {
            var real = chars[i].charCodeAt(0);
            if (real.toString().length === 3) real = "0" + real;
            if (real.toString().length === 2) real = "00" + real;
            a.push(parseInt(real));
        } 
        a = a.reverse();
        tf.tidy(() => {
            const input = tf.tensor2d([
                [a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],
                a[14],a[15],a[16],a[17],a[18],a[19],a[20],a[21],a[22],a[23],a[24],a[25],a[26],a[27],a[28],
                a[29],a[30],a[31],a[32],a[33]]
              ]);
            let results = model.predict(input);
            let argMax = results.argMax(1);
            let index = argMax.dataSync()[0];
            let label = index;
            var result = label.toString();
            /////////////////
            if(!once) {
                once = 1;
                var canvas = document.createElement('canvas');
                canvas.id = "OpenMeter";
                canvas.width = 25;
                canvas.height = 25;
                canvas.style.zIndex = 1478;
                canvas.style.position = position;
                canvas.style.float = float;
                canvas.style.top = t+"px";
                canvas.style.left = l+"px";
                if(position=="absolute") {         
                  canvas.style.top = t+"px";
                  canvas.style.left = l+"px";
                } else {
                  canvas.style.marginTop = t+"px";
                  canvas.style.marginLeft = l+"px"; }
                var body = document.getElementsByTagName("body")[0];
                if(!m) {body.appendChild(canvas);}
                else if (m && inline) {m.appendChild(canvas);}
                else {body.appendChild(canvas);}
                var loader = new canvasLoader();
                loader.init();
            }
            var int = parseInt(result);
            /////////////
            
            
            if(int <= 1) color = "rgba(229,0,2,.6)";
            else if(int >= 2 && int <= 4) color = "rgba(229,2,0,.6)";
            else if(int >= 4 && int < 6) color = "rgba(229,7,0,.6)";
            else if(int >= 6 && int < 8) color = "rgba(229,12,0,.6)";
            else if(int >= 8 && int < 10) color = "rgba(230,17,0,.6)";
            else if(int >= 10 && int < 12) color = "rgba(230,22,0,.6)";
            else if(int >= 12 && int < 14) color = "rgba(230,27,0,.6)";
            else if(int >= 14 && int < 16) color = "rgba(231,33,0,.6)";
            else if(int >= 16 && int < 18) color = "rgba(231,38,0,.6)";
            else if(int >= 18 && int < 20) color = "rgba(231,43,0,.6)";
            else if(int >= 20 && int < 22) color = "rgba(232,48,0,.6)";
            else if(int >= 22 && int < 24) color = "rgba(232,53,0,.6)";
            else if(int >= 24 && int < 26) color = "rgba(239,59,0,.6)";
            else if(int >= 26 && int < 28) color = "rgba(233,64,0,.6)";
            else if(int >= 28 && int < 30) color = "rgba(233,69,0,.6)";
            else if(int >= 30 && int < 31) color = "rgba(233,75,0,.6)";
            else if(int >= 31 && int < 32) color = "rgba(234,80,0,.6)";
            else if(int >= 32 && int < 33) color = "rgba(234,85,0,.6)";
            else if(int >= 33 && int < 34) color = "rgba(234,90,0,.6)";
            else if(int >= 34 && int < 35) color = "rgba(235,96,0,.6)";
            else if(int >= 35 && int < 36) color = "rgba(235,101,0,.6)";
            else if(int >= 36 && int < 37) color = "rgba(235,107,1,.6)";
            else if(int >= 37 && int < 38) color = "rgba(236,117,1,.6)";
            else if(int >= 38 && int < 39) color = "rgba(236,128,1,.6)";
            else if(int >= 39 && int < 40) color = "rgba(237,139,1,.6)";
            else if(int >= 40 && int < 41) color = "rgba(237,145,1,.6)";
            else if(int >= 41 && int < 42) color = "rgba(238,158,1,.6)";
            else if(int >= 42 && int < 43) color = "rgba(239,167,0,.6)";
            else if(int >= 43 && int < 44) color = "rgba(239,172,0,.6)";
            else if(int >= 44 && int < 45) color = "rgba(239,178,0,.6)";
            else if(int >= 45 && int < 46) color = "rgba(240,183,0,.6)";
            else if(int >= 46 && int < 47) color = "rgba(240,189,0,.6)";
            else if(int >= 48 && int < 49) color = "rgba(240,194,0,.6)";
            else if(int >= 49 && int < 50) color = "rgba(241,200,0,.6)";
            else if(int >= 50 && int < 51) color = "rgba(241,206,0,.6)";
            else if(int >= 51 && int < 52) color = "rgba(241,211,0,.6)";
            else if(int >= 52 && int < 53) color = "rgba(242,217,0,.6)";
            else if(int >= 53 && int < 54) color = "rgba(242,233,0,.6)";
            else if(int >= 54 && int < 55) color = "rgba(242,228,0,.6)";
            else if(int >= 55 && int < 56) color = "rgba(242,234,0,.6)";
            else if(int >= 56 && int < 57) color = "rgba(243,240,0,.6)";
            else if(int >= 57 && int < 58) color = "rgba(241,243,0,.6)";
            else if(int >= 58 && int < 59) color = "rgba(236,243,0,.6)";
            else if(int >= 59 && int < 60) color = "rgba(231,244,0,.6)";
            else if(int >= 60 && int < 62) color = "rgba(226,244,0,.6)";
            else if(int >= 62 && int < 64) color = "rgba(220,244,0,.6)";
            else if(int >= 64 && int < 66) color = "rgba(215,245,0,.6)";
            else if(int >= 66 && int < 68) color = "rgba(210,245,0,.6)";
            else if(int >= 68 && int < 70) color = "rgba(205,245,0,.6)";
            else if(int >= 70 && int < 72) color = "rgba(200,246,0,.6)";
            else if(int >= 72 && int < 74) color = "rgba(195,246,0,.6)";
            else if(int >= 74 && int < 76) color = "rgba(189,246,0,.6)";
            else if(int >= 76 && int < 78) color = "rgba(184,247,0,.6)";
            else if(int >= 78 && int < 81) color = "rgba(179,247,0,.6)";
            else if(int >= 81 && int < 84) color = "rgba(174,247,0,.6)";
            else if(int >= 84 && int < 87) color = "rgba(168,248,0,.6)";
            else if(int >= 87 && int < 90) color = "rgba(163,248,0,.6)";
            else if(int >= 90 && int < 95) color = "rgba(158,248,0,.6)";
            else if(int >= 95) color = "rgba(152,249,1,.6)";
            document.getElementById('OpenMeter').dataset.result=int;
            updateModal(int);
        });
    }
  }catch(e){}
}

document.addEventListener('input', function (evt) {
    if(evt.target.type == "password") {
        evt.target.maxLength = maxChar;
        p = evt.target.value;
        m = evt.target.parentElement;
        if(!left) l = evt.target.offsetLeft + evt.target.scrollWidth + 4 + leftMargin;
        else l = evt.target.offsetLeft - 28 + leftMargin;
        t = evt.target.offsetTop + 11 + heightMargin;
        processModel();
    }
});

document.addEventListener('click', function (evt) {
  if(evt.target.id == "OpenMeter") {
      k = evt.target.dataset.result;
      b = evt.target.offsetLeft;
      v = evt.target.offsetTop;
      loadModal(k,b,v);
  }
});

document.addEventListener('click', function (evt) {
  if(evt.target.id == "close") {
      document.getElementById("OpenMeterBox").style.display="none";
  }
});


function updateColor(input) {
    color = input;
}
var canvasLoader = function(){
                
  var self = this;
  window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)}}();
                
  self.init = function() {
      self.canvas = document.getElementById('OpenMeter');
      self.ctx = self.canvas.getContext('2d');
      self.ctx.lineWidth = .4;
      self.ctx.strokeStyle = color;
      self.count = 2;
      self.rotation = 270 * (Math.PI / 180);
      self.speed = 4;
      self.canvasLoop();
  };

  self.updateLoader = function() {
      self.rotation += self.speed / 100;
      self.ctx.strokeStyle = color;
  };

  self.renderLoader = function() {
      self.ctx.save();
      self.ctx.globalCompositeOperation = 'source-over';
      self.ctx.translate(12.5, 12.5);
      self.ctx.strokeStyle = color;
      self.ctx.rotate(self.rotation);
      var i = self.count;
      while (i--) {
          self.ctx.beginPath();
          self.ctx.arc(0, 0, i + (Math.random() * 9), Math.random(), Math.PI / 3 + (Math.random() / 12), false);
          self.ctx.stroke();
      }
      self.ctx.restore();
  };

  self.canvasLoop = function() {
      requestAnimFrame(self.canvasLoop, self.canvas);
      self.ctx.globalCompositeOperation = 'destination-out';
      self.ctx.fillStyle = 'rgba(0,0,0,.03)';
      self.ctx.fillRect(0, 0, 0, 0);
      self.ctx.strokeStyle = color;
      self.updateLoader();
      self.renderLoader();
  };
}

function updateModal(score) {
  var OpenMeterBox = document.getElementById('OpenMeterBox');
  if(OpenMeterBox) {
    rotateNeedle(score);
  }
}

function loadModal(score,left,top) {
  if(document.getElementById("OpenMeterBox")) { document.getElementById("OpenMeterBox").style.display="block";}
  else {
    var iDiv = document.createElement('div');
    iDiv.id = "OpenMeterBox";
    iDiv.innerHTML = "<img style='width:140px;padding:20px;' src='https://use.openmeter.co.uk/i/meter.jpg' />"
    +"<img id='needle' style='opacity:0.7;transform:rotate(0deg);transform-origin:0px;position:absolute;width:65px;left:40px;top:77px;' src='https://use.openmeter.co.uk/i/needle.png' />"
    +"<div id='feedback'></div>"
    +"<div id='close' style='font-family:monospace;cursor:pointer;position:absolute;top:0;right:0;width:20px;height:20px;font-size:20px;color:red;'>X</div>";
    iDiv.style.width = 180;
    iDiv.style.height = 'auto';
    iDiv.style.color = "black";
    iDiv.style.border = "#70b9b0 solid 3px";
    iDiv.style.textAlign = "center";
    iDiv.style.borderRadius = "6px";
    iDiv.style.backgroundColor = "rgba(255,255,255,1)";
    iDiv.style.zIndex = 1872;
    iDiv.style.position = "absolute";
    iDiv.style.top = top-75+"px";
    iDiv.style.left = left-150+"px";
    document.getElementsByTagName('body')[0].appendChild(iDiv);
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(iDiv);
  }
  rotateNeedle(score);
}


function rotateNeedle(score) {
  var needle = document.getElementById("needle");
  var feedback = document.getElementById("feedback");
  var text = "";
  if(score <= 6) {
    text = text1;
    needle.style.transformOrigin = "50px -16px";
    needle.style.transform = "rotate(7deg)";
  } else if(score > 6 && score <= 12) {
    text = text2;
    needle.style.transformOrigin = "53px 3px";
    needle.style.transform = "rotate(22deg)";
  } else if(score > 12 && score <= 19) {
    text = text3;
    needle.style.transformOrigin = "52px 6px";
    needle.style.transform = "rotate(37deg)";
  } else if(score > 19 && score <= 25) {
    text = text4;
    needle.style.transformOrigin = "52px 8px";
    needle.style.transform = "rotate(52deg)";
  } else if(score > 25 && score <= 31) {
    text = text5;
    needle.style.transformOrigin = "51px 9px";
    needle.style.transform = "rotate(67deg)";
  } else if(score > 31 && score <= 38) {
    text = text6;
    needle.style.transformOrigin = "51px 10px";
    needle.style.transform = "rotate(82deg)";
  } else if(score > 38 && score <= 46) {
    text = text7;
    needle.style.transformOrigin = "51px 10px";
    needle.style.transform = "rotate(97deg)";
  } else if(score > 46 && score <= 53) {
    text = text8;
    needle.style.transformOrigin = "51px 11px";
    needle.style.transform = "rotate(113deg)";
  } else if(score > 53 && score <= 59) {
    text = text9;
    needle.style.transformOrigin = "51px 11px";
    needle.style.transform = "rotate(128deg)";
  } else if(score > 59 && score <= 65) {
    text = text10;
    needle.style.transformOrigin = "51px 11px";
    needle.style.transform = "rotate(143deg)";
  } else if(score > 65 && score <= 71) {
    text = text11;
    needle.style.transformOrigin = "51px 12px";
    needle.style.transform = "rotate(158deg)";
  }  else if(score > 71 && score <= 76) {
    text = text12;
    needle.style.transformOrigin = "51px 12px";
    needle.style.transform = "rotate(174deg)";
  }   else if(score > 76 && score <= 80) {
    text = text13;
    needle.style.transformOrigin = "51px 12px";
    needle.style.transform = "rotate(189deg)";
  }   else if(score > 80 && score <= 85) {
    text = text14;
    needle.style.transformOrigin = "51px 12px";
    needle.style.transform = "rotate(203deg)";
  }   else if(score > 85 && score <= 90) {
    text = text15;
    needle.style.transformOrigin = "51px 12px";
    needle.style.transform = "rotate(218deg)";
  }   else {
    text = text16;
    needle.style.transformOrigin = "51px 13px";
    needle.style.transform = "rotate(231deg)";
  }  
  feedback.innerHTML = "Your password scored "+score+"/100. " +text+"<br/><a href='https://www.openmeter.co.uk' style='clear: both; font-size: 11px; width: 100%; float: left; margin-top: 10px;margin-bottom:5px;'>The Open Meter</a>";
}
              
