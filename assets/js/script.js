// A $( document ).ready() block.
$( document ).ready(function() {
    var currentHour = moment().format("HH");
    var newHour = currentHour;
    var d = moment().format("dddd, MMMM Do, YYYY");
    var myHour = ["9am","10am","11am","Noon","1pm","2pm","3pm","4pm","5pm"];
    var hours = ["09","10","11","12","13","14","15","16","17"];
    startTimer();
    createCalendar(); 
    checkHours();



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
        var $timeBlock = $("#timeBlock");
        $.each(myHour, function (i, value) 
        {
            console.log(value); 
            var strI = i.toString();
            var calHour = $("<p>").text(value).addClass("hour");
            var calInput = $("<textarea rows='2'>").addClass ("past time-block").attr("id",hours[i]);
            var calBtn = $("<button>").html("<i class=\"fas fa-download\"></i>").addClass("saveBtn");
            $("#timeBlock").append(calHour,calInput,calBtn);
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

    $("button").on("click", function(){
        alert("The paragraph was clicked.");

        var storeDate = d;
        var storeInput = []; 

        $.each(hours, function(i,value)
        {
            var storeInput = document.getElementById(value).innerHTML
            console.log(storeInput);
        });
    });

});
