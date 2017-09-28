$( document ).ready(function() {

    console.log( "ready!" );

    $('#start').click(function(e){
    	e.preventDefault()
    	var bpm = $('#bpm').val()
    	$.get( "blink/" + bpm );
    })

    $('#stop').click(function(e){
    	e.preventDefault()
    	$.get( "stop/", function( data ) {
		  console.log( "Off." );
		});
    })
})