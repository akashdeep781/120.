Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:100

});

camera=document.getElementById("camera");
Webcam.attach(camera);

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='selfie_image' src="+data_uri+">";
    });
}

console.log("ml5 Version:",ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Qorn6llzx/model.json",modelLoaded);

function modelLoaded()
{
    console.log("model Loaded");
}

var prediction_1="";
var prediction_2="";

function identify()
{
    img=document.getElementById("selfie_image");
    classifier.classify(img,gotResult);
}

function speak()
{
    var synth=window.speechSynthesis;
    speak_data_1="First Prediction is "+prediction_1;
    speak_data_2=" And  The Second Prediction is "+prediction_2;
    var utterThis=new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function gotResult(error,results)
{
   if(error){
    console.error(error);
   }
   else{
    console.log(results);

    document.getElementById("result_gesture_name").innerHTML=results[0].label;
    document.getElementById("result_gesture_name1").innerHTML=results[1].label;

    prediction_1=results[0].label;
    prediction_2=results[1].label;

    speak();  

    if(results[0].label="Best")
    {
        document.getElementById("result_gesture_name").innerHTML="&#128077;";
    }
    if(results[0].label="Amazing")
     {
        document.getElementById("result_gesture_name").innerHTML="&#128076;";
    }
    if(results[0].label="Victory")
    {
        document.getElementById("result_gesture_name").innerHTML="&#9996;";
    }
    if(results[1].label="Best")
    {
        document.getElementById("result_gesture_name1").innerHTML="&#128077;,&#10084;";
    }
    if(results[1].label="Amazing")
    {
        document.getElementById("result_gesture_name1").innerHTML="&#128076;,&#128156;";
    }
    if(results[1].label="Victory")
    {
        document.getElementById("result_gesture_name1").innerHTML="&#9996;,&#128153;";
    }
}

}