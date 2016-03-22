$('.nav .expander').on( 'click', function(ev){
	$(this).parent().toggleClass('expanded')
})


$('select').select2({width: '200px'});


$('form').submit(function(ev){
	if (!formCompleted()) {
		alert("Oops! It looks like you havn't completed the RSVP form.")
		ev.preventDefault();
		return false;
	}
})


function formCompleted() {
	var name = $('input[name="name"').val();
	console.log(name)
	return ( name !== "");
}