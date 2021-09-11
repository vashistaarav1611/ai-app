prediction_1 = "";
prediction_2 = "";
Webcam.set({
	width: 350,
	height: 300,
	image_format: "png",
	png_quality: 90
});
cam = document.getElementById("camera");
Webcam.attach(cam);

function take_snapshot(data_uri) {
	Webcam.snap(function (data_uri) {
		document.getElementById("result").innerHTML = '<img src="' + data_uri + '" id="pic">';
	});
}
console.log("ml5 version", ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/8Ebt9XUG4/model.json", model_loaded)

function model_loaded() {
	console.log("model is loaded");
}

function speak() {
	var synth = window.speechSynthesis;
	speak_data_1 = "the first prediction is " + prediction_1;
	speak_data_2 = "the second prediction is " + prediction_2;
	var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
	synth.speak(utterThis);

}

function identify() {
	img = document.getElementById("pic");
	classifier.classify(img, got_res);
}

function got_res(error, results) {
	if (error) {
		console.error(error);
	} else {
		console.log(results);
		document.getElementById("res_emotion_name1").innerHTML = results[0].label;
		document.getElementById("res_emotion_name2").innerHTML = results[1].label;
		prediction_1 = results[0].label;
		prediction_2 = results[1].label;
		speak();
		if (results[0].label == "happy") {
			document.getElementById("update_emoji1").innerHTML = "😀";
		}
		if (results[0].label == "sad") {
			document.getElementById("update_emoji1").innerHTML = "😭";
		}
		if (results[0].label == "anger") {
			document.getElementById("update_emoji1").innerHTML = "😡";
		}
		
		if (results[1].label == "happy") {
			document.getElementById("update_emoji2").innerHTML = "😀";
		}
		if (results[1].label == "sad") {
			document.getElementById("update_emoji2").innerHTML = "😭";
		}
		if (results[1].label == "anger") {
			document.getElementById("update_emoji2").innerHTML = "😡";
		}
	}
}
