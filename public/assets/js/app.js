$('.nav .expander').on( 'click', function(ev){
	$(this).parent().toggleClass('expanded')
})


// $('select').select2({width: '200px'});


$('form').submit(function(ev){
	if (!formCompleted()) {
		alert("Oops! It looks like you havn't completed the RSVP form.")
		ev.preventDefault();
		return false;
	}
})


$('form input[name="attending"]').on( 'change', function(ev){
	$('.ifAttending').toggle( $(this).val() === "yes" );
	$('.notAttending textarea').toggle( $(this).val() === "no" );
	window.allowSubmit = true;

});

$('form .requirements').on( 'change', function(ev){
	$('textarea[name="requirementsextra"]').toggle( $('.requirements.complicated').is(':checked') );
});


function formCompleted() {
	var name = $('input[name="name"').val();
	var attending = $('input[name="attending"').val();
	console.log(name, attending)
	return ( name !== "" && window.allowSubmit);
}
