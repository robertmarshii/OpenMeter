//Custom password scoring algorithm and functions to create training data
function processArray() {
    //On process start, set all inputs to readonly to stop changes mid-training
    var x = document.getElementsByClassName("initial");
    for (var i = 0; i < x.length; i++) {x[i].readOnly = true;x[i].style.backgroundColor = "#a3cece";}
    //Get the password array entries and for each, calculate their strength as the training data
    for (s = 0; s < pwdArray.length; s++) { 
        //Split the password string to pull out the commonality count, if it exists
        if(split == 1) {var newArray = pwdArray[s].split(',');var pass = newArray[1];cco = newArray[0];}
        else if (split == 2) {var newArray = pwdArray[s].split(',');var pass = newArray[0];cco = newArray[1];
        } else {var pass = pwdArray[s];cco = 0.1;}
        //Set the full password string, full password length and store longest password length
        var fps = pass; var fpl = fps.length; if(fpl > maxLength) maxLength = fpl;
        //Calculate the password alpha count
        var aps = fps.replace(/[^A-Za-z]/g, ''); var acl = aps.length; 
        //Calculate the password numeric count
        var nps = fps.replace(/\D/g,''); var ncl = nps.length; 
        //Calculate the password special character count
        var sps = fps.replace(/[\w]/gi, ''); var scl = sps.length;
        //Calculate the passwords capital characters
        var cps = aps.replace( /[a-z]/g, '' ); var ccl = cps.length; 
        //Set the left keyboard and right keyboard counts to 0 and grab the custom left keyboard keys
        var lkCount = 0, rkCount = 0; var klist = document.getElementById("lkc").value;
        while (fpl--) { if( klist.indexOf(fps.charAt(fpl)) !== -1) lkCount++; else rkCount++; } 
        //Calculate the amount of left and right keys used in the password from the full password length, reset this on complete
        var lkc = lkCount; var rkc = rkCount; fpl = fps.length; 
        //Calculate the keyboard patterns in the password from the custom input list
        var pcCount = 0;var plist = document.getElementById("plist").value;
        for (var i = 0, charsLength = fpl; i < charsLength; i += 1) { var check = fps.toLowerCase().substring(i, i + 2);
            if( check.length > 1 && plist.indexOf(check) !== -1) pcCount++; } var pcc = pcCount; 
         //Calculate the keyboard keys in the password per row from the custom input list
        var rcCount = 0; var rlist = document.getElementById("rlist").value;
        for (var i = 0, charsLength = fpl; i < charsLength; i += 1) { var check = fps.toLowerCase().substring(i, i + 2);
            if( check.length > 1 && rlist.indexOf(check) !== -1) rcCount++; } var rcc = rcCount;     
        //Calculate alphabetical usage in the password from the custom input alphabet
        var alphaCount = 0; var alphabet = document.getElementById("alphabet").value;
        for (var i = 0, charsLength = acl; i < charsLength; i += 1) {var check = aps.toLowerCase().substring(i, i + 2);
            if( check.length > 1 && alphabet.indexOf(check) !== -1) alphaCount++; } var acc = alphaCount;    
        //Find keys used in the password that are duplicated
        var unique = fps.toLowerCase().split('').filter(function(item, i, ar){ return ar.indexOf(item) === i; }).join(''); 
        //Remove the duplicate key count from the total count and divide it by 2
        var result = Math.round((fpl - unique.length)/2); var dcs = result; 
        //Find keys used in the password that are duplicated and consecutive, reset length
        var dcCount = 0; while (fpl--) { if( fps.charAt(fpl) == fps.charAt(fpl-1)) dcCount++;} var dcc = dcCount; fpl = fps.length; 
        //Count the bigrams found in the password from the custom list
        var biCount = 0; var bigrams = document.getElementById("bigrams").value;
        for (var i = 0, charsLength = bigrams.length; i < charsLength; i += 3) {var check = bigrams.substring(i, i + 2);
            if( check.length > 1 && aps.toLowerCase().indexOf(check) !== -1) biCount++;  } var pbc = biCount;
        //Count the trigrams found in the password from the custom list
        var triCount = 0; var trigrams = document.getElementById("trigrams").value;
        for (var i = 0, charsLength = trigrams.length; i < charsLength; i += 4) { var check = trigrams.substring(i, i + 3);
            if( check.length > 2 && aps.toLowerCase().indexOf(check) !== -1) triCount++;  } var ptc = triCount;  
        //Convert the password to an ASCII visual equivalent
        if(fps.toLowerCase().indexOf("1") !== -1 || fps.toLowerCase().indexOf("\\") !== -1 || 
        fps.toLowerCase().indexOf("|") !== -1 || fps.toLowerCase().indexOf("\/") !== -1 ) {fps = fps.split("1").join("l").split("|").join("l").split("\/").join("l").split("\\").join("l");}
        if(fps.toLowerCase().indexOf("0") !== -1) {fps = fps.split("0").join("o");}
        if(fps.toLowerCase().indexOf("2") !== -1) {fps = fps.split("2").join("z");}
        if(fps.toLowerCase().indexOf("3") !== -1 || fps.toLowerCase().indexOf("£") || fps.toLowerCase().indexOf("€")) {fps = fps.split("3").join("e").split("£").join("e").split("€").join("e");}
        if(fps.toLowerCase().indexOf("4") !== -1 || fps.toLowerCase().indexOf("@") !== -1) {fps = fps.split("4").join("a").split("@").join("a");      }
        if(fps.toLowerCase().indexOf("5") !== -1 || fps.toLowerCase().indexOf("$")) {fps = fps.split("5").join("s").split("$").join("e");}
        if(fps.toLowerCase().indexOf("8") !== -1) {fps = fps.split("8").join("b");}
        if(fps.toLowerCase().indexOf("9") !== -1) {fps = fps.split("9").join("g");}
        if(fps.toLowerCase().indexOf("+") !== -1 || fps.toLowerCase().indexOf("7") !== -1) {fps = fps.split("+").join("t").split("7").join("t");}
        if(fps.toLowerCase().indexOf("(") !== -1 || fps.toLowerCase().indexOf("<") || fps.toLowerCase().indexOf("{") 
        || fps.toLowerCase().indexOf("[")) {fps = fps.split("(").join("c").split("<").join("c").split("{").join("c").split("[").join("c");}
        var fps1 = fps; var fps2 = fps.split("l").join("i"); var acp = fps1+"/"+fps2;
        //Run the same checks as above again, but on the ASCII equivalent
        var fps = pass; var biCount1 = 0; var biCount2 = 0;
        for (var i = 0, charsLength = bigrams.length; i < charsLength; i += 3) {
            var check = bigrams.substring(i, i + 2);
            if( check.length > 1 && fps1.toLowerCase().indexOf(check) !== -1) biCount1++; 
            if( check.length > 1 && fps2.toLowerCase().indexOf(check) !== -1) biCount2++;  }
        var abc = (biCount1 + biCount2)/2; var triCount1 = 0; var triCount2 = 0;
        for (var i = 0, charsLength = trigrams.length; i < charsLength; i += 4) {
            var check = trigrams.substring(i, i + 3);
            if( check.length > 2 && fps2.toLowerCase().indexOf(check) !== -1) triCount1++; 
            if( check.length > 2 && fps2.toLowerCase().indexOf(check) !== -1) triCount2++;  }
        //Combine the two alternative ASCII equivalent passwords and divide their result by 2
        var atc = (triCount1 + triCount2)/2;  
        //Count the number of shift keys used by removing the non-shift key special characters and grabbing the length
        var skCount = sps.replace("[];’#,./\`").length;var skc = parseInt(ccl) + parseInt(skCount); 
        //Reset alpha password string
        var aps = fps.replace(/[^A-Za-z]/g, '');
        //Grab the entropy and the decimal representation of the password from the external functions
        var ent = entropyCalc(pass); var dec = decimalMaker(pass);
        //Calculate the total score of the password using the following weights
        fpl = fpl * 50; cco = cco * 5; acl = acl * 10; ncl = ncl * 20; scl = scl * 60; ccl = ccl * 30; 
        if(lkc>rkc) lkc = lkc - rkc; else  lkc = rkc - lkc; lkc = lkc * 220; 
        var patterns = pcc + rcc; pcc = patterns * 350
        acc = acc * 70; dcs = dcs * 40; dcc = dcc * 80; pbc = pbc * 150; ptc = ptc * 200; abc = abc * 40;
        atc = atc * 60; skc = skc * 160; 
        tso = fpl + acl + ncl + scl - ccl - lkc - pcc - acc - dcs - dcc - pbc - ptc - abc - atc + skc;
        fpl = fps.length; tso2 = tso / fpl;if(ent == 0) ent = 0.001; tso = tso2 + 20; tso = tso * ent;
        tso = tso * fpl; var len = 1; if(dcc > (fpl/2)) len * 100; if(dcs > (fpl/2)) len * 300;
        tso = tso / len; tso = tso / 100000; cco = cco * 0.00642; 
        //If entropy is less than one, auto set score to 0.01
        tso = tso / cco; if( tso > 0.01 && ent < 1) tso = 0.01;
        //Convert the decimal array to CSV string
        var decimal = dec.toString(); var totalScore = tso;
        //Push the decimal rep pass and its calculated score to the array
        json.entries.push({'dpa': decimal, 'tso': totalScore});
    }
    //Reset the password array to null
    pwdArray = [];
    //Stage all the data for normalisation
    normalise(json);
}

