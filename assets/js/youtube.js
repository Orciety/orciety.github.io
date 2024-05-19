// YouTube API stuff
var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Init empty array of iframe IDs, one from each video
var iframeIds = [];

// For each iframe you find, add its ID to the iframeIds array
var iframes = document.querySelectorAll(".video-item iframe");
iframes.forEach(function(iframe) {
	console.log('loaded iframeids');
	iframeIds.push(iframe.id);
});

// Once the YouTube API is ready, for each iframeId in your array, create
// a new YT player and give it the onReady event
function onYouTubeIframeAPIReady() {
	iframeIds.forEach(function(iframeId) {
		var player = new YT.Player(iframeId, {
			events: {
				onReady: onPlayerReady
			}
		});
	});
}

// Init empty array of iframe YT objects for use elsewhere
// Here I only use this to iterate through and pause all videos when
// another begins playing
var iframeObjects = [];

// Shared onReady event which adds events to each video's corresponding
// play and stop buttons
function onPlayerReady(event) {
	var iframeObject = event.target;
	var iframeElement = iframeObject.a;
	var videoContainer = iframeElement.parentElement;
	var play = videoContainer.querySelector(".play");
	var stop = videoContainer.querySelector(".stop");
	
	// Push current iframe object to array
	iframeObjects.push(iframeObject);

	play.addEventListener("click", function() {
		// Pause all videos currently playing
		iframeObjects.forEach(function(scopediframeObject) {
			scopediframeObject.pauseVideo();
			var scopediframeElement = scopediframeObject.a;
			scopediframeElement.classList.remove('isPlaying');
		});
		
		// Play selected video
		iframeObject.playVideo();
		iframeElement.classList.add('isPlaying');
	});
	
	stop.addEventListener("click", function() {
		iframeObject.pauseVideo();
		iframeElement.classList.remove('isPlaying');
	});
}