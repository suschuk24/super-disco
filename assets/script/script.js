// Initialize Empty Arrays
var toDoList = []
var times = []
var saveBtns = []

// use moment.js to add currrent date
var todaysDate = moment().format("dddd, MMMM Do")
$("#currentDay").text(todaysDate)

var hourNow = moment().startOf('hour');


// add time slots and save buttons to arrays
for(var i = 7; i<= 17; i++) {
    // create vars for time moment, create block and savebutton id querys
    var block = $("#time-" + i + " textarea")
    var saveBtn = $("#time-" + i + " .saveBtn")
    var time = moment().startOf(todaysDate).add(i, 'hours')



    // create ann object for later ref
    var timeBlock = {
        time: time,
        block: block
    }
    times.push(timeBlock);
    saveBtns.push(saveBtn);
}


reload();

// add event listener to save bts
saveBtns.forEach(function(button, index) {
    var value = button
      .parent()
      .attr("id")
      .replace("time-", "");
      button.click(function() {
          text=$("#time-" + value + " textarea" )
            .val()
            .trim()
        toDoList[value - 7] = text;
        localStorage.setItem("toDoList", JSON.stringify(toDoList))
      })
})

//create function to change colors based on current time ****Got help from Kereem Legget on this part, couldn't get times to assign correct with moment.js using .diff

var currentHour = moment().hour();
    
$(".time-frame").each(function(){
    var timeBlockHour = parseInt($(this).attr("id").split("-")[1]);
   
    if (timeBlockHour < currentHour){
        $(this).children('textarea').addClass("past")

    }else if (timeBlockHour == currentHour){
        $(this).removeClass("past")
        $(this).children('textarea').addClass("present")

    } else if (timeBlockHour > currentHour){ 
        $(this).removeClass("present")
        $(this).children('textarea').addClass("future")
    }
}, 600000);

// load/set up local storage data
function reload() {
    var localDdata = localStorage.getItem("toDoList")
    if(!localDdata) {
        for (var i  = 0; i < times ; i++) {
            toDoList.push("");
        } return false;
    } 
    toDoList = JSON.parse(localDdata)

    times.forEach(function(block, index) {
        block.block.val(toDoList[index])
    })
}








