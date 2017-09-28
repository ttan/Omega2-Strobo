$(document).ready(function() {
    $('#start').click(function(e) {
        e.preventDefault()
        var bpm = $('#bpm').val()
        $('#startS').html('Loading strobo, it might take a while...').fadeIn()
        if (Math.floor(bpm) == bpm && $.isNumeric(bpm) && bpm > 0) {
            $.get("blink/" + bpm, function(data) {
                console.log(data)
            });
        } else {
            alert('BPM must be an integer number greater than 0!')
        }
    })

    $('#getBPM').click(function(event) {
        event.preventDefault()
        $('#loading').html('Wait while loading...')
        $('#loading').removeClass('alert alert-warning').fadeIn()
        var artist = $('#artist').val()
        var song = $('#song').val()

        $.get('/bpm/' + artist + '/' + song, function(data) {
            /*optional stuff to do after success */
            console.log(data)
            if (data != "not found") {
                $('#bpm').val(data)
                $('#loading').hide()
            } else {
                $('#bpm').val(":(")
                $('#loading').addClass('alert alert-warning')
                $('#loading').html('Song not found, try another one!')
            }

            console.log(data)
        });
    });

    $('#stop').click(function(e) {
        e.preventDefault()
        $('#startS').hide()
        $.get("stop/", function(data) {
            console.log("Off.");
        });
    })
})