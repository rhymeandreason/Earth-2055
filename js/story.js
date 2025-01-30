var TimelineSections;
var CurrentTimeline = 0;


$( document ).ready(function() {
    console.log( "ready!" );
    TimelineSections = $(".timeline-section");
    $(".next-arrow").bind("click", AdvanceTimeline);
});

function Load2028(){
  PlaceImages(Content2028, "#2028-images");
  $("#2028-passages").fadeOut(2000);
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
    img.style.left = story.left;
    img.style.top = story.top;
    $(containerId).append(img);
  });

}
