function redraw() {
    var mx = parseInt(document.body.clientWidth);
    
    if (mx > 600) mx = 600;
    mx-=50;
        
    var elements = document.getElementsByClassName("paper_column");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.width=(mx+"px");
    }
    
    var elements = document.getElementsByClassName("paper_column2");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.width=(mx+"px");
    }
}

//nothing to flatten on mobile - avoids execption
function flatten(i) {};

function start() {
	redraw();
}

$(document.body).removeClass("no_js");

$(document).on('ready', function () {
	$(window).on('resize', function () {
        redraw();
    }).trigger('resize'); // Trigger resize handlers.
}); //ready


