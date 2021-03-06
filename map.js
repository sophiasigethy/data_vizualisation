 //Making global for later size update:
 var bayern_virus;
 var baden_virus;
 var nrw_virus;
 var hessen_virus;
 var niedersachsen_virus;
 var schleswigholst_virus;
 var mecklvorp_virus;
 var saarland_virus;
 var rheinlandpfalz_virus;
 var sachsen_virus;
 var thueringen_virus;
 var hamburg_virus;
 var bremen_virus;
 var berlin_virus;
 var brandenburg_virus;
 var sachsenanhalt_virus;

 var bayern_virus_value = 0;
 var baden_virus_value = 0;
 var nrw_virus_value = 0;
 var hessen_virus_value = 0
 var niedersachsen_virus_value = 0;
 var schleswigholst_virus_value = 0;
 var mecklvorp_virus_value = 0;
 var saarland_virus_value = 0;
 var rheinlandpfalz_virus_value = 0;
 var sachsen_virus_value = 0;
 var thueringen_virus_value = 0;
 var hamburg_virus_value = 0;
 var bremen_virus_value = 0;
 var berlin_virus_value = 0;
 var brandenburg_virus_value = 0;
 var sachsenanhalt_virus_value = 0;
 
 
 var widthMap = 500,
    heightMap = 620,
    focused = null,
    geoPath;
    bayern=null;
    trendListAverage=null;
    trendList=null;
    map_calendarweek=0;
    map_year=0;
    map_currentWord="corona";
    checkboxLabel= document.getElementById("checkboxLabel");
    //description_legend_map= document.getElementById("popupLegend");
    berlinTest=null;
    x_map=0;
    y_map=0;
    popUpDescription= document.getElementById("popupWindows");
    popUpHeadline= document.getElementById("popupHeadlineBL");
    bayern_trendValue=0;
    baden_trendValue=0;
    brandenburg_trendValue=0;
    berlin_trendValue=0;
    bremen_trendValue=0;
    hamburg_trendValue=0;
    hessen_trendValue=0;
    nrw_trendValue=0;
    niedersachsen_trendValue=0;
    sachen_trendValue=0;
    sachsenA_trendValue=0;
    rheinland_trendValue=0;
    schleswig_trendValue=0;
    mecklenburg_trendValue=0;
    thüringen_trendValue=0;
    saarland_trendValue=0;
    mypopup = document.getElementById("popupWindows");
    currentHoveredState=null;
    zoomIn = false;
    currentClicked_virus=null;
    currentClicked_state=null;
    
    
    //grüntöe
    //color_scheme_map=['#00671a', '#29772c', '#43873e', '#5b9850', '#72a964', '#8aba78', '#a2cb8d', '#bbdba4', '#d5ecbd', '#f4fae1'];
   //ampel
    //color_scheme_map=['#80c83e', '#b1dc4a', '#e4ef57', '#fff25c', '#ffcf4d', '#ffa440',  '#f97931',  '#ec4a1f',  '#d60000', '#800026'];
    //rottöne
    color_scheme_map=['ffffcc', '#ffefa5', '#fedc7f', '#febf5b', '#fd9d43', '#fc7034',  '#f23d26',  '#d91620',  '#b40325', '#800026'];
    


var svg = d3.select(".tempcenter")
  .append("svg")
    .attr("viewBox", "0 0 500 620")
    .attr("align","center");

/*svg.append("rect")
    .attr("class", "background")
    .attr("width", widthMap)
    .attr("height", heightMap);*/

var g = svg.append("g")
  .append("g")
    .attr("id", "states");

getTrendValueAverage(); 
getTrendValue();

