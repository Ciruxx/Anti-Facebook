document.addEventListener('DOMContentLoaded', function() {

	var doneButton = document.getElementById('doneButton');
	doneButton.addEventListener('click', function() {
		var actualValue = document.getElementById("maxTime").value
		chrome.extension.sendMessage({ msg: "set_maxTime:"+actualValue });
		showSnackBar();
	}, false);

	chrome.extension.sendMessage({ msg: "get_maxTime" });

}, false);

chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse){
		if(request.msg.indexOf("get_maxTime") !== -1){
			console.log("Invio del maxTime")
			var res = request.msg.split(":");
			var number = Number(res[1]);
			document.getElementById("maxTime").value = number
		}
	}
);

function showSnackBar() {
	var x = document.getElementById("snackbar")
	x.className = "show";
	setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
