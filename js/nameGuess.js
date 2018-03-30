var newSet = [];
var finalset = [];
var clicked = false;
var tempwdth = 0;
var wdth = 0;
var nameIs = "";
var set1 = ['A', 'B', 'C', 'D', 'E', '-'];
var set2 = ['F', 'G', 'H', 'I', 'J', '-'];
var set3 = ['K', 'L', 'M', 'N', 'O', '-'];
var set4 = ['P', 'Q', 'R', 'S', 'T', '-'];
var set5 = ['U', 'V' ,'W', 'X', 'Y', '-'];
var set6 = ['Z', '-', '-', '-', '-', '-'];
var message = document.querySelector("#message");
var alertmsg = document.querySelector(".tablebox > p");
var btnLis = document.querySelectorAll("tr button");
var submit = document.querySelector("#submit");
var tbody = document.querySelector("tbody");
var cross = document.querySelector(".resultbox #close");
var resultbox = document.querySelector(".resultbox");
var pbarbox = document.querySelector("#progressBarBox");
var nameDiv = document.querySelector("#namebox");
var msg1 = "Do the steps <em>Once More</em> plz.";
var msg2 = "Opps...don't try to fool me. You haven't start the game yet.";
var msg3 = "Hey human, just click the creature name in the box which correspond to the column where you found your names's first letter. Keep Doing for remaining letters serially. And <em>click GO !!!</em>";
var msg4 = "Refreshing...";

//initializing required functions
init();
function init(){
    buttonEvents();
    mainBtns();
    crossbtn();
}

//adding event listener to all the buttons inside table header
function buttonEvents(){
   for(var i = 0; i < btnLis.length; i++ ){
    btnLis[i].addEventListener("click", function(){
       var btnVal = Number(this.value);
        if(clicked){
            if(finalset.length < newSet.length){
                setFinalSet(btnVal);
                // progress bar control according to the array length.
                if(wdth < 101){
                    pbar.style.width = wdth + '%';
                    if(wdth + tempwdth < 101){
                        wdth += tempwdth;
                    }
                }
                //condition to check if user has clicked same number of times as he have done in the fist step.
                if(finalset.length === newSet.length){
                    disablebtns("yes");
                }
            }
        }
        else{
            userSet(btnVal);
        }
    });
} 
}

// function to create arrays of data ( new set ) when user start the game very first
function userSet(btnVal){
    var arr = [set1[btnVal], set2[btnVal], set3[btnVal], set4[btnVal], set5[btnVal], set6[btnVal]];
    newSet.push(arr);
}

//event listener for submit button
function mainBtns(){
    submit.addEventListener("click", function(){
    if(newSet.length > 0){
        if(submit.getAttribute("id") === "submit"){
            clicked = !clicked;
            //caculation for equal progress of the progress bar according to the length of the newSet array
            tempwdth += 100/newSet.length;
            wdth = tempwdth;
            tbody.innerHTML = "";
            //function to print new table data
            newTableData();
            message.innerHTML = msg1;
//            submit.classList.replace("btnanimate", "btnScale"); // replace method has some browser compatibility issue 
            submit.classList.remove("btnanimate");
            submit.classList.add("btnScale");
            submit.setAttribute("id", "reveal");
            submit.innerHTML = "<p>I Am Done With My Magic</p><p>Click Here!</p>";
            pbarbox.style.display = "block";
        }
        else{
            eventAdd();
        }
    }
    else{
        fnAlert(msg2);
    }
});
}

// function to create arrays of data ( for finalSet set ) when user is on second step
function setFinalSet(btnVal){
    var tempArr = [];
    for(var j = 0; j < newSet.length; j++){
        tempArr.push(newSet[j][btnVal]);
    }
    finalset.push(tempArr);
}

//function to create new table data from the array generated by the user
function newTableData(){
    for(var i = 0; i < newSet.length; i++){
        var row = document.createElement("tr");
        for(var j = 0;  j < newSet[i].length; j++){
            var td = document.createElement("td");
            td.textContent = newSet[i][j];
            row.appendChild(td);
        }
        tbody.appendChild(row); 
    }
}

//function to disable or enable the buttons inside table header
function disablebtns(yesOrNo){
    btnLis.forEach( function(btn) {
        if(yesOrNo === "yes") {
            btn.setAttribute("disabled", "disabled");
        }
        else {
            btn.removeAttribute("disabled");
        }
    });
//        submit.classList.replace("btnScale", "btnanimate"); // replace method has some browser compatibility issue 
        submit.classList.remove("btnScale");
        submit.classList.add("btnanimate");
    
}

// function to display the resultant user word
function eventAdd(){
        nameResult();
        resultbox.classList.add("modelAnimate");
        displayName(); 
} 

//function to add every relative letter into the variable nameIs
function nameResult(){
    for(var i = 0; i < finalset.length; i++){
        nameIs += finalset[i][i];
    }
}

// external function from typed.js refer www.mattboldt.com
function displayName(){
    var typed = new Typed('#name', {
    strings: [nameIs],
    typeSpeed: 300,
    startDelay: 700
});
}

// function to alert message
function fnAlert(msg){
    alertmsg.textContent = msg;
    setTimeout(function(){
        alertmsg.textContent = "";
    }, 1000);
}

//function to close the model window
function crossbtn(){
    cross.addEventListener("click", function(){
        resultbox.classList.remove("modelAnimate");
        reset();
    
    });
}

//reset the table linked to Try Again Buton
function tableReset(){
     var setNames = [set1, set2, set3, set4, set5, set6];
    tbody.innerHTML = "";
        //loop to print default table data
    for(var i = 0; i < 6; i++){
        var row = document.createElement("tr");
        for(var j = 0;  j < setNames[i].length; j++){
            var td = document.createElement("td");
            td.textContent = setNames[i][j];
            row.appendChild(td);
        }
        tbody.appendChild(row); 
    }
}

// reset to the original webpage
function reset(){
    tableReset();
    disablebtns("no");
    newSet = [];
    finalset = [];
    clicked = !clicked;
    tempwdth = 0;
    wdth = 0;
    nameIs = "";
    pbar.style.width = wdth + '%';
    message.innerHTML = msg3;
//    submit.classList.replace("btnScale", "btnanimate"); // replace method has some browser compatibility issue 
    submit.classList.remove("btnScale");
    submit.classList.add("btnanimate");
    submit.setAttribute("id", "submit");
    submit.innerHTML = "GO !!!";
    pbarbox.style.display = "none";
    nameDiv.innerHTML = "";
    nameDiv.appendChild(document.createElement("span"));
    nameDiv.childNodes[0].setAttribute("id", "name");
    fnAlert(msg4);
}