d3.select("#myCheckbox").on("change",update);
d3.json("data/mapData/statesGermany.json", function(collection) {

  var bounds = d3.geo.bounds(collection),
      bottomLeft = bounds[0],
      topRight = bounds[1],
      rotLong = -(topRight[0]+bottomLeft[0])/2;
      center = [(topRight[0]+bottomLeft[0])/2+rotLong, (topRight[1]+bottomLeft[1])/2],
      
      //default scale projection
      projection = d3.geo.albers()
        .parallels([bottomLeft[1],topRight[1]])
        .rotate([rotLong,0,0])
        .translate([widthMap/2,heightMap/2])
        .center(center),
        
      bottomLeftPx = projection(bottomLeft),
      topRightPx = projection(topRight),
      scaleFactor = 1.00*Math.min(widthMap/(topRightPx[0]-bottomLeftPx[0]), heightMap/(-topRightPx[1]+bottomLeftPx[1])),
      
      projection = d3.geo.albers()
        .parallels([bottomLeft[1],topRight[1]])
        .rotate([rotLong,0,0])
        .translate([widthMap/2,heightMap/2])
        .scale(scaleFactor*0.975*1000)
        .center(center);

  geoPath = d3.geo.path().projection(projection);
    
  var graticule = d3.geo.graticule()
      .step([1, 1]);
      
  bayern_virus = svg.append('image')
  .attr('xlink:href', 'coronavirus-centered.svg')
  .attr("id", "bayernVirus")
  .attr('width', 100)
  .attr('height', 100)
  .attr("x", "260")
  .attr('y', '430')
  .on("click", clickBayern)
  .on("mouseover", popUpBayern)
  .on("mouseout", hidePopupWindow);
  baden_virus = svg.append('image')
  .attr('xlink:href', 'coronavirus-centered.svg')
  .attr("id", "badenVirus")
  .attr('width', 100)
  .attr('height', 100)
  .attr("x", "130")
  .attr('y', '450')
  .on("mouseover", popUpBaden)
  .on("mouseout", hidePopupWindow)
  .on("click", clickBaden);
  nrw_virus = svg.append('image')
  .attr('xlink:href', 'coronavirus-centered.svg')
  .attr("id", "nrwVirus")
  .attr('width', 100)
  .attr('height', 100)
  .attr("x", "50")
  .attr('y', '240')
  .on("mouseover", popUpNRW)
  .on("mouseout", hidePopupWindow)
  .on("click", clickNRW);
  hessen_virus = svg.append('image')
  .attr('xlink:href', 'coronavirus-centered.svg')
  .attr("id", "hessenVirus")
  .attr('width', 100)
  .attr('height', 100)
  .attr("x", "130")
  .attr('y', '300')
  .on("mouseover", popUpHessen)
  .on("mouseout", hidePopupWindow)
  .on("click", clickHessen);
  niedersachsen_virus = svg.append('image')
  .attr('xlink:href', 'coronavirus-centered.svg')
  .attr("id", "niedersachsenVirus")
  .attr('width', 100)
  .attr('height', 100)
  .attr("x", "160")
  .attr('y', '150')
  .on("mouseover", popUpNiedersachsen)
  .on("mouseout", hidePopupWindow)
  .on("click", clickNiedersachsen);
  schleswigholst_virus = svg.append('image')
  .attr('xlink:href', 'coronavirus-centered.svg')
  .attr("id", "schleswigVirus")
  .attr('width', 100)
  .attr('height', 100)
  .attr("x", "170")
  .attr('y', '30')
  .on("mouseover", popUpSchleswig)
  .on("mouseout", hidePopupWindow)
  .on("click", clickSchleswig);
  mecklvorp_virus = svg.append('image')
  .attr('xlink:href', 'coronavirus-centered.svg')
  .attr("id", "mecklenburgVirus")
  .attr('width', 100)
  .attr('height', 100)
  .attr("x", "280")
  .attr('y', '70')
  .on("mouseover", popUpMecklenburg)
  .on("mouseout", hidePopupWindow)
  .on("click", clickMecklenburg);
  saarland_virus = svg.append('image')
  .attr('xlink:href', 'coronavirus-centered.svg')
  .attr("id", "saarlandVirus")
  .attr('width', 100)
  .attr('height', 100)
  .attr("x", "30")
  .attr('y', '390')
  .on("mouseover", popUpSaarland)
  .on("mouseout", hidePopupWindow)
  .on("click", clickSaarland);
  rheinlandpfalz_virus = svg.append('image')
  .attr('xlink:href', 'coronavirus-centered.svg')
  .attr("id", "rheinlandVirus")
  .attr('width', 100)
  .attr('height', 100)
  .attr("x", "60")
  .attr('y', '340')
  .on("mouseover", popUpRheinland)
  .on("mouseout", hidePopupWindow)
  .on("click", clickRheinland);
  sachsen_virus = svg.append('image')
  .attr('xlink:href', 'coronavirus-centered.svg')
  .attr("id", "sachsenVirus")
  .attr('width', 100)
  .attr('height', 100)
  .attr("x", "340")
  .attr('y', '270')
  .on("mouseover", popUpSachsen)
  .on("mouseout", hidePopupWindow)
  .on("click", clickSachsen);
  thueringen_virus = svg.append('image')
  .attr('xlink:href', 'coronavirus-centered.svg')
  .attr("id", "thüringenVirus")
  .attr('width', 100)
  .attr('height', 100)
  .attr("x", "230")
  .attr('y', '290')
  .on("mouseover", popUpThüringen)
  .on("mouseout", hidePopupWindow)
  .on("click", clickThüringen);
  hamburg_virus = svg.append('image')
  .attr('xlink:href', 'coronavirus-centered.svg')
  //.attr("id", "hamburgVirus")
  .attr('width', 100)
  .attr('height', 100)
  .attr("x", "180")
  .attr('y', '85')
  .attr("id", "virusHamburg")
  .on("mouseover", popUpHamburg)
  .on("mouseout", hidePopupWindow)
  .on("click", clickHamburg);
  bremen_virus = svg.append('image')
  .attr('xlink:href', 'coronavirus-centered.svg')
  .attr("id", "bremenVirus")
  .attr('width', 100)
  .attr('height', 100)
  .attr("x", "130")
  .attr('y', '120')
  .on("mouseover", popUpBremen)
  .on("mouseout", hidePopupWindow)
  .on("click", clickBremen);
  berlin_virus = svg.append('image')
  .attr('xlink:href', 'coronavirus-centered.svg')
  .attr("id", "berlinVirus")
  .attr('width', 100)
  .attr('height', 100)
  .attr("x", "330")
  .attr('y', '160')
  .on("mouseover", popUpBerlin)
  .on("mouseout", hidePopupWindow)
  .on("click", clickBerlin);
  brandenburg_virus = svg.append('image')
  .attr('xlink:href', 'coronavirus-centered.svg')
  .attr("id", "brandenburgVirus")
  .attr('width', 100)
  .attr('height', 100)
  .attr("x", "360")
  .attr('y', '190')
  .on("mouseover", popUpBrandenburg)
  .on("mouseout", hidePopupWindow)
  .on("click", clickBrandenburg);
  sachsenanhalt_virus = svg.append('image')
  .attr('xlink:href', 'coronavirus-centered.svg')
  .attr("id", "sachsen-anhaltVirus")
  .attr('width', 100)
  .attr('height', 100)
  .attr("x", "260")
  .attr('y', '190')
  .on("mouseover", popUpSachsenA)
  .on("mouseout", hidePopupWindow)
  .on("click", clickSachsenA);
  scale_to_zero();
  
  
  g.selectAll("path.feature")
    .data(collection.features)
    .enter()
        
    .append("path")
    g.selectAll('path').each(function (d, i) { 
        if (i==0){

        d3.select(this).attr("id", "baden");
        
        }
        if (i==1){

        d3.select(this).attr("id", "bayern");
        
        }
        if (i==2){
        
        d3.select(this).attr("id", "berlin");
        
        
        
        }
        if (i==3){
        
        d3.select(this).attr("id", "brandenburg");
        
        }
        if (i==4){
        
        d3.select(this).attr("id", "bremen");
        }
        if (i==5){
        
        d3.select(this).attr("id", "hamburg");
        }
        if (i==6){
        
        d3.select(this).attr("id", "hessen");
        }
        if (i==7){
        
        d3.select(this).attr("id", "mecklenburg");
        }
        if (i==8){
        
        d3.select(this).attr("id", "niedersachsen");
        }
        if (i==9){
        
        d3.select(this).attr("id", "nrw");
        }
        if (i==10){
        
        d3.select(this).attr("id", "rheinland");
        }
        if (i==11){
        
        d3.select(this).attr("id", "saarland");
        }
        if (i==12){
        
        d3.select(this).attr("id", "sachsen-anhalt");
        }
        if (i==13){
        
        d3.select(this).attr("id", "sachsen");
        }
        if (i==14){
        
        d3.select(this).attr("id", "schleswig");
        }
        if (i==15){
        
        d3.select(this).attr("id", "thüringen");
        }
        
        
        })
    .attr("class", "feature")
    .attr("d", geoPath)
    //.on("click", clickPath);
    .on("click", clickState)
    .on("mouseover", showPopUpWindow)
    .on("mouseout", hidePopupWindow);

    
    update();

    
  
});

    
function update(){
    if(d3.select("#myCheckbox").property("checked")){
        colorBL();
    } else {
        adaptColor(map_calendarweek);
    }	
}
function colorBL() {

    trendListAverage.forEach(function (arrayItem) {
    var valueBL = arrayItem.Value;
    var nameBL = arrayItem.Kategorie;
    
    if (nameBL=="Baden-Württemberg"){
        
        baden_trendValue=valueBL;
        g.select("#baden").style("fill", getcolor(valueBL));
    }
    if (nameBL=="Bayern"){
        
        bayern_trendValue=valueBL;
        g.select("#bayern").style("fill", getcolor(valueBL));
    }
    if (nameBL=="Berlin"){
        berlin_trendValue=valueBL;
        g.select("#berlin").style("fill", getcolor(valueBL));
    }   
    if (nameBL=="Sachsen"){
        sachsenA_trendValue=valueBL;
        g.select("#sachsen").style("fill", getcolor(valueBL));
    }  
    if (nameBL=="Nordrhein-Westfalen"){
        nrw_trendValue=valueBL;
        g.select("#nrw").style("fill", getcolor(valueBL));
    }  
    if (nameBL=="Thüringen"){
        thüringen_trendValue=valueBL;
        g.select("#thüringen").style("fill", getcolor(valueBL));
    }  
    if (nameBL=="Bremen"){
        bremen_trendValue=valueBL;
        g.select("#bremen").style("fill", getcolor(valueBL));
    }  
    if (nameBL=="Sachsen-Anhalt"){
        sachsenA_trendValue=valueBL;
        g.select("#sachsen-anhalt").style("fill", getcolor(valueBL));
    } 
    if (nameBL=="Rheinland-Pfalz"){
        rheinland_trendValue=valueBL;
        g.select("#rheinland").style("fill", getcolor(valueBL));
    }  
    if (nameBL=="Schleswig-Holstein"){
        schleswig_trendValue=valueBL;
        g.select("#schleswig").style("fill", getcolor(valueBL));
    }  
    if (nameBL=="Niedersachsen"){
        niedersachsen_trendValue=valueBL;
        g.select("#niedersachsen").style("fill", getcolor(valueBL));
    }  
    if (nameBL=="Hessen"){
        hessen_trendValue=valueBL;
        g.select("#hessen").style("fill", getcolor(valueBL));
    }  
    if (nameBL=="Hamburg"){
        hamburg_trendValue=valueBL;
        g.select("#hamburg").style("fill", getcolor(valueBL));
    } 
    if (nameBL=="Saarland"){
       saarland_trendValue=valueBL;
        g.select("#saarland").style("fill", getcolor(valueBL));
    } 
    if (nameBL=="Mecklenburg-Vorpommern"){
        mecklenburg_trendValue=valueBL;
        g.select("#mecklenburg").style("fill", getcolor(valueBL));
    }
    if (nameBL=="Brandenburg"){
        brandenburg_trendValue=valueBL;
        g.select("#brandenburg").style("fill", getcolor(valueBL));
    }   
    });
 
}
function getcolor(value) {
    
if (value<10){
   
//return "#ffffcc";
//return "#ffffff";
return color_scheme_map[0];
}
if (value>9 && value<20){
   
    //return "#ffefa5";
    //return "#ffffe5";
    return color_scheme_map[1];
    }

if (value<30 && value>19){
    
    //return "#fedc7f";
    //return "#f7fcb9";
    return color_scheme_map[2];
    
}
if (value<40 && value>29){
    
    //return "#febf5b";
    //return "#d9f0a3";
    return color_scheme_map[3];
    
}
if (value<50 && value>39){
    
    //return "#fd9d43";
   //return "#addd8e";
   return color_scheme_map[4];
    
    
}
if (value<60&& value>49){
   
    //return "#fc7034";
    //return "#78c679";
    return color_scheme_map[5];
    
}
if (value<70&& value>59){
    
    //return "#f23d26";
    //return "#41ab5d";
    return color_scheme_map[6];
    
}
if (value<80&& value>69){
   
    //return "#d91620";
    //return  "#238443";
    return color_scheme_map[7];
    
}
if (value<90&& value>79){
   
    //return "#b40325";
    //return "#006837";
    return color_scheme_map[8];

}
if (value>89){
    
    //return "#800026";
    //return "#004529";
    return color_scheme_map[9];
    
}

}
function getTrendValueAverage(){
    var wordData= "data/mapData/corona.csv";

    if (map_currentWord==="klopapier"){
        wordData= "data/mapData/klopapier.csv";
    }
    if (map_currentWord==="corona"){
       
        wordData= "data/mapData/corona.csv";
    }
    if (map_currentWord==="bill gates"){
        wordData= "data/mapData/billGates.csv";
    }
    if (map_currentWord==="netflix"){
       
        wordData= "data/mapData/netflix.csv";
    }
    if (map_currentWord==="maske"){
        var wordData= "data/mapData/maske.csv";
    }
    if (map_currentWord==="merkel"){
        var wordData= "data/mapData/merkel.csv";
    }
    if (map_currentWord==="oktoberfest"){
        var wordData= "data/mapData/oktoberfest.csv";
    }
    if (map_currentWord==="baumarkt"){
        var wordData= "data/mapData/baumarkt.csv";
    }
    if (map_currentWord==="zoom"){
        var wordData= "data/mapData/zoom.csv";
    }
    if (map_currentWord==="söder"){
        var wordData= "data/mapData/söder.csv";
    }
    if (map_currentWord==="drosten"){
        var wordData= "data/mapData/drosten.csv";
    }
    if (map_currentWord==="desinfektionsmittel"){
        var wordData= "data/mapData/desinfektionsmittel.csv";
    }
    if (map_currentWord==="alkohol"){
        var wordData= "data/mapData/alkohol.csv";
    }
    if (map_currentWord==="BER"){
        var wordData= "data/mapData/BER.csv";
    }
    if (map_currentWord==="attila hildmann"){
        var wordData= "data/mapData/attilaHildmann.csv";
    }
    if (map_currentWord==="querdenken"){
        var wordData= "data/mapData/querdenken.csv";
    }
    if (map_currentWord==="bananenbrot"){
        var wordData= "data/mapData/bananenbrot.csv";
    }
    if (map_currentWord==="kneipentour"){
        var wordData= "data/mapData/kneipentour.csv";
    }
    if (map_currentWord==="homeworkout"){
        var wordData= "data/mapData/homeworkout.csv";
    }
    if (map_currentWord==="onlinesemester"){
        var wordData= "data/mapData/onlinesemester.csv";
    }

d3.csv(wordData, function(data) {

data.forEach(function(d) {
d['Value'] = +d['Value'];
});
trendListAverage= data;

});

};

