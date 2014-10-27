$(document).ready(function(){
	var searchfield = $("#search");
	var container = $("#photos");
	var timer;

	function instaSearch() {
		$(searchfield).addClass("loading");
		$(container).empty();
		var query = $(searchfield).val();

		$.ajax({
			type: 'POST',
			url: '../../models/instasearch.php',
			data: "query="+query,
			success: function(data){
				$(searchfield).removeClass("loading");

				$.each(data, function(i, item) {
					var code = '<div class="p"><a href="'+data[i].url+'" target="_blank"><img src="'+data[i].thumb+'"></a></div>';
					$(container).append(code);
				});
			},
			error: function(xhr, type, exception) {
				$(searchfield).removeClass("loading");
				$(container).html("Error: " + type);
			}
		});
	}

	/**
	 * keycode glossary
	 * 32 = SPACE
	 * 188 = COMMA
	 * 189 = DASH
	 * 190 = PERIOD
	 * 191 = BACKSLASH
	 * 13 = ENTER
	 * 219 = LEFT BRACKET
	 * 220 = FORWARD SLASH
	 * 221 = RIGHT BRACKET
	 */
	$(searchfield).keydown(function(e){
      if(e.keyCode == '32' || e.keyCode == '188' || e.keyCode == '189' || e.keyCode == '13' || e.keyCode == '190' || e.keyCode == '219' || e.keyCode == '221' || e.keyCode == '191' || e.keyCode == '220') {
         e.preventDefault();
       } else {
    		clearTimeout(timer);

			timer = setTimeout(function() {
    		  instaSearch();
			}, 900);
       }
    });

});