//Converts a string to the decimal representation using charCodeAt
function decimalMaker(strg) {
    var decs = [];
    var array = strg.split("");
    for (var i = 0; i < array.length; i++) {
        decs.push(array[i].charCodeAt(0));
    }
    return decs;
}

//Javascript custom entropy calculation
function entropyCalc(strg) {
    var array = strg.split("");
    var h = 0; 
    var size = strg.length; 
    for (var i = 0; i < array.length; i++) {
        var dupe = 0;
        for (var p = 0; p < array.length; p++) {
           if (array[i] == array[p]) dupe++;
        }
        var p = dupe/size;
        h -= p*Math.log(p)/Math.log(2); 
    } 
    return h;
}

//Normlisation algorithm to set the passwords between 1 and 100
function normalise(json) {
    var hi, lo;
    for (var record of json.entries) {
        if(hi == null) {
            hi = record.tso;
            lo = record.tso;
        } else if (record.tso > hi) {
            hi = record.tso
        } else if (record.tso < lo) {
            lo = record.tso;
        }
    }
    for (var record of json.entries) {
        var normScore = ((record.tso-lo)/(hi-lo))*(100-1)+1;
        record.tso = normScore;
    }
    setup(json);
}

//Setup the TensorFlow Tensor with the trained data: https://js.tensorflow.org/api/0.6.1/#oneHot
function setup(json) {
    var pass, labels = [];
    //Pass and labels array ready to import data, iterate over the passed in JSON data
    for (var record of json.entries) {
        //Remove trailing comma
        var str = record.dpa.substring(0, record.dpa.length - 1); var array = str.split(",");
        //Fill up empty array slots
        if(!array[0]||array[0].length == 0) array[0] = "0000";if(!array[1]||array[1].length == 0) array[1] = "0000";
        if(!array[2]||array[2].length == 0) array[2] = "0000";if(!array[3]||array[3].length == 0) array[3] = "0000";
        if(!array[4]||array[4].length == 0) array[4] = "0000";if(!array[5]||array[5].length == 0) array[5] = "0000";
        if(!array[6]||array[6].length == 0) array[6] = "0000";if(!array[7]||array[7].length == 0) array[7] = "0000";
        if(!array[8]||array[8].length == 0) array[8] = "0000";if(!array[9]||array[9].length == 0) array[9] = "0000";
        if(!array[10]||array[10].length == 0) array[10] = "0000";if(!array[11]||array[11].length == 0) array[11] = "0000";
        if(!array[12]||array[12].length == 0) array[12] = "0000";if(!array[13]||array[13].length == 0) array[13] = "0000";
        if(!array[14]||array[14].length == 0) array[14] = "0000";if(!array[15]||array[15].length == 0) array[15] = "0000";
        if(!array[16]||array[16].length == 0) array[16] = "0000";if(!array[17]||array[17].length == 0) array[17] = "0000";
        if(!array[18]||array[18].length == 0) array[18] = "0000";if(!array[19]||array[19].length == 0) array[19] = "0000";
        if(!array[20]||array[20].length == 0) array[20] = "0000";if(!array[21]||array[21].length == 0) array[21] = "0000";
        if(!array[22]||array[22].length == 0) array[22] = "0000";if(!array[23]||array[23].length == 0) array[23] = "0000";
        if(!array[24]||array[24].length == 0) array[24] = "0000";if(!array[25]||array[25].length == 0) array[25] = "0000";
        if(!array[26]||array[26].length == 0) array[26] = "0000";if(!array[27]||array[27].length == 0) array[27] = "0000";
        if(!array[28]||array[28].length == 0) array[28] = "0000";if(!array[29]||array[29].length == 0) array[29] = "0000";
        if(!array[30]||array[30].length == 0) array[30] = "0000";if(!array[31]||array[31].length == 0) array[31] = "0000";
        if(!array[32]||array[32].length == 0) array[32] = "0000";if(!array[33]||array[33].length == 0) array[33] = "0000";
        //Get users desired max password length and push it to an array
        pwdLength = document.getElementById("pwLength").value;
        var x; var col = []; for (x = 0; x < pwdLength; x++) { col.push(array[x]);}
        //Push the padded pasword to the password array
        pass.push(col);
        //Convert the total score to a fixed value
        var tso = record.tso.toFixed(2).toString();
        //Remove the point to get just the whole number
        tso = tso.split(".");
        //Parse and push the score to the labels array
        tso = parseInt(tso[0]);
        labels.push(tso);
    }
    //Convert the required max password length from a string to and Int and pop it into an Array
    var pwdLengthArray = [parseInt(pwdLength)];
    //Set the X Tensor to the passwords
    xs = tf.tensor2d(pass);
    //Set a Tensor to the scores
    var labelsTensor = tf.tensor1d(labels, 'int32');
    //Set the Y Tensor to the score Tensor using the oneHot Tensor
    ys = tf.oneHot(labelsTensor, 100).cast('float32');
    //Dispose of the Tensor used to make the oneHot Tensor
    labelsTensor.dispose();
    //Set the TensorFlow model
    model = tf.sequential();
    //Set up the hidden layer with the expected -fixed- max password length
    const hidden = tf.layers.dense({
        units: 78,
        inputShape: pwdLengthArray,
        activation: 'sigmoid'
    });
    //Add the hidden layer above to the model
    model.add(hidden);
    //Setup the output layer for TensorFlow using the 100 possible labels
    const output = tf.layers.dense({
        units: 100,
        activation: 'softmax'
    });
    //Add the output layer to the model
    model.add(output);
    //Set the learning rate and optimiser to use
    const LEARNING_RATE = 0.001; const optimizer = tf.train.adam(LEARNING_RATE);
    //Begin compile using the options set above and cross entropy
    model.compile({ optimizer: optimizer, loss: 'categoricalCrossentropy', metrics: ['accuracy']});
    //Display the canvas so the user can watch the loss function progressing
    document.getElementById("canvasDiv").style.display = "block";
    //Grab and update the epochs value
    epochs = parseInt(document.getElementById("epochInt").value);
    //Initial display and begin training function
    init();
    train();
}