function getTrendValue(){
    var wordData= "data/mapData/allBLcorona.csv";

    if (map_currentWord==="klopapier"){
    
        var wordData= "data/mapData/allBLKlopapier.csv";
       
    }
    if (map_currentWord==="corona"){
        var wordData= "data/mapData/allBLcorona.csv";
       

    }
    if (map_currentWord==="bill gates"){
        
        var wordData= "data/mapData/allBLBillGates.csv";
    }
    if (map_currentWord==="netflix"){
        var wordData= "data/mapData/allBLnetflix.csv";
    }
    if (map_currentWord==="maske"){
        var wordData= "data/mapData/allBLmaske.csv";
    }
    if (map_currentWord==="merkel"){
        var wordData= "data/mapData/allBLmerkel.csv";
    }
    if (map_currentWord==="oktoberfest"){
        var wordData= "data/mapData/allBLoktoberfest.csv";
    }
    if (map_currentWord==="baumarkt"){
        var wordData= "data/mapData/allBLbaumarkt.csv";
    }
    if (map_currentWord==="zoom"){
        var wordData= "data/mapData/allBLzoom.csv";
    }
    if (map_currentWord==="söder"){
        var wordData= "data/mapData/allBLsöder.csv";
    }
    if (map_currentWord==="drosten"){
        var wordData= "data/mapData/allBLdrosten.csv";
    }
    if (map_currentWord==="desinfektionsmittel"){
        var wordData= "data/mapData/allBLdesinfektionsmittel.csv";
    }
    if (map_currentWord==="alkohol"){
        var wordData= "data/mapData/allBLalkohol.csv";
    }
    if (map_currentWord==="BER"){
        var wordData= "data/mapData/allBLBER.csv";
    }
    if (map_currentWord==="attila hildmann"){
        var wordData= "data/mapData/allBLattilaHildmann.csv";
    }
    if (map_currentWord==="querdenken"){
        var wordData= "data/mapData/allBLquerdenken.csv";
    }
    if (map_currentWord==="bananenbrot"){
        var wordData= "data/mapData/allBLbananenbrot.csv";
    }
    if (map_currentWord==="kneipentour"){
        var wordData= "data/mapData/allBLkneipentour.csv";
    }
    if (map_currentWord==="homeworkout"){
        var wordData= "data/mapData/allBLhomeworkout.csv";
    }
    if (map_currentWord==="onlinesemester"){
        var wordData= "data/mapData/allBLonlinesemester.csv";
    }
    


    d3.csv(wordData, function(data) {

    data.forEach(function(d) {
    d['Baden'] = +d['Baden'];
    d['Bayern'] = +d['Bayern'];
    d['Berlin'] = +d['Berlin'];
    d['Brandenburg'] = +d['Brandenburg'];
    d['Bremen'] = +d['Bremen'];
    d['Hamburg'] = +d['Hamburg'];
    d['Mecklenburg'] = +d['Mecklenburg'];
    d['Niedersachsen'] = +d['Niedersachsen'];
    d['Nordrhein'] = +d['Nordrhein'];
    d['Rheinland'] = +d['Rheinland'];
    d['SachsenA'] = +d['SachsenA'];
    d['Sachsen'] = +d['Sachsen'];
    d['Saarland'] = +d['Saarland'];
    d['Schleswig'] = +d['Schleswig'];
    d['Thüringen'] = +d['Thüringen'];
    d['Hessen'] = +d['Hessen'];
    });
    trendList= data;
    
    
    
    });

};
function adaptColor(week){

    if (week==0){
        colorWeek0();

    }else{
    
    if (map_year==2019){
       week=week-1;
       
    }else{
        
        week=week+51;
       
        
    }
trendList.forEach(function (d, i) {

    if (i==week){
    
    g.select("#bayern").style("fill", getcolor(d.Bayern));
    bayern_trendValue= d.Bayern;
   
    g.select("#berlin").style("fill", getcolor(d.Berlin));
    berlin_trendValue=d.Berlin;
    g.select("#bremen").style("fill", getcolor(d.Bremen));
    bremen_trendValue=d.Bremen;
    g.select("#brandenburg").style("fill", getcolor(d.Brandenburg));
    brandenburg_trendValue=d.Brandenburg;
    g.select("#hamburg").style("fill", getcolor(d.Hamburg));
    hamburg_trendValue=d.Hamburg;
    g.select("#hessen").style("fill", getcolor(d.Hessen));
    hessen_trendValue=d.Hessen;
    g.select("#mecklenburg").style("fill", getcolor(d.Mecklenburg));
    mecklenburg_trendValue=d.Mecklenburg;
    g.select("#niedersachsen").style("fill", getcolor(d.Niedersachsen));
    niedersachsen_trendValue=d.Niedersachsen;
    g.select("#nrw").style("fill", getcolor(d.Nordrhein));
    nrw_trendValue=d.Nordrhein;
    g.select("#rheinland").style("fill", getcolor(d.Rheinland));
    rheinland_trendValue=d.Rheinland;
    g.select("#saarland").style("fill", getcolor(d.Saarland));
    saarland_trendValue=d.Saarland;
    g.select("#sachsen").style("fill", getcolor(d.Sachsen));
    sachen_trendValue=d.Sachsen;
    g.select("#schleswig").style("fill", getcolor(d.Schleswig));
    schleswig_trendValue=d.Schleswig;
    g.select("#thüringen").style("fill", getcolor(d.Thüringen));
    thüringen_trendValue=d.Thüringen;
    g.select("#baden").style("fill", getcolor(d.Baden));
    baden_trendValue=d.Baden;
    g.select("#sachsen-anhalt").style("fill", getcolor(d.SachsenA));
    sachsenA_trendValue=d.SachsenA;
    }

});}
}

