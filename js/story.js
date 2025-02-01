var TimelineSections;
var CurrentTimeline = 0;
var CurrentStorySection = 0;

$( document ).ready(function() {
    console.log( "ready!" );
    TimelineSections = $(".timeline-section");
    $(".timeline-button").bind("click", AdvanceTimeline);
});

var mouseX;
var mouseY;
var hoveringOnImage = false;
$(document).mousemove( function(e) {
   mouseX = e.pageX;
   mouseY = e.pageY;
   if (hoveringOnImage) {
     $("#cursor-hover").css({'top':mouseY+20,'left':mouseX+20});
   }
});

function Load2028(){
  PlaceImages(Content2028, "#2028-images");
  $("#2028-passages").fadeOut(1000);
  $("#2028-images").show();
}

function Load2028b(){
  AdvanceTimeline();
  PlaceImages(Content2028, "#2028b-images");
  $("#2028b-images").show();
}


function AdvanceTimeline(){
  if (CurrentTimeline < TimelineSections.length-1){
    $(TimelineSections[CurrentTimeline]).removeClass("current-timeline");
    $(TimelineSections[CurrentTimeline]).addClass("previous-timeline");

    $(TimelineSections[CurrentTimeline+1]).removeClass("hidden-timeline");
    $(TimelineSections[CurrentTimeline+1]).addClass("current-timeline");
    CurrentTimeline++;
  }
}

function PlaceImages(content, containerId){
var fileprefix = "story/";

  content.forEach (story =>{
    const imgdiv = document.createElement("div");
    imgdiv.classList.add("thumbnail");
    imgdiv.style.animationDelay= 3*Math.random()+1.5 +"s";
    imgdiv.style.left = story.left;
    imgdiv.style.top = story.top;

    const img = document.createElement("img");
    img.src = fileprefix + story.image;
    //img.classList.add("thumbnail");

    $(imgdiv).bind("click", function(){
      LoadStory(fileprefix+ story.file);
      }
    );
    $(imgdiv).bind("mouseenter", function(){
        if( hoveringOnImage == false){
          ShowCursorHover(story.blurb);
          hoveringOnImage = true;
        }
      }
    );
    $(imgdiv).bind("mouseleave", function(){
      hoveringOnImage = false;
      $("#cursor-hover").hide();
      }
    );

    $(imgdiv).append(img);
    $(imgdiv).append("<p>"+story.location+"</p>");
    $(containerId).append(imgdiv);


  });
}

function ShowCursorHover(text){
  $("#cursor-hover").html(text);
  $("#cursor-hover").show();
}

function LoadStory(file){
  $("#story-container").show();
  $("#story-content").load(file, function(){
    //runs when load completes
    var el = $(".story-section")[0];
    $(el).show();
  });
  CurrentStorySection = 0;
  $(".continue-button").show();
}

function HideStory(){
  $("#story-container").hide();
}

function ContinueStory(){
  var sections = $("#story-modal .story-section");
  //console.log(sections.length);
  console.log(CurrentStorySection);

  if (CurrentStorySection < sections.length-1){
    var el = $(".story-section")[CurrentStorySection];
    $(el).hide();
    var el2 = $(".story-section")[CurrentStorySection+1];
    $(el2).show();
    CurrentStorySection++;
  }

  if (CurrentStorySection == sections.length-1){
    $(".continue-button").fadeOut();
  }
}
