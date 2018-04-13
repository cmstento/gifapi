//get api key
//build buttons
//build dom
//set variables
//build url to query database
//run ajax call to api
//log queryURl
//log the resulting object
//transfer content to html
//log content to consoles
var topics = ['piano','tuba', 'trombone', 'piccolo', 'trumpet']
	topics.forEach(function (topic) {
		$(".buttons").append(`<button class="topic ${topic}">${topic}</button>`)
	})
	$('.buttons').click(function(event){
		var topic = event.target.innerHTML
		var url = `https://api.giphy.com/v1/gifs/search?api_key=wRRH4fNjW53kTaHGFotLxRQvNVg9YOIz&q=${topic}&limit=10&offset=0&rating=G&lang=en`
		getImages(url)
	})



function getImages(url) {
	$.ajax(url, {
		complete: handleResponse
	})
}


function handleResponse(responseObject) {
	var imageObjects = responseObject.responseJSON.data
	$('.images').html('')
	imageObjects.forEach(function(imageObject){
	console.log(imageObject)
		
		$('.images').append(
			`<img class="static ${imageObject.id}" src="${imageObject.images.original_still.url}" />
			<img style="display: none" class="animated ${imageObject.id}" src="${imageObject.images.original.url}" />`
		)
	})
	$('.images').click(function (event) {
		$(event.target).hide()
		if ($($(event.target)[0]).hasClass('static')) {
			$(`.animated.${$(event.target)[0].className.split(' ')[1]}`).show()
		} else {
			$(`.static.${$(event.target)[0].className.split(' ')[1]}`).show()
		}
	})
}