function updateMapTime(text_week) {
    map_calendarweek = parseInt(text_week.slice(3, 5));
    map_calendarweek = map_calendarweek+1;
    map_year = parseInt(text_week.slice(6, 10));
    if(map_calendarweek<14){
        scale_to_zero();
        resetVirusValues();
    }
    update();
    
}

function updateGoogleTrend(currentWord) {
    map_currentWord= currentWord;
    
    getTrendValue();
    getTrendValueAverage();
    checkboxLabel.innerHTML = 'Durchschnittswert über den gesamten Zeitraum für Keyword "'+ currentWord+ '":';
    changelegendDescription(currentWord);
    setTimeout(function() {  
        update();
    }, 1000);

}


var cursor_x = -1;
var cursor_y = -1;
document.onmousemove = function(event)
{
 cursor_x=event.pageX;
 cursor_y=event.pageY;
}

function popUpWindowPositioning(d){
    mypopup.style.left = cursor_x+"px";
    mypopup.style.top = cursor_y+"px";
    mypopup.style.display = "block";  
}


 
  function hidePopupWindow() {
    mypopup.style.display = "none";

    hidePopupWindowStroke();
  }
  function hidePopupWindowStroke() {
  
    currentHoveredState.attr("stroke-width","1.25");
    
  }
  
  

