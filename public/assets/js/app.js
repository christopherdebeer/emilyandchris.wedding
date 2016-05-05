$('.nav .expander').on( 'click', function(ev){
	$(this).parent().toggleClass('expanded')
})


// $('select').select2({width: '200px'});


$('form').submit(function(ev){
	if (outstandingInputs().length > 0) {
		alert("Oops! It looks like you havn't completed the RSVP form. Missing: " + outstandingInputs().join(', ') )
		ev.preventDefault();
		return false;
	}
})


$('form input[name="attending"]').on( 'change', function(ev){
	var attending = $(this).val().slice(0,3) === "yes"
	$('.ifAttending').toggle( attending );
	$('.notAttending textarea').toggle( !attending );
	window.allowSubmit = true;

});

$('form .requirements').on( 'change', function(ev){
	$('textarea[name="requirementsextra"]').toggle( $('.requirements.complicated').is(':checked') );
});


function outstandingInputs() {
	var name = $('input[name="name"').val();
	var attending = $('input[name="attending"').val();
	var email = $('input[name="email"]').val()
	var outstanding = []

	if (name === "") outstanding.push('Name(s)')
	if (email === "") outstanding.push('Email')
	if (!window.allowSubmit) outstanding.push('Attending')

	return outstanding;
}
