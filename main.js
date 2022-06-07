ringtone = "";
Status = "";
result_d = [];
function preload() {
    ringtone = loadSound("ringing_old_phone.mp3");
}

function setup() {
    canvas = createCanvas(600,400);
    canvas.position(400,150);
    cam = createCapture(VIDEO);
    cam.size(600,400);
    cam.hide();
    
    loaded = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML = "Status : Objects are getting detected";
}

function draw() {
    image(cam,0,0,600,400);

    if(Status != "") {
        loaded.detect(cam, gotresult);
        for(i = 0; i < result_d.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects are detected";
            fill("black");
            confi = Math.floor(result_d[i].confidence * 100);
            text(result_d[i].label + "  " + confi + "%",result_d[i].x + 10,result_d[i].y + 10);
            noFill();
            stroke("red");
            strokeWeight(2);
            rect(result_d[i].x, result_d[i].y, result_d[i].width, result_d[i].height);

            if(result_d[i].label == "person") {
                document.getElementById("status").innerHTML = "Status : person is detected";
                ringtone.stop();
            }
            else{
                document.getElementById("status").innerHTML = "Status : baby not detected";
                ringtone.play();
            }
        }
        if(result_d.length < 0) {
            document.getElementById("status").innerHTML = "Status : baby not detected";
            ringtone.play();
        }
    }
}

function gotresult(error,results) {
    if(error) {
        console.error(error);
    }
    else{
        console.log(results);
        result_d = results;
    }
}


function modelloaded() {
    console.log("model is loaded");
    Status = true;
}