function showPopUpWindow(d) {
  
    if (!zoomIn){

    


    var name= d.properties.name;
    

    if (name=="Baden-Württemberg"){
        popUpBaden(d);
    }
    if (name=="Bayern"){
        popUpBayern(d);
       
    }
    if (name=="Berlin"){
        popUpBerlin(d);
    }
    if (name=="Bremen"){
        popUpBremen(d);
    }
    if (name=="Hamburg"){
        popUpHamburg(d);
    }
    if (name=="Hessen"){
        popUpHessen(d);
    }
    if (name=="Niedersachsen"){
        popUpNiedersachsen(d);
    }
    if (name=="Sachsen"){
        popUpSachsen(d);
    }
    if (name=="Sachsen-Anhalt"){
        popUpSachsenA(d);
    }
    if (name=="Saarland"){
        popUpSaarland(d);
    }
    if (name=="Schleswig-Holstein"){
        popUpSchleswig(d);
    }
    if (name=="Mecklenburg-Vorpommern"){
        popUpMecklenburg(d);
    }
    if (name=="Thüringen"){
       popUpThüringen(d);
    }
    if (name=="Nordrhein-Westfalen"){
        popUpNRW(d);
    }
    if (name=="Brandenburg"){
        popUpBrandenburg(d);
    }
    if (name=="Rheinland-Pfalz"){
       popUpRheinland(d);
    }
    }
  }
  

function popUpHamburg(d){ 
    document.getElementById("hamburg").style.cursor = "pointer";
    document.getElementById("virusHamburg").style.cursor = "pointer";
    if (!zoomIn){
    currentHoveredState=d3.select("#hamburg");
    d3.select("#hamburg").attr("stroke-width","3");
    popUpDescription.innerHTML = "<span style=color:#fc7034;font-weight:bold;>Hamburg</span> <br />" + "Wert in KW " + map_calendarweek + 
    " für "+ '"'+ map_currentWord + '"'+ ": "+ hamburg_trendValue+"<br /> Corona 14-Tages-Inzidenz: "+hamburg_virus_value;   
    popUpWindowPositioning(d);    
}}
function popUpBremen(d){ 
    document.getElementById("bremen").style.cursor = "pointer";
    document.getElementById("bremenVirus").style.cursor = "pointer";
    if (!zoomIn){
    currentHoveredState=d3.select("#bremen");
    d3.select("#bremen").attr("stroke-width","3");
    popUpDescription.innerHTML = "<span style=color:#fc7034;font-weight:bold;>Bremen</span> <br />" + "Wert in KW " + map_calendarweek + 
    " für "+ '"'+ map_currentWord + '"'+ ": "+ bremen_trendValue+"<br /> Corona 14-Tages-Inzidenz: "+bremen_virus_value;  
    popUpWindowPositioning(d);     
}}
function popUpBerlin(d){ 
    document.getElementById("berlin").style.cursor = "pointer";
    document.getElementById("berlinVirus").style.cursor = "pointer";
    if (!zoomIn){
        document.getElementById("berlin").style.cursor = "pointer";
    document.getElementById("berlinVirus").style.cursor = "pointer";
    currentHoveredState=d3.select("#berlin");
    d3.select("#berlin").attr("stroke-width","3");
    popUpDescription.innerHTML = "<span style=color:#fc7034;font-weight:bold;>Berlin</span> <br />" + "Wert in KW " + map_calendarweek + 
    " für "+ '"'+ map_currentWord + '"'+ ": "+ berlin_trendValue+"<br /> Corona 14-Tages-Inzidenz: "+berlin_virus_value;  
    popUpWindowPositioning(d);     
}}
function popUpBayern(d){ 
    document.getElementById("bayern").style.cursor = "pointer";
    document.getElementById("bayernVirus").style.cursor = "pointer";
    
    if (!zoomIn){
    
        
    currentHoveredState=d3.select("#bayern");
    d3.select("#bayern").attr("stroke-width","3");
    popUpDescription.innerHTML =  "<span style=color:#fc7034;font-weight:bold;>Bayern</span> <br />"+ "Wert in KW " + map_calendarweek + 
    " für "+ '"'+ map_currentWord + '"'+ ": "+ bayern_trendValue+"<br /> Corona 14-Tages-Inzidenz: "+bayern_virus_value;  
    popUpWindowPositioning(d); 
    }
}
function popUpBaden(d){ 
    document.getElementById("baden").style.cursor = "pointer";
    document.getElementById("badenVirus").style.cursor = "pointer";
    if (!zoomIn){
    currentHoveredState=d3.select("#baden");
    d3.select("#baden").attr("stroke-width","3");
    popUpDescription.innerHTML = "<span style=color:#fc7034;font-weight:bold;>Baden_Württemberg</span> <br />" + "Wert in KW " + map_calendarweek + 
    " für "+ '"'+ map_currentWord + '"'+ ": "+ baden_trendValue+"<br /> Corona 14-Tages-Inzidenz: "+baden_virus_value;    
    popUpWindowPositioning(d); 
   
}}
function popUpBrandenburg(d){ 
    document.getElementById("brandenburg").style.cursor = "pointer";
    document.getElementById("brandenburgVirus").style.cursor = "pointer";
    
    if (!zoomIn){
    currentHoveredState=d3.select("#brandenburg");
    d3.select("#brandenburg").attr("stroke-width","3");
    popUpDescription.innerHTML = "<span style=color:#fc7034;font-weight:bold;>Brandenburg</span> <br />" + "Wert in KW " + map_calendarweek + 
    " für "+ '"'+ map_currentWord + '"'+ ": "+ brandenburg_trendValue+"<br /> Corona 14-Tages-Inzidenz: "+brandenburg_virus_value;  
    popUpWindowPositioning(d);     
}}
function popUpSachsen(d){ 
    document.getElementById("sachsen").style.cursor = "pointer";
    document.getElementById("sachsenVirus").style.cursor = "pointer";
    if (!zoomIn){
    currentHoveredState=d3.select("#sachsen");
    d3.select("#sachsen").attr("stroke-width","3");
    popUpDescription.innerHTML = "<span style=color:#fc7034;font-weight:bold;>Sachsen</span> <br />" + "Wert in KW " +map_calendarweek + 
    " für "+ '"'+ map_currentWord +'"'+ ": "+ sachen_trendValue+"<br /> Corona 14-Tages-Inzidenz: "+sachsen_virus_value;  
    popUpWindowPositioning(d);    
}}
function popUpSachsenA(d){ 
    document.getElementById("sachsen-anhalt").style.cursor = "pointer";
    document.getElementById("sachsen-anhaltVirus").style.cursor = "pointer";
    if (!zoomIn){
    currentHoveredState=d3.select("#sachsen-anhalt");
    d3.select("#sachsen-anhalt").attr("stroke-width","3");
    popUpDescription.innerHTML = "<span style=color:#fc7034;font-weight:bold;>Sachsen-Anhalt</span> <br />" + "Wert in KW " + map_calendarweek + 
    " für "+ '"'+ map_currentWord + '"'+ ": "+ sachsenA_trendValue+"<br /> Corona 14-Tages-Inzidenz: "+sachsenanhalt_virus_value;  
    popUpWindowPositioning(d);     
}}
function popUpNiedersachsen(d){ 
    document.getElementById("niedersachsen").style.cursor = "pointer";
    document.getElementById("niedersachsenVirus").style.cursor = "pointer";
    if (!zoomIn){
    currentHoveredState=d3.select("#niedersachsen");
    d3.select("#niedersachsen").attr("stroke-width","3");
    popUpDescription.innerHTML = "<span style=color:#fc7034;font-weight:bold;>Niedersachsen</span> <br />" + "Wert in KW " + map_calendarweek + 
    " für "+ '"'+ map_currentWord + '"'+ ": "+ niedersachsen_trendValue+"<br /> Corona 14-Tages-Inzidenz: "+niedersachsen_virus_value;  
    popUpWindowPositioning(d);     
}}

