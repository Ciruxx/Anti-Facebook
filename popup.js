
document.addEventListener('DOMContentLoaded', function() {

	var enableButton = document.getElementById('enableButton');
	enableButton.addEventListener('click', function() {
		document.getElementById("status").style = "color:#4CAF50;";
		document.getElementById("status").innerHTML = "ON";
		chrome.extension.sendMessage({ msg: "startFunc" });
	}, false);

	var disableButton = document.getElementById('disableButton');
	disableButton.addEventListener('click', function() {
		document.getElementById("status").style="color:#f44336;"
		document.getElementById("status").innerHTML = "OFF";
		chrome.extension.sendMessage({ msg: "stopFunc" });
	}, false);

	//chrome.extension.sendMessage({ msg: "startFunc" });
	chrome.extension.sendMessage({ msg: "isActive" });

}, false);

chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse){
		if(request.msg == "true"){
			document.getElementById("status").style = "color:#4CAF50;";
			document.getElementById("status").innerHTML = "ON";
		}
		if(request.msg == "false"){
			document.getElementById("status").style="color:#f44336;"
			document.getElementById("status").innerHTML = "OFF";
		}
	}
);
