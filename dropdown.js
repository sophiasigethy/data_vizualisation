var keyword_1 = "corona"; //Dont use this. For internal use only. External please go to notify_keyword
var keyword_2 = "keines"

selectItemByValue(document.getElementById("year"), "2020")
selectItemByValue(document.getElementById("keyword1"), "corona")
selectItemByValue(document.getElementById("keyword2"), "keines");

function select_keyword_1(keyword) {
  change_keyword_1(keyword);
  selectItemByValue(document.getElementById("keyword1"), keyword)
}

function change_keyword_1(msg) {
  if (keyword_2 == msg) {
    selectItemByValue(document.getElementById("keyword2"), "keines");
    notify_keyword_2_changed("keines");
  }
  keyword_1 = msg;
  notify_keyword_1_changed(msg); 
}

document.querySelector("#year").onchange = function () {
  selectedYear = document.querySelector("#year").value;
  replace_graph(keyword_1, keyword_2, true, null, selectedYear);
  createSlider(selectedYear);
  update_virusicons("CW 00/2019");
  draw_wordcloud("CW 00/2019");
}

document.querySelector("#keyword1").onchange = function () {
   let msg = document.querySelector("#keyword1").value;
   change_keyword_1(msg);
}
document.querySelector("#keyword2").onchange = function () {
   let msg = document.querySelector("#keyword2").value;
   if (keyword_1 == msg) {
     selectItemByValue(document.getElementById("keyword2"), "keines");
     notify_keyword_2_changed("keines");
     alert("Keyword schon als Keyword 1 gewählt. Bitte anderes aussuchen.");
   } else {
     keyword_2 = msg;
     notify_keyword_2_changed(msg);
   }
}

//WANT THE CURRENT KEYWORD? PUT YOUR FUNCTION IN HERE
function notify_keyword_1_changed(keyword) {
  keyword_1 = keyword
  updateArticleKeyword(keyword);
  updateGoogleTrend(keyword);
  replace_graph(keyword_1, keyword_2, true, x.invert(currentValue), selectedYear);
  selected1.innerHTML =  "" + keyword + ""; 
}
function notify_keyword_2_changed(keyword) {
  keyword_2 = keyword
  updateArticleKeyword2(keyword);
  replace_graph(keyword_1, keyword_2, true, x.invert(currentValue), selectedYear);
  if (keyword == "keines") {
    selected2.innerHTML =  "";
  } else {
    selected2.innerHTML = "" + keyword + ""; 
  }
}

function selectItemByValue(elmnt, value){

  for(var i=0; i < elmnt.options.length; i++)
  {
    if(elmnt.options[i].value === value) {
      elmnt.selectedIndex = i;
      break;
    }
  }
}
