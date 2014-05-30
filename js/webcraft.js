$(document).ready(function(){
	$(function() {
		$( "#progressbar" ).progressbar({
			value: 37
		});
	});
	$( document ).tooltip({
	  position: {
		my: "center bottom",
		at: "center top",
		using: function( position, feedback ) {
			$( this ).css( position );
			$( "<div>" )
				.addClass( "arrow" )
				.addClass( feedback.vertical )
				.addClass( feedback.horizontal )
				.appendTo( this );
			}
		},
		show: { 
			duration: 0
		},
		hide: { 
			duration: 0
		}
	});
});