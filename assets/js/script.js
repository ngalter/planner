// A $( document ).ready() block.
$( document ).ready(function() {
    var currentHour = moment().format("HH");
    var newHour = currentHour;
    var d = moment().format("dddd, MMMM Do, YYYY");
    var myHour = ["9am","10am","11am","Noon","1pm","2pm","3pm","4pm","5pm"];
    
    function indexHour(x)
    {
        var indexHour = ["09","10","11","12","13","14","15","16","17"];
        return indexHour[x];
    }
    function startTimer()
    {
        
        $("#currentDay").html(d);
        console.log(currentHour);
        var myTimer = setInterval(function()
        {
            newHour = moment().format("HH");
            if (currentHour !== newHour)
            {
                currentHour = newHour;
                console.log(currentHour);
                checkHours();
            };
        },1000);   
    }

    function createCalendar()
    {

        $.each(myHour, function (i, value) 
        {
            console.log(value); 
            var calHour = $("<p>").text(value).addClass("hour");
            var calInput = $("<textarea rows='2'>").addClass ("future time-block data").attr("id",indexHour(i));
            var calBtn = $("<button>").html("<i class=\"fas fa-download\"></i>").addClass("saveBtn");
            $("#timeBlock").append(calHour, calInput, calBtn);
        });
        $("button").click(function(){
            alert("The button was clicked.");
          });
    }



    function checkHours()
    {  
            console.log(currentHour);
            var myId = document.getElementById(currentHour);
            console.log(myId);
                $(myId).addClass("present");
                $(myId).removeClass("past");
                $(myId).removeClass("future");	
                $(myId).nextAll("textarea").addClass( "future");
                $(myId).nextAll("textarea").removeClass( "past present");
                $(myId).prevAll("textarea").addClass( "past");
                $(myId).prevAll("textarea").removeClass( "present future");
    }


    
    //    $.each("textara", function (i, value) {
      //    var hourText = [];
        //  hourText[i]= $("textarea").html;
   //       console.log($("textarea").html);
     //   });

    startTimer();
    createCalendar(); 
    checkHours();
});
