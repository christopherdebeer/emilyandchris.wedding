$('.nav .expander').on( 'click', function(ev){
	$(this).parent().toggleClass('expanded')
})


// $('select').select2({width: '200px'});


$('form').submit(function(ev){
	if (outstandingInputs().length > 0) {
		alert("Oops! It looks like you havn't completed the RSVP form. \nMissing: " + outstandingInputs().join(', ') )
		ev.preventDefault();
		return false;
	}
})


$('form input[name="attending"]').on( 'change', function(ev){
	console.log( $(this).val() )
	var attending = $(this).val().slice(0,3) === "yes"
	$('.ifAttending').toggle( attending );
	$('.notAttending textarea').toggle( !attending );
	window.allowSubmit = true;

});

$('form .requirements').on( 'change', function(ev){
	$('textarea[name="requirementsextra"]').toggle( $('.requirements.complicated').is(':checked') );
});


$('form #number').on( 'change', function(ev){
	$('.numSeats').text(ev.target.value);
});





function outstandingInputs() {

	var outstanding = []
	var name, attending, email, transport, number;

	if (window.allowSubmit) {
		attending = $('input[name="attending"]:checked').val().slice(0,3);
	}
	number = $('input[name="number"]').val()
	name = $('input[name="name"]').val()
	email = $('input[name="email"]').val()
	transport = $('input[name="transport"]:checked').val()

	console.log( number )

	if (name === "") outstanding.push('Name(s)')
	if (attending === "yes" && email === "") outstanding.push('Email')
	if (!window.allowSubmit) outstanding.push('Attendance')
	if (attending !== "no," && number === "") outstanding.push('Number Attending')
	if (attending !== "no," && transport === "") outstanding.push('Transport')


	console.log( outstanding, name, attending, email, transport, number, window.allowSubmit )

	return outstanding;
}
