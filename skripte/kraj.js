var procenatTacnih = parseInt(urlParam('tacno'));

setTimeout( function(){ 
    document.getElementById("proc").style.width = procenatTacnih+"%";
}, 400);

document.getElementById("brojTacnih").innerHTML = procenatTacnih+"%";

function urlParam(name) {
     	url = window.location.href;
    	var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
    	if (!results) { 
        	return undefined;
    	}
    	return results[1] || undefined;
}