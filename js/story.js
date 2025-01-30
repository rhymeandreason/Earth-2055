var TimelineSections;
var CurrentTimeline = 0;


$( document ).ready(function() {
    console.log( "ready!" );
    TimelineSections = $(".timeline-section");
    $(".next-arrow").bind("click", AdvanceTimeline);
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
    const img = document.createElement("img");
    img.src = fileprefix + story.image;
    img.classList.add("thumbnail");
    img.style.animationDelay= 3*Math.random() +"s";
    img.style.left = story.left;
    img.style.top = story.top;
    $(img).bind("click", function(){
      LoadStory(fileprefix+ story.file);
      }
    );
    $(img).bind("mouseenter", function(){
        if( hoveringOnImage == false){
          ShowCursorHover(story.blurb);
          hoveringOnImage = true;
        }
      }
    );
    $(img).bind("mouseleave", function(){
      hoveringOnImage = false;
      $("#cursor-hover").hide();
      }
    );
  //  img.addEventListener("click", function(){LoadStory(fileprefix+ story.file)});
    $(containerId).append(img);

  });
}

function ShowCursorHover(text){
  $("#cursor-hover").html(text);
  $("#cursor-hover").show();
}

function LoadStory(file){
  $("#story-container").show();
  $("#story-modal").load(file);
}

function HideStory(){
  $("#story-container").hide();
}
