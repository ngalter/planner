// A $( document ).ready() block.
$(document).ready(function () {
    var currentHour = moment().format("HH");
    var today = moment().format("MMDDYY");
    var currentDay = today.slice(2,4);
    var newHour = currentHour;
    var calendarDate = moment().format("dddd, MMMM Do, YYYY"); 
    var myHour = ["9am", "10am", "11am", "Noon", "1pm", "2pm", "3pm", "4pm", "5pm"];

    function indexHour(x) {
        var indexHour = ["09", "10", "11", "12", "13", "14", "15", "16", "17"];
        return indexHour[x];
    }

    function getCurrentDay()
    {
        today = moment().format("MMDDYY");
        currentDay = today.slice(2,4);
        calendarDate = moment().format("dddd, MMMM Do, YYYY"); 
        $("#currentDay").html(calendarDate);
        checkHours();
    }
    function startTimer() {
        
        $("#currentDay").html(calendarDate);
        console.log(currentHour);
        var myTimer = setInterval(function () {
            newTime = moment().format("HHDD")
            newHour = newTime.slice(0,2);
            newDay = newTime.slice(2,4);
            console.log(newHour);
            console.log(newDay);
            if (currentHour !== newHour) {
                currentHour = newHour;
                console.log(currentHour);
                getCurrentDay();
            };
        }, 1000);
    }

    function createCalendar() {
 
        $.each(myHour, function (i, value) {
            console.log(value);
            var calHour = $("<p>").text(value).addClass("hour").attr("id", "t" + (i + 9).toString());
            var myHr = indexHour(i);
            var myId = "#" + myHr;
            if (parseInt(currentHour) >= 18 && parseInt(currentHour) <= 24) 
            {
                var calInput = $("<textarea rows='3'>").addClass("past time-block").attr("id", myHr);
            }
            else  
            {
                var calInput = $("<textarea rows='3'>").addClass("future time-block data").attr("id", myHr);
            }
            var calBtn = $("<button>").html("<i class=\"far fa-share-square\"></i>").addClass("saveBtn");
            $("#timeBlock").append(calHour, calInput, calBtn);
        });
        $("button").click(function () {
            saveData();
        });
    }

    function saveData() {
        if (typeof(Storage) !== "undefined") {
            var userInput = "";

            for (var i = 0; i < 9; i++)
            {
                userInput = document.getElementById(indexHour(i)).value;
                localStorage.setItem(today+indexHour(i), userInput);
            }
          } else {
            // Sorry! No Web Storage support..
          }
    
    }
        
    function getData() {
        if (typeof(Storage) !== "undefined") {
            // Code for localStorage/sessionStorage.
            var userInput = "";
            
            for (var i = 0; i < 9; i++)
            {
                dateKey = today + indexHour(i);
                userInput = localStorage.getItem(dateKey);
                document.getElementById(indexHour(i)).value = userInput;
            }
          } else {
            // Sorry! No Web Storage support..
          } 
    }
        
        function checkHours()
        {       
            if (parseInt(currentHour) >= 18 && parseInt(currentHour) <= 24) {
                $("textarea").removeClass("future present");
                $("textarea").addClass("past");
            }
            else if (parseInt(currentHour) >= 0 && parseInt(currentHour) <= 8) {
                $("textarea").removeClass("past present");
                $("textarea").addClass("future");
            }
            else {

                console.log(currentHour);
                var myId = document.getElementById(currentHour);
                console.log(myId);
                $(myId).addClass("present");
                $(myId).removeClass("past");
                $(myId).removeClass("future");
                $(myId).nextAll("textarea").addClass("future");
                $(myId).nextAll("textarea").removeClass("past present");
                $(myId).prevAll("textarea").addClass("past");
                $(myId).prevAll("textarea").removeClass("present future");
            }
        }
    
    startTimer();
    createCalendar();
    getData();
    checkHours();
    });