//TensorFlow JS Training: https://www.tensorflow.org/js/guide/train_models
async function train() {
  await model.fit(xs, ys, {
    shuffle: true,
    validationSplit: 0.0001,
    epochs: epochs, //Set by user, amount of iterations
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        //Print out the loss to the canvas graph
        document.getElementById("loss").innerHTML = "Loss: " + logs.loss.toFixed(5);
        //Send the loss also to the graph for plotting
        plotData(logs.loss.toFixed(5));
      },
      onBatchEnd: async (batch, logs) => {
      },
      onTrainEnd: () => {
        //On training complete show testing inputs
        showInputs();
      },
    },
  });
}

//Toggle input visibility after data has trained - https://www.w3schools.com/jsref/prop_text_maxlength.asp
function showInputs() {
    pwdLength = document.getElementById("pwLength").value;
    document.getElementById("pwd").maxLength=pwdLength;
    document.getElementById("pwd").style.display = "block";
    document.getElementById("bulkTest").style.display = "block";
    document.getElementById("score").style.display = "block";
    document.getElementById("download").style.display = "block";
}

//The draw function predicts strengths via TensorFlow: https://towardsdatascience.com/50-tensorflow-js-api-explained-in-5-minutes-tensorflow-js-cheetsheet-4f8c7f9cc8b2
function draw(go,pwd) {
    //Sanity check
    if(go === true) {
        //Update the count
        progress0++;
        var password = document.getElementById("pwd").value;  
        //If password has been passed directly to the function via code
        if(pwd) password = pwd;
        //Split the password into a character array
        var chars = password.toString().split('');
        //Set the character array
        var a = [];
        //Get the max password length chosen and remove the length of the current password
        var fake = document.getElementById("pwLength").value - chars.length;
        if(!password) return null;
        //While fake is > 0, add nulls to pad out the TensorFlow data (has to be fixed length)
        while(fake) {a.push(0);fake--;}
        //Once the fakes have been added, now add the real password decimals in reverse NULL, NULL, NULL, D, R, O...
        for (var i = chars.length-1, charsLength = 0; i >= charsLength; i -= 1) {
            var real = chars[i].charCodeAt(0);
            if (real.toString().length === 3) real = "0" + real;
            if (real.toString().length === 2) real = "00" + real;
            a.push(parseInt(real));
        } 
        //Now unreverse the array to get TensorFlow Array, eg/ P,A,S,S,W,O,R,D,NULL,NULL,NULL
        a = a.reverse();
        //TensorFlow Cleanup 
        tf.tidy(() => {
            //Set the input data
            const input = tf.tensor2d([a]);
            //Use existing model and call predict on the oasswird
            let results = model.predict(input);
            let argMax = results.argMax(1);
            let index = argMax.dataSync()[0];
            //Get result label
            let label = index;
            result = label.toString();
            //Push the result and input password to the output function
            output(result,password);
        });
    }
}

