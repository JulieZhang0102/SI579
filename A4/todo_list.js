document.addEventListener('DOMContentLoaded', function() {
    addTask("Buy cat food", 1639944400000);
    addTask("Buy milk");
    addTask("Learn to wrap gifts", 1639955500000);
    addTask("Learn Yoga");
}, false);

function dateAndTimeToTimestamp(dateInputElement, timeInputElement) {
    const dueDate = dateInputElement.valueAsNumber; // Returns the timestamp at midnight for the given date
    const dueTime = timeInputElement.valueAsNumber; // Returns the number of milliseconds from midnight to the time

    if(dueDate && dueTime) { // The user specified both a due date & due time
        //Add the timezone offset to account for the fact that timestamps are specified by UTC
        const timezoneOffset =  (new Date()).getTimezoneOffset() * 60 * 1000;
        return dueDate + dueTime + timezoneOffset;
    } else {
        // if the user did not specify both a due date and due time, return false
        return false;
    }
}

document.getElementById("add_task").addEventListener("click", function(){ 
    addTask(document.getElementById("task_description_input").value, 
    dateAndTimeToTimestamp(document.getElementById("duedate_input"), document.getElementById("duetime_input")));});

document.getElementById("task_description_input").addEventListener("keydown", function (e) {
    if (e.key === 'Enter') {
        addTask(document.getElementById("task_description_input").value, 
        dateAndTimeToTimestamp(document.getElementById("duedate_input"), document.getElementById("duetime_input")));
    }
});

function addTask(description, dueTime = false) {

    var setItem = document.createElement('li');
    var setText = document.createTextNode(description + " ");
    setItem.appendChild(setText);

    if (dueTime) {
        var setDueTime = document.createElement('span');
        setDueTime.setAttribute('class', 'due');
        var dateString = new Date(dueTime);
        var hour = ((dateString.getHours() + 11) % 12 + 1);
        var apm;
        if (dateString.getHours() >= 12) {
            apm = " PM"
        } else {
            apm = " AM"
        }
        var dateTime =
            ("00" + (dateString.getMonth() + 1)).slice(-2) + "/" +
            ("00" + dateString.getDate()).slice(-2) + "/" +
            dateString.getFullYear() + " " +
            ("00" + hour).slice(-2) + ":" +
            ("00" + dateString.getMinutes()).slice(-2) + ":" +
            ("00" + dateString.getSeconds()).slice(-2) + apm;
        setDueTime.innerHTML = "due " + dateTime;
        setItem.appendChild(setDueTime);
    }

    var setButton = document.createElement("button");
    setButton.appendChild(document.createTextNode('Done'));
    setButton.setAttribute('class', 'btn btn-sm btn-outline-danger done');
    setButton.setAttribute('type', 'button');
    setButton.addEventListener('click', function(){setButton.parentElement.remove();});
    setItem.appendChild(setButton);
 
    var getList = document.getElementById('task_list');
    getList.appendChild(setItem);

    document.getElementById('task_description_input').value = '';
    document.getElementById('duedate_input').value = '';
    document.getElementById('duetime_input').value = '';

}