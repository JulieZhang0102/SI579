/*
* Excercise 1
*
*/



/*
* Then write a function that changes the text and the color inside the div
*
*/

document.getElementById('color-block').onclick = function changeColor(){
    //Write a condition determine what color it should be changed to

    var x = document.getElementById('color-name').innerHTML;
    var y = document.getElementById('color-block');

    if(x == '#F08080'){
        //change the background color using JS
        y.style.backgroundColor = "#42b9f5"
        //Change the text of the color using the span id color-name
        document.getElementById('color-name').innerHTML = '#42b9f5'
    }
    else{
        //change the background color using JS
        y.style.backgroundColor = "#F08080"
        //Change the text of the color using the span id color-name
        document.getElementById('color-name').innerHTML = '#F08080'
    }
}


/*
* For excercise 2, you need to write an event handler for the button id "convertbtn"
* on mouse click. For best practice use addEventListener.
*
*/

document.getElementById('convertbtn').addEventListener("click", convertTemp);

/*
* Then write a function that calculates Fahrenheit to Celsius and display it on the webpage
*
*/

function convertTemp(){

    //Calculate the temperature here

    var ftemp = document.getElementById('f-input').value;
    var ctemp = (ftemp - 32)*(5/9);

    //Send the calculated temperature to HTML

    document.getElementById('c-output').innerHTML = ctemp;

}