//Output for testing password strength: https://www.w3schools.com/jsref/prop_checkbox_checked.asp
function output(result,password) {
    //Get bulk option, true/false
    bulkReview = document.getElementById("bulkReview").checked; 
    var body = document.getElementById("results").innerHTML;
    //Get threshold value (hide passwords below this result)
    var threshold0 = document.getElementById("threshold0").value;
    //If the result is empty and a bulk review is finished - empty line at EOF, output results and reset dialog
    if(!result) {
        if(progress0 == count0 && bulkReview) {
            document.getElementById("file0").value = ""; 
            document.getElementById("results").innerHTML = '<div style="margin-top:5px;">Found '+weak0+'/'+count0+' passwords, scoring below '+threshold0+'/100</div>' + body;
        }
    //Otherwise, count the weak password found
    } else {
        if(bulkReview && parseInt(result) <= parseInt(threshold0)) { weak0++; }
        //If not a weak password based on threshold, output the result
        else { document.getElementById("results").innerHTML = '<div style="margin-top:5px;"><i>Password:</i> '+password+' <b>Strength:</b> '+result+'<br/></div>' + body; } 
        //If every is complete after a bulk operation, output results/reset file dialog - no empty line at EOF
        if(progress0 == count0 && bulkReview) 
        { document.getElementById("file0").value = ""; document.getElementById("results").innerHTML = '<div style="margin-top:5px;">Found '+weak0+'/'+count0+' passwords, scoring below '+threshold0+'/100</div>' + body; }
        //In all over cases, if processing has complete, reset the file dialog
        else if(progress0 == count0) 
        document.getElementById("file0").value = ""; 
    }
}

