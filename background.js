var time = 0;
var maxTime = 300;
var isActive = false;
var t;


console.log("Avviato!");

start();

function start(){
	chrome.storage.sync.get("maxTime", function (obj) {
		console.log("Recuperato maxTime: "+obj.maxTime);
		if(obj.maxTime == null){
			maxTime = 300;
		}
		else{
			maxTime = obj.maxTime;
		}
	});
	isActive=true;
	t=setInterval(mainLoop,1000);
}

function mainLoop(){
	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {

		var url = tabs[0].url;

		var l = getLocation(url);
		console.log(l.hostname)

		if(l.hostname == "www.facebook.com"){
			time++
			console.log("Sei attualmente su Facebook da "+time+" secondi");
			if(time>maxTime){
				alert("Sono "+maxTime+" secondi che stai su Facebook, hai da fare!");
				time=0;
			}
		}
		else{
			time=0
		}

	});
}

var getLocation = function(href) {
	var l = document.createElement("a");
	l.href = href;
	return l;
};

chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse){
		if(request.msg == "startFunc"){
			if(!isActive){
				start();
			}
		}
		if(request.msg == "stopFunc"){
			isActive=false;
			clearInterval(t);
		}
		if(request.msg == "isActive"){
			chrome.extension.sendMessage({ msg: ""+isActive });
		}
		if(request.msg == "get_maxTime"){
			chrome.extension.sendMessage({ msg: "get_maxTime:"+maxTime });
		}
		if(request.msg.indexOf("set_maxTime") !== -1){
			var res = request.msg.split(":");
			var number = Number(res[1]);
			maxTime = number;
			saveSettings(number);
		}
	}
);

function saveSettings(seconds) {
	// Get a value saved in a form.
	var theValue = seconds;
	// Check that there's some code there.
	if (!theValue) {
		message('Error: No value specified');
		return;
	}
	// Save it using the Chrome extension storage API.
	chrome.storage.sync.set({'maxTime': theValue}, function() {
		// Notify that we saved.
		console.log('Settings saved');
	});
}



