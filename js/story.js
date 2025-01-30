var TimelineSections;
var CurrentTimeline = 0;


$( document ).ready(function() {
    console.log( "ready!" );
    TimelineSections = $(".timeline-section");
    $(".next-arrow").bind("click", AdvanceTimeline);
});




function AdvanceTimeline(){
  if (CurrentTimeline < TimelineSections.length-1){
    $(TimelineSections[CurrentTimeline]).removeClass("current-timeline");
    $(TimelineSections[CurrentTimeline]).addClass("previous-timeline");

    $(TimelineSections[CurrentTimeline+1]).removeClass("hidden-timeline");
    $(TimelineSections[CurrentTimeline+1]).addClass("current-timeline");
    CurrentTimeline++;
  }
}