//Initialise function for TensorFlow Canvas Graph: https://www.w3schools.com/html/html5_canvas.asp
function init() {
    //Set amount of graph sections to the amount of epochs
    sections = epochs;
    //Min and max left side values
	Val_max = 5;
    Val_min = 0;
    //Set column, row and margin sizes of the graph interior
	var columnSize = 1;
	var rowSize = 1;
    var margin = 1;
    //Grab the Canvas object
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	context.fillStyle = "#0099ff"
    context.font = "20 pt Verdana"
    //Set the X and Y scale positions
	yScale = (canvas.height - columnSize - margin) / (Val_max - Val_min);
	xScale = (canvas.width - rowSize) / sections;
	context.beginPath();
	context.stroke();
	context.translate(rowSize,canvas.height + Val_min * yScale);
	context.scale(1,-1 * yScale);
	context.strokeStyle="#70b9b0";
}

//Create the graph plots based on the TensorFlow Loss: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineTo
function plotData(dataSet) {
    context.beginPath();
    context.moveTo(0, dataSet);
    //Uses the oo counter to create a blocked curve
    oo++; 
	context.lineTo(oo * xScale, dataSet+1);
	context.stroke();
}

//Download function for TensorFlow: https://www.tensorflow.org/tutorials/keras/save_and_restore_models
function download1() {
    model.save('downloads://my-model-1');
}

