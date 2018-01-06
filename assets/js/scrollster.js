// Insert client ID here (requires an instagram account)
// You can also pass an id in the querystring
var clientId = '';

var enableQuery = true;

// Grab the URL query string
// From: http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
var urlParams;
(window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};

    //Instantiate defaults
    urlParams["tag"] = "";
	urlParams["speed"] = 90; //seconds
	urlParams["pause"] = 10; //seconds
	urlParams["reload"] = 60; //minutes
	urlParams["clientid"] = "";
	urlParams["images"] = 60;
	urlParams["sort"] = "none";
	urlParams["size"] = "large";
	urlParams["background"] = "";
	urlParams["color"] = "";

	if(enableQuery) {   
    	while (match = search.exec(query)) {
        	urlParams[decode(match[1]).toLowerCase()] = decode(match[2]).toLowerCase();
    	}
    }
})();

//Check for a valid clientId, either set at top, or in query string
// urlParam takes priority
if(urlParams["clientid"] != "") {
	clientId = urlParams["clientid"];
}
if(clientId != "") {
	// Determine if we're getting a tag or the popular page
	var getType = "popular";
	var tag = urlParams["tag"];
	if(tag != "") {
		getType = "tagged";
		$(".tag-header h1").text("#" + urlParams["tag"]);
		$("title").text("#" + urlParams["tag"] + ' | scrollster for instagram');
	} else {
		$(".tag-header h1").text("popular");
		$("title").text("popular | scrollster for instagram");
	}

	// Check for what to output in the template
	var output = '<div class="tile" style="width:{width}px;">';
	if("link" in urlParams) {
		output = output + '<a href="{{link}}">';
	}
	output = output + '<img src="{{image}}" width="100%" />';
	if("author" in urlParams) {
		output = output + '<span class="author">{{model.user.username}}</span>';
	}
	if("caption" in urlParams) {
		output = output + '<span class="caption">{{caption}}</span>';
	}
	if("likes" in urlParams) {
		output = output + '<span class="likes"><span class="heart"></span>{{likes}}</span>';
	}
	if("comments" in urlParams) {
		output = output + '<span class="comments"><span class="comment"></span>{{comments}}</span>';
	}
	if("link" in urlParams) {
		output = output + '</a>'; //Kinda hackish...
	}
	output = output + '</div>';

	var size = urlParams["size"]; 
	switch(size) {
		case 'small':
			size = 'thumbnail';
			break;
		case 'medium':
			size = 'low_resolution';
			break;
		case 'large':
			size = 'standard_resolution';
			break;
		default:
			size = 'standard_resolution';
	}

	// Make sure images is a number
	var images = urlParams["images"];
	if(isNaN(images)) {
		images = 60;
	} else {
		if(images > 60) {
			images = 60;
		}
	}
	
	// Select Sort Method
	var sort = urlParams["sort"];
	switch(sort) {
		case 'none':
			sort = "none";
			break;
		case 'most-recent':
			sort = "most-recent";
			break;
		case 'least-recent':
			sort = "least-recent";
			break;
		case 'most-liked':
			sort = "most-liked";
			break;
		case 'least-liked':
			sort = "least-liked";
			break;
		case 'most-commented':
			sort = "most-commented";
			break;
		case 'least-commented':
			sort = "least-commented";
			break;
		case 'random':
			sort = "random";
			break;
		default:
			sort = "none";
	}

	// From: http://instafeedjs.com/
	// Get instagram images
	var feed = new Instafeed({
    	get: getType,
    	tagName: tag,
    	clientId: clientId,
    	sortBy: sort,
    	resolution: size,
    	template: output,
    	limit: images,
    	after: function() {
	    	var multiplier = 153;
	    	var lowRange = 3;
	    	var highRange = 4;
	    	switch(size) {
		    	case 'thumbnail':
		    		multiplier = 50;
		    		lowRange = 3;
		    		highRange = 3;
		    		break;
		    	case 'low_resolution':
		    		multiplier = 102;
		    		lowRange = 2;
		    		highRange = 3;
					break;
				case 'standard_resolution':
					multiplier = 160;
					lowRange = 3;
					highRange = 4;
					break;
				default:
					multiplier = 153;
					lowRange = 3;
					highRange = 4;
	    	}
	    	$(".tile").each(function(){
				var w = Math.floor(Math.random() * (highRange - lowRange + 1)) + lowRange;
				w = w * multiplier;
				$(this).css({width: w});
			});
    	},
	});
	feed.run();
	
	// Set colors
	var background = urlParams["background"];
	if(background != "") {
		$("body, #instafeed, .tag-header h1").css("background", background);
	}
	var color = urlParams["color"];
	if(color != "") {
		$("body, a, a:hover, a:focus, a:active").css("color", color);
	}

	// Build the grid
	// From: http://vnjs.net/www/project/freewall/example/flex-grid.html
	$(window).load(function() {
		var wall = new freewall("#instafeed");
		wall.reset({
			selector: '.tile',
			animate: true,
			cellW: 150,
			cellH: 'auto',
			onResize: function() {
				wall.fitWidth();
			}
		});
		wall.fitWidth();
	});

	// Fullscreen on click
	// From: http://sindresorhus.com/screenfull.js/
	// From: http://stackoverflow.com/questions/10935589/javascript-fullscreen-api-plugin
	$('.tag-header').on('click', '*', function() {
        screenfull.request();
	});

	// Auto scroller
	// From: http://jsfiddle.net/NaP8D/11/
	var speed = urlParams["speed"];
	if(isNaN(speed)) {
		speed = 60 * 1000;
	} else {
		speed = speed * 1000;
	}
	var pause = urlParams["pause"];
	if(isNaN(pause)) {
		pause = 60 * 1000;
	} else {
		pause = pause * 1000;
	}
	if(speed !== 0) {
		$(window).load(function() {		
			// From: http://jsfiddle.net/yjYJ4/
			$("html, body").animate({
	    		scrollTop: $(document).height()
			}, speed);
			setTimeout(function() {
        		$('html, body').animate({
	    			scrollTop: 0
				}, speed);
			}, pause);
			setInterval(function(){
    			$("html, body").animate({
	    			scrollTop: $(document).height()
				}, speed);
				setTimeout(function() {
           			$('html, body').animate({
	    				scrollTop: 0
					}, speed);
				}, pause);
			}, (speed + pause) * 2);
		});		
	}

	// Reload the page every hour
	// From: http://stackoverflow.com/questions/12173800/refresh-current-page-after-set-timeout-function-call
	var reload = urlParams["reload"];
	if(isNaN(reload)) {
		reload = 60 * 60 * 1000;
	} else {
		reload = reload * 60 * 1000;
	}
	setTimeout(function(){
    	location.reload();
	}, reload);
} else {
	var error = '<div class="error">Error: No client ID found.  You can either add one to scrollster.js or use one in the url.<br/>To get a Client ID visit <a href="https://instagram.com/developer/clients/manage/">https://instagram.com/developer/clients/manage/</a></div>';
	document.write(error);
}