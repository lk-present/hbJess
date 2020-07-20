var bdd =
[
  {
    word: "Start",
    text: "Jessica"
  },
  {
    word: "Jessica",
    text: "Sie ist süß, fürsorglich und macht einfach Spaß.<br>\
           Sie macht schlechte Zeiten glücklich und glückliche Zeiten noch glücklicher.<br>\
           Sie ist liebenswert! Hast du sie lächeln sehen?! Einfach schön<br>\
           Sie ist die beste Freundin, die ich jemals brauchen könnte.."
  },
  {
    word: "fürsorglich",
    text: "Days and nights we've talked together,<br>\
           Maybe about our lives or maybe about the weather,<br>\
           She'd help me when I felt down,<br>\
           She never let her best friend frown."
  },
  {
    word: "glücklich",
    text: "You've been the reason for my smile a lot of days,<br>\
           Everytime my mind was in haze,<br>\
           You were there with your pics all silly,<br>\
           Could anyone be anymore perfect really?"
  },
  {
    word: "liebenswert",
    text: "I don't want anything except your happiness,<br>\
           Trust me you're a blessing Jess.<br>\
           You make me a better person, I've learned from you so much,<br>\
           Never change, and believe me, you're perfect as such."
  },
  {
    word: "beste",
    text: "Here I wish you Happy Birthday! I just love you,<br>\
           I'm a grandpa? Haha now you join the club too!<br>\
           Just stay safe and stay happy.. that is all that I need<br>\
           You are just a perfect friend indeed ^^."
  }
];

/** ----- GLOBAL VARIABLES ----- **/
var poem = document.getElementById("poem");
var next = document.getElementById("next");
var back = document.getElementById("back");
var POEM_TO_SET_AFTER_TRANSITION = "";
var CURRENT_POEM = "";
var POEM_HISTORY = [];

//Auto set texts on center of the screen
function resize() {
  poem.style.left = Math.floor(window.innerWidth/2 - poem.offsetWidth/2) + "px";
  poem.style.top = Math.floor(window.innerHeight/2 - poem.offsetHeight/2) + "px";
  next.style.left = Math.floor(window.innerWidth/2 - next.offsetWidth/2) + "px";
  next.style.top = Math.floor(window.innerHeight/2 - next.offsetHeight/2) + "px";
  back.style.transform = "translateY(" + window.innerHeight*3/4 + "px)";
}

window.onresize = () => resize();

//Get text of a word in db (WARNING : can return null)
function getPoemFromWord(word){
  var ret = null;
  bdd.forEach((elem) =>{
    if(elem.word.toUpperCase() == word.toUpperCase()){
      ret = elem.text;
    }
  });
  return ret;
}

//Replace a word by a link to the goToPoem function
function replaceWordByLink(text, word){
  var reg = new RegExp(word, 'gi');
  var link = "<span class='link' onclick={goToPoem('" +
      word + "')}>" + word + "</span>";
  
  return text.replace(reg, link);
}

function setPoem(word){
  //init poem div
  poem.innerHTML = "";
  poem.classList.remove("hide");
  
  //Get poem text
  var poemText = getPoemFromWord(word);
  
  //Replace all words
  bdd.forEach(elem => {
    if(elem.word.toUpperCase() != word.toUpperCase()){
      poemText = replaceWordByLink(poemText, elem.word);
    }
  });
  
  //Set new text
  var text = document.createElement("h2");
  text.innerHTML = poemText;
  poem.appendChild(text);
  
  //Show back button
  console.log(POEM_HISTORY)
  if(POEM_HISTORY.length > 0){
    back.style.display = "block";
  }
  else{
    back.style.display = "none";
  }
  back.onclick = (e) => {
    if(POEM_TO_SET_AFTER_TRANSITION == ""){
      let poem = POEM_HISTORY.pop();
      goToPoem(poem, true);
    }
  }
  
  CURRENT_POEM = word;
}

function goToPoem(word, backward=false){
  if(POEM_TO_SET_AFTER_TRANSITION == ""){
    back.style.display = "none";
    
    //Set new text
    var text = document.createElement("h2");
    var newPoem = getPoemFromWord(word);
    bdd.forEach(elem => {
      if(elem.word.toUpperCase() != word.toUpperCase()){
        newPoem = replaceWordByLink(newPoem, elem.word);
      }
    });
    text.innerHTML = newPoem;
    next.appendChild(text);

    resize();

    poem.classList.add("hide");
    next.classList.add("show");
    
    POEM_TO_SET_AFTER_TRANSITION = word;
    
    if(!backward){
      POEM_HISTORY.push(CURRENT_POEM);
    }
  }
}

//Function called when transition is done to set 
//the next poem as the current poem
function onTransitionEnd(){
  setPoem(POEM_TO_SET_AFTER_TRANSITION);
  next.innerHTML = "";
  next.classList.remove("show");
  poem.classList.remove("hide");

  resize();

  POEM_TO_SET_AFTER_TRANSITION = "";
}
next.addEventListener("transitionend", onTransitionEnd);

setPoem("start");
resize();