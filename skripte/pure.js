var userIArray = [];

jsonArray = null;

var httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = function() {
  if (httpRequest.readyState === 4) {
    if (httpRequest.status === 200) {
      jsonArray = JSON.parse(httpRequest.responseText);
      document.getElementById("oblast").innerHTML = jsonArray.oblast;
      startTimer(jsonArray.vreme, document.getElementById("time"));
    }
  }
}
httpRequest.open("GET", "podaci.json");
httpRequest.send();

// autocomplete search na dodavanje slova
var input = document.getElementById("userInput");
input.addEventListener("keyup", obrada); 
// za tab selektovanje 
input.addEventListener("keydown", function(e) {
  if(e.keyCode === 9) {
    e.preventDefault();
    input.value = document.getElementById("auto").firstChild.innerHTML;
  }
})


//uzmianje vrednosti iz autocomplete
document.getElementById("auto").addEventListener("click", function(e) {
  if (e.target.tagName.toLowerCase() === "p") {
    input.value = e.target.innerHTML;

  }
})

//dodavanje vrednosti u listu ubacenih gradova
document.getElementById("add").addEventListener("click", function() {
  var vrednost = input.value;
  if (vrednost !== "") {
    userIArray.push(vrednost);
    var outer = document.createElement("div");
    var close = document.createElement("span");
    var inner = document.createTextNode(vrednost);
    outer.appendChild(inner);
    outer.appendChild(close);
    document.getElementById("addedUI").appendChild(outer);
  }
})

//brisanje vrednosti izabranih gradova
document.getElementById("addedUI").addEventListener("click", function(e) {
  if (e.target.tagName.toLowerCase() === "span") {
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
  }
})

document.getElementById("zavrsi").addEventListener("click", function() {
  kraj();
})

function search() {
  var j = 0;
  var key = input.value.toLowerCase();
  var match = "";
  for (var i=0; i < jsonArray.ponudjene.length; i++) {
    if (j > 9) return match;
    if (jsonArray.ponudjene[i].toLowerCase().indexOf(key) > -1) {
      match += jsonArray.ponudjene[i]+",";
      j++;
    }
  }
  return match;
}

function obrada(e) {
  var auto = document.getElementById('auto');
  if (e.keyCode === 13) { //dodaj na enter
    e.preventDefault();
    var vrednost = input.value;
    if (vrednost !== "") {
      userIArray.push(vrednost);
      var outer = document.createElement("div");
      var close = document.createElement("span");
      var inner = document.createTextNode(vrednost);
      outer.appendChild(inner);
      outer.appendChild(close);
      document.getElementById("addedUI").appendChild(outer);
    }
  }
  var result = search();  
  if (auto.childElementCount > 0) {
    auto.innerHTML = "";
  }
  if (result !== "") {
    result = result.split(',');
    for (var i=0; i < result.length; i++) {
      var outer = document.createElement("p");
      var inner = document.createTextNode(result[i]);
      outer.appendChild(inner);
      auto.appendChild(outer);
    }
  }
}

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.innerHTML = minutes + ":" + seconds;

        if (--timer < 0) {   //kada tajmer stigne do 0
            timer = duration;
            kraj();
        }
    }, 1000);
}

function kraj() {
    var tacno = 0;
    for (i=0, l=userIArray.length; i<l; i++) {
        for (j=0, k=jsonArray.tacno.length; j<k; j++) {
            if (userIArray[i].toLowerCase() === jsonArray.tacno[j].toLowerCase()) {
                tacno++;
                break;
            }
        }
    }
    if (tacno !== 0) {
    	tacno=tacno / document.getElementById("addedUI").childElementCount * 100;
    	tacno=tacno.toFixed(2);
	}
    window.location.assign("index2.html?tacno="+tacno);
};