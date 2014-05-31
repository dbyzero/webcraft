$(document).ready(function(){
	//progress bar
	$(function() {
		$( "#progressbar" ).progressbar({
			value: 37
		});
	});

	//tootips
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

	//Login and create account
	$( "#popup-login-createaccount" ).dialog({
		autoOpen: false,
		height: 300,
		width: 350,
		resizable: false,
		modal:true,
		buttons: {
			Close: function() {
				$( this ).dialog( "close" );
			}
		}
	});
	$("#link-menu-join-us").click(function(){
		$( "#popup-login-createaccount" ).dialog("open");
	});
	$("#popup-login-createaccount button").click(function(){
	});
});