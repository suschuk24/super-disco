// Initialize Empty Arrays
var toDoList = []
var times = []
var saveBtns = []

// use moment.js to add currrent date
var todaysDate = moment().format("dddd, MMMM Do")
$("#currentDay").text(todaysDate)

// add time slots and save buttons to arrays
for(var i = 7; i<= 17; i++) {
    // create vars for time moment, create block and savebutton id querys
    var time = moment().startOf(todaysDate).add(i, 'hours')
    var block = $("#time-" + i + " textarea")
    var saveBtn = $("#time-" + i + " .saveBtn")

    // create ann object for later ref
    var timeBlock = {
        time: time,
        block: block,
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
        toDoList[value - 9] = text;
        localStorage.setItem("toDoList", JSON.stringify(toDoList))
      })
})

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

// auto update for live refresh
function autoUpdate() {
    for(var i = 0; i < times.length; i++){
    times[i].block.removeClass("past")
    times[i].block.removeClass("present")
    times[i].block.removeClass("future")

    // sync moment with start of time slot
    var hourNow = moment().startOf('hour');

    if(hourNow.diff(times[i].time, 'hour') === 0) {
        times[i].block.addClass("present");
    } else if(hourNow.diff(times[i].time, 'hour') > 0) {
        times[i].block.addClass("past");
    } else if(hourNow.diff(times[i].time, 'hour') < 0) {
        times[i].block.addClass("future");
    }}
}

autoUpdate()
setInterval((autoUpdate()), 5000000);