function popUpRheinland(d){ 
    document.getElementById("rheinland").style.cursor = "pointer";
    document.getElementById("rheinlandVirus").style.cursor = "pointer";
    if (!zoomIn){
    currentHoveredState=d3.select("#rheinland");
    d3.select("#rheinland").attr("stroke-width","3");
    popUpDescription.innerHTML = "<span style=color:#fc7034;font-weight:bold;>Rheinland-Pfalz</span> <br />" + "Wert in KW " + map_calendarweek + 
    " für "+ '"'+ map_currentWord + '"'+ ": "+ rheinland_trendValue+"<br /> Corona 14-Tages-Inzidenz: "+rheinlandpfalz_virus_value;  
    popUpWindowPositioning(d);     
}}
function popUpNRW(d){ 
    document.getElementById("nrw").style.cursor = "pointer";
    document.getElementById("nrwVirus").style.cursor = "pointer";
    if (!zoomIn){
    currentHoveredState=d3.select("#nrw");
    d3.select("#nrw").attr("stroke-width","3");
    popUpDescription.innerHTML = "<span style=color:#fc7034;font-weight:bold;>Nordrhein-Westfalen</span> <br />" + "Wert in KW " + map_calendarweek + 
    " für "+ '"'+ map_currentWord + '"'+ ": "+ nrw_trendValue+"<br /> Corona 14-Tages-Inzidenz: "+nrw_virus_value;  
    popUpWindowPositioning(d);     
}}
function popUpSaarland(d){ 
    document.getElementById("saarland").style.cursor = "pointer";
    document.getElementById("saarlandVirus").style.cursor = "pointer";
    if (!zoomIn){
    currentHoveredState=d3.select("#saarland");
    d3.select("#saarland").attr("stroke-width","3");
    popUpDescription.innerHTML = "<span style=color:#fc7034;font-weight:bold;>Saarland</span> <br />" + "Wert in KW " + map_calendarweek + 
    " für "+ '"'+ map_currentWord + '"'+ ": "+ saarland_trendValue+"<br /> Corona 14-Tages-Inzidenz: "+saarland_virus_value;  
    popUpWindowPositioning(d);     
}}
function popUpThüringen(d){ 
    document.getElementById("thüringen").style.cursor = "pointer";
    document.getElementById("thüringenVirus").style.cursor = "pointer";
    if (!zoomIn){
    currentHoveredState=d3.select("#thüringen");
    d3.select("#thüringen").attr("stroke-width","3");
    popUpDescription.innerHTML = "<span style=color:#fc7034;font-weight:bold;>Thüringen</span> <br />" + "Wert in KW " + map_calendarweek + 
    " für "+ '"'+ map_currentWord + '"'+ ": "+ thüringen_trendValue+"<br /> Corona 14-Tages-Inzidenz: "+thueringen_virus_value;  
    popUpWindowPositioning(d);     
}}
function popUpMecklenburg(d){ 
    document.getElementById("mecklenburg").style.cursor = "pointer";
    document.getElementById("mecklenburgVirus").style.cursor = "pointer";
    if (!zoomIn){
    currentHoveredState=d3.select("#mecklenburg");
    d3.select("#mecklenburg").attr("stroke-width","3");
    popUpDescription.innerHTML = "<span style=color:#fc7034;font-weight:bold;>Mecklenburg-Vorpommern</span> <br />" + "Wert in KW " + map_calendarweek + 
    " für "+ '"'+ map_currentWord + '"'+ ": "+ mecklenburg_trendValue+"<br /> Corona 14-Tages-Inzidenz: "+mecklvorp_virus_value;  
    popUpWindowPositioning(d);     
}}
function popUpSchleswig(d){ 
    document.getElementById("schleswig").style.cursor = "pointer";
    document.getElementById("schleswigVirus").style.cursor = "pointer";
    if (!zoomIn){
        //document.getElementById("schleswig").style.cursor = "pointer";
    //document.getElementById("schleswigVirus").style.cursor = "pointer";
    currentHoveredState=d3.select("#schleswig");
    d3.select("#schleswig").attr("stroke-width","3");
    popUpDescription.innerHTML = "<span style=color:#fc7034;font-weight:bold;>Schleswig-Holstein</span> <br />" + "Wert in KW " + map_calendarweek + 
    " für "+ '"'+ map_currentWord + '"'+ ": "+ schleswig_trendValue+"<br /> Corona 14-Tages-Inzidenz: "+schleswigholst_virus_value;  
    popUpWindowPositioning(d);     
}/*else{
    document.getElementById("schleswig").style.cursor = "cursor_minus.png";
    document.getElementById("schleswigVirus").style.cursor = "cursor_minus.png";
}*/}
function popUpHessen(d){ 
    document.getElementById("hessen").style.cursor = "pointer";
    document.getElementById("hessenVirus").style.cursor = "pointer";
    if (!zoomIn){
    currentHoveredState=d3.select("#hessen");
    d3.select("#hessen").attr("stroke-width","3");
    popUpDescription.innerHTML = "<span style=color:#fc7034;font-weight:bold;>Hessen</span> <br />" + "Wert in KW " + map_calendarweek + 
    " für "+ '"'+ map_currentWord + '"'+ ": "+ hessen_trendValue+"<br /> Corona 14-Tages-Inzidenz: "+hessen_virus_value;  
    popUpWindowPositioning(d);     
}}