//Events
//File upload of passwords to be trained: https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
var fileUpload = document.getElementById("file");
fileUpload.addEventListener("change", function(){
     var file = fileUpload.files[0];
     var reader = new FileReader();
     reader.onload = function(progressEvent){
        //split lines by newline
         var lines = this.result.split('\n');
         //check if password list contains commonality count
         if(lines[0].indexOf(',') != -1) {
            var test1 = lines[0].split(',');
            if(lines[1].indexOf(',') != -1) {
                var test2 = lines[1].split(',');
                if(lines[2].indexOf(',') != -1) {
                    //check if commonality count is on left/right
                    var test3 = lines[2].split(',');
                    var test1toggle = /^\d+$/.test(test1[0]);
                    var test2toggle = /^\d+$/.test(test2[0]);
                    var test3toggle = /^\d+$/.test(test3[0]);
                    //set split based on left or right side comma
                    if(test1toggle==true&&test2toggle==true&&test3toggle==true) {split = 1; } else { split = 2; }
                }
            }
         }
         //change count to all the lines found
         count = lines.length;
         for(var line = 0; line < lines.length; line++){
            //push each line, trimmed of trailing spaces to the array
            pwdArray.push(lines[line].trim());
         }
         processArray();
     };

     reader.onloadstart = function(event) {
         document.getElementById("loading").innerHTML = "0%";
     };
     reader.onprogress = function(event) {
         document.getElementById("loading").innerHTML = "50%";
     };
     reader.onloadend = function(event) {
         document.getElementById("loading").innerHTML = "100%";
     };
     reader.readAsText(file);
});

 //File upload of passwords to be tested: https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
 var fileUpload0 = document.getElementById("file0");
 fileUpload0.addEventListener("change", function(){
      var file0 = fileUpload0.files[0];
      var reader0 = new FileReader();
      reader0.onload = function(){
          count0 = 0; weak0 = 0; progress0 = 0;
          //split lines by newline
          var lines0 = this.result.split('\n');
          //change count to all the lines found -1
          count0 = lines0.length-1;
          for(var line0 = 0; line0 < lines0.length; line0++){
              //set the single password to null
              document.getElementById("pwd").value = "";
              //push each line to the draw function
              draw(true,lines0[line0].trim());
          }
      };
 
      reader0.onloadstart = function(event) {
          document.getElementById("loading0").innerHTML = "0%";
      };
      reader0.onprogress = function(event) {
          document.getElementById("loading0").innerHTML = "50%";
      };
      reader0.onloadend = function(event) {
          document.getElementById("loading0").innerHTML = "100%";
      };
      reader0.readAsText(file0);
});

//Global variables
var count, cco = 0.1;
var pwdArray, convArray = [];
var json = {"entries": []};
var progress0, oo, weak0, count0, progress, weak, count, split = 0;
var xs, ys, model, s, pwdLength, epochsvar, canvas, context, Val_max, Val_min, sections,  xScale, yScale;
var maxLength = 1;
var result = "";
