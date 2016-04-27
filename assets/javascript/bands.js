$(document).ready(function() {

var bands = ["Pink Floyd","David Bowie","Radiohead","Depeche Mode","Neil Young","Joy Division","Psychedelic Furs","The Beatles","Billy Joel"];


for (var i = 0;i < bands.length;i++) {
	var a = $('<button>');
	a.attr("class","buttons");
	a.text(bands[i]);
	a.attr("data-name",bands[i]);
	$("#banddisplay").append(a);
}

$("#addband").on("click", function() {

	var newBand = $("#musicinput").val().trim();
	bands.push(newBand);
	
		var a = $('<button>');
		a.text(newBand);
		a.attr("class","buttons");
		a.attr("data-name",newBand);
		$("#banddisplay").append(a);
		
	
return false;
	});



function showImage() {


$("#bandpic").empty();
currentBand = $(this).attr("data-name");


	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + currentBand + "&api_key=dc6zaTOxFJmzC&limit=8";
	$.ajax ({
			url: queryURL,
			method: 'GET'
	})
		.done(function(response) {
			
			for (i = 0;i<response.data.length;i++) {
			pic = $("<img>");
			rating = $("<p>");
			still = response.data[i].images.fixed_height_still.url;
			animated = response.data[i].images.fixed_height.url;
			pic.attr("class","bandphoto");
			pic.attr("src",still);
			pic.attr("data-still",still);
			pic.attr("data-animated",animated);
			pic.attr("data-state","still");

			rating.append("Rating: " + response.data[i].rating);
			ratingdiv = $("<div>");
			ratingdiv.append(rating);
			imagediv = $("<div>");
			imagediv.append(pic);
			combodiv = $("<div>");
			combodiv.append(ratingdiv);
			combodiv.append(imagediv);
			combodiv.attr("class","combine");
			$("#bandpic").append(combodiv);
			
			if (i == response.data.length - 1) {
			 } // only works when inside the loop. Not efficient to run each time util all images are populated
				
				} 

				animationStatus();


				 //end of for loop to show and assign data to images
					});

		


return false;
}


function animationStatus() {
$(".bandphoto").on("click",function () {
				
				var currentState = $(this).attr("data-state");
				if (currentState == "still"){
                $(this).attr("src", $(this).data("animated"));
                $(this).attr("data-state", "animated");
            }else{
                $(this).attr("src", $(this).data("still"));
                $(this).attr("data-state", "still");
            }
			}); 
}

	

$(document).on('click', '.buttons', showImage);


});