function executeAsynchronously(functions, timeout) {
    for(var i = 0; i < functions.length; i++) {
      setTimeout(functions[i], timeout);
    }
  }

   function colorWeek0(){
    g.select("#berlin").style("fill", getcolor(0));
    g.select("#bremen").style("fill", getcolor(0));
    g.select("#brandenburg").style("fill", getcolor(0));
    g.select("#hamburg").style("fill", getcolor(0));
    g.select("#hessen").style("fill", getcolor(0));
    g.select("#mecklenburg").style("fill", getcolor(0));
    g.select("#niedersachsen").style("fill", getcolor(0));
    g.select("#nrw").style("fill", getcolor(0));
    g.select("#rheinland").style("fill", getcolor(0));
    g.select("#saarland").style("fill", getcolor(0));
    g.select("#sachsen").style("fill", getcolor(0));
    g.select("#schleswig").style("fill", getcolor(0));
    g.select("#thüringen").style("fill", getcolor(0));
    g.select("#baden").style("fill", getcolor(0));
    g.select("#sachsen-anhalt").style("fill", getcolor(0));
    g.select("#bayern").style("fill", getcolor(0));
    bayern_trendValue=0;
    baden_trendValue=0;
    brandenburg_trendValue=0;
    berlin_trendValue=0;
    bremen_trendValue=0;
    hamburg_trendValue=0;
    hessen_trendValue=0;
    nrw_trendValue=0;
    niedersachsen_trendValue=0;
    sachen_trendValue=0;
    sachsenA_trendValue=0;
    rheinland_trendValue=0;
    schleswig_trendValue=0;
    mecklenburg_trendValue=0;
    thüringen_trendValue=0;
    saarland_trendValue=0;
   }        
   
   function clickBayern(d) {
       if (!zoomIn){
        virusZoomInRightState(1);   
       }else{
           clickPath(currentClicked_virus);
           
       }
       
   }
   function clickBaden(d) {
    if (!zoomIn){
        virusZoomInRightState(0);   
       }else{
           clickPath(currentClicked_virus);
       }
 }
 function clickBerlin(d) {
    if (!zoomIn){
        virusZoomInRightState(2);   
       }else{
           clickPath(currentClicked_virus);
       }    
 }
 function clickBrandenburg(d) {
    if (!zoomIn){
        virusZoomInRightState(3);   
       }else{
           clickPath(currentClicked_virus);
       }    
 }
 function clickBremen(d) {
    if (!zoomIn){
        virusZoomInRightState(4);   
       }else{
           clickPath(currentClicked_virus);
       }    
 }
 function clickHamburg(d) {
    if (!zoomIn){
        virusZoomInRightState(5);   
       }else{
           clickPath(currentClicked_virus);
       }   
 }
 function clickHessen(d) {
    if (!zoomIn){
        virusZoomInRightState(6);   
       }else{
           clickPath(currentClicked_virus);
       }   
 }
 function clickMecklenburg(d) {
    if (!zoomIn){
        virusZoomInRightState(7);   
       }else{
           clickPath(currentClicked_virus);
       }  
 }
 function clickSaarland(d) {
    if (!zoomIn){
        virusZoomInRightState(11);   
       }else{
           clickPath(currentClicked_virus);
       }    
 }
 function clickSachsen(d) {
    if (!zoomIn){
        virusZoomInRightState(13);   
       }else{
           clickPath(currentClicked_virus);
       }    
 }
 function clickSachsenA(d) {
    if (!zoomIn){
        virusZoomInRightState(12);   
       }else{
           clickPath(currentClicked_virus);
       }    
 }
 function clickSchleswig(d) {
    if (!zoomIn){
        virusZoomInRightState(14);   
       }else{
           clickPath(currentClicked_virus);
       }
 }
 function clickNRW(d) {
    if (!zoomIn){
        virusZoomInRightState(9);   
       }else{
           clickPath(currentClicked_virus);
       }    
 }
 function clickRheinland(d) {
    if (!zoomIn){
        virusZoomInRightState(10);   
       }else{
           clickPath(currentClicked_virus);
       }
 }
 function clickThüringen(d) {
    if (!zoomIn){
        virusZoomInRightState(15);   
       }else{
           clickPath(currentClicked_virus);
       }    
 }
 function clickNiedersachsen(d) {
    if (!zoomIn){
        virusZoomInRightState(8);   
       }else{
           clickPath(currentClicked_virus);
       }    
 }


   function virusZoomInRightState(index){
    g.selectAll('path').each(function (d, i) { 
        if (i==index){
            currentClicked_virus=d;
            clickPath(d);
            }
        });
   }

   function clickState(d){
    if (!zoomIn){
        clickPath(d);  
        currentClicked_state=d; 
       }else{
           clickPath(currentClicked_state);
       } 
   }


function clickPath(d) {
   
    
  var x = widthMap/2,
      y = heightMap/2,
      k = 1,
      name = d.properties.NAME_1;

  g.selectAll("text")
    .remove();
  zoomIn = false;
  if ((focused === null) || !(focused === d)) {
    var centroid = geoPath.centroid(d),
        x = +centroid[0],
        y = +centroid[1],
        k = 1.75;
    focused = d;
    
    g.append("text")
      .text(name)
      .attr("x", x)
      .attr("y", y)
      .style("text-anchor","middle")
      .style("font-size","8px")
      .style("stroke-width","0px")
      .style("fill","black")
      .style("font-family","Times New Roman")
      .on("click", clickText);
    // virus icons to zero
    scale_to_zero();
    resetVirusValues();
    zoomIn = true;
  } else {
    focused = null;
  };

  g.selectAll("path")
      .classed("active", focused && function(d) { return d === focused; });
 
  g.transition()
      .duration(1000)
      .attr("transform", "translate("+ (widthMap/2) +","+ (heightMap/2) +")scale("+ k +")translate("+ (-x) +","+ (-y) +")")
      .style("stroke-width", 1.75/k +"px");
  // update virus icons after zoom out 
  if (!zoomIn) {
    setTimeout(() => {update_virusicons(currentDate)}, 1000);
  }
}


function clickText(d) {
  focused = null;
  g.selectAll("text")
      .remove();
  g.selectAll("path")
      .classed("active", 0);
  g.transition()
      .duration(1000)
      .attr("transform", "scale("+1+")translate("+0+","+0+")")
      .style("stroke-width", 1.00+"px");
}

/*scales a specific icon to a given value by scaling it and adjusting its center*/

function scaleIcon(icon, value) {
  var icon_bbox = icon.node().getBBox();
  var icon_x = icon_bbox.x;
  var icon_y = icon_bbox.y;
  var icon_scaling_factor = value;
  icon.attr('transform', 'translate('+(1 - icon_scaling_factor) * (icon_x+50)+', '+(1 - icon_scaling_factor) * (icon_y+50)+') scale('+icon_scaling_factor+')');
}

/* updates all virus-icons according to a given week */

function update_virusicons(week_text) {
   setVirusIconScaleByCases(week_text, "Bayern", bayern_virus);
   setVirusIconScaleByCases(week_text, "Baden-Wurttemberg", baden_virus);
   setVirusIconScaleByCases(week_text, "Nordrhein-Westfalen", nrw_virus);
   setVirusIconScaleByCases(week_text, "Hessen", hessen_virus);
   setVirusIconScaleByCases(week_text, "Niedersachsen", niedersachsen_virus);
   setVirusIconScaleByCases(week_text, "Schleswig-Holstein", schleswigholst_virus);
   setVirusIconScaleByCases(week_text, "Mecklenburg-Vorpommern", mecklvorp_virus);
   setVirusIconScaleByCases(week_text, "Saarland", saarland_virus);
   setVirusIconScaleByCases(week_text, "Rheinland-Pfalz", rheinlandpfalz_virus);
   setVirusIconScaleByCases(week_text, "Thuringen", thueringen_virus);
   setVirusIconScaleByCases(week_text, "Sachsen", sachsen_virus);
   setVirusIconScaleByCases(week_text, "Hamburg", hamburg_virus);
   setVirusIconScaleByCases(week_text, "Bremen", bremen_virus);
   setVirusIconScaleByCases(week_text, "Berlin", berlin_virus);
   setVirusIconScaleByCases(week_text, "Brandenburg", brandenburg_virus);
   setVirusIconScaleByCases(week_text, "Sachsen-Anhalt", sachsenanhalt_virus);
}

/* This function is called per region to resize the virus icon according to the currentdate selected by the slider.
    The currentdate is reformatted to fit the format in the data. Then it is searched for an element that matches the given region
    and date and if existing, the 14-day-case rate is retrieved and used to scale the virus-icon of that region as well
    as to update the regions value for the pop-up.*/

function  setVirusIconScaleByCases(currentDate, region, icon){
  germanyData.forEach(element => {
  if(currentDate != null){
    //reformat date of slider to match format in data
    var newDateFormat = currentDate.toString().substring(6,10)+"-"+currentDate.toString().charAt(1)+currentDate.toString().substring(3,5);
    
    if((element.region_name == region) && (element.year_week == newDateFormat)){

        if((element.rate_14_day_per_100k !== undefined) && (element.rate_14_day_per_100k >0)){
            //update value for popup
            updateVirusValue(region, element.rate_14_day_per_100k);
            //scale icon to make surface area fit the case value
            scaleIcon(icon, Math.sqrt((element.rate_14_day_per_100k/Math.PI))/10);
        } else {
            scaleIcon(icon, 0);
        }
    }
    else if((element.region_name == region) && (element.year_week == undefined)){
        scaleIcon(icon, 0);
    } 
    else if(newDateFormat.includes("2019")){
        scale_to_zero();
      }
  }
});
}

/* updates the virus values per region that are displayed in the popup according to a given value that is rounded to two decimals */

function updateVirusValue(region, value){
    switch(region){
        case "Bayern": bayern_virus_value = Math.round((value + Number.EPSILON) * 100) / 100; break;
        case "Baden-Wurttemberg": baden_virus_value = Math.round((value + Number.EPSILON) * 100) / 100; break;
        case "Nordrhein-Westfalen": nrw_virus_value = Math.round((value + Number.EPSILON) * 100) / 100; break;
        case "Hessen": hessen_virus_value = Math.round((value + Number.EPSILON) * 100) / 100; break;
        case "Niedersachsen": niedersachsen_virus_value = Math.round((value + Number.EPSILON) * 100) / 100; break;
        case "Schleswig-Holstein": schleswigholst_virus_value = Math.round((value + Number.EPSILON) * 100) / 100; break;
        case "Mecklenburg-Vorpommern": mecklvorp_virus_value = Math.round((value + Number.EPSILON) * 100) / 100; break;
        case "Saarland": saarland_virus_value = Math.round((value + Number.EPSILON) * 100) / 100; break;
        case "Rheinland-Pfalz": rheinlandpfalz_virus_value = Math.round((value + Number.EPSILON) * 100) / 100; break;
        case "Thuringen": thueringen_virus_value = Math.round((value + Number.EPSILON) * 100) / 100; break;
        case "Sachsen": sachsen_virus_value = Math.round((value + Number.EPSILON) * 100) / 100; break;
        case "Hamburg": hamburg_virus_value = Math.round((value + Number.EPSILON) * 100) / 100; break;
        case "Bremen": bremen_virus_value = Math.round((value + Number.EPSILON) * 100) / 100; break;
        case "Berlin": berlin_virus_value = Math.round((value + Number.EPSILON) * 100) / 100; break;
        case "Brandenburg": brandenburg_virus_value = Math.round((value + Number.EPSILON) * 100) / 100; break;
        case "Sachsen-Anhalt": sachsenanhalt_virus_value = Math.round((value + Number.EPSILON) * 100) / 100; break;

    }
}

/* resets all virus values that are displayed in the pop-up to zero */

function resetVirusValues(){
  
    bayern_virus_value = 0;
    baden_virus_value = 0;
    nrw_virus_value = 0;
    hessen_virus_value = 0;
    niedersachsen_virus_value = 0;
    schleswigholst_virus_value = 0;
    mecklvorp_virus_value = 0;
    saarland_virus_value = 0;
    rheinlandpfalz_virus_value = 0;
    thueringen_virus_value = 0;
    sachsen_virus_value = 0;
    hamburg_virus_value = 0;
    berlin_virus_value = 0;
    brandenburg_virus_value = 0;
    sachsenanhalt_virus_value = 0;

}

/* scales all virus icons to zero */

function scale_to_zero() {
  scaleIcon(bayern_virus, 0);
  scaleIcon(baden_virus, 0);
  scaleIcon(nrw_virus, 0);
  scaleIcon(hessen_virus, 0);
  scaleIcon(niedersachsen_virus, 0);
  scaleIcon(schleswigholst_virus, 0);
  scaleIcon(mecklvorp_virus, 0);
  scaleIcon(saarland_virus, 0);
  scaleIcon(thueringen_virus, 0);
  scaleIcon(hamburg_virus, 0);
  scaleIcon(bremen_virus, 0);
  scaleIcon(berlin_virus, 0);
  scaleIcon(brandenburg_virus, 0);
  scaleIcon(sachsenanhalt_virus, 0);
  scaleIcon(rheinlandpfalz_virus, 0);
  scaleIcon(sachsen_virus, 0);
}
