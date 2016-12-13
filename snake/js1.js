//
// создание пол€ N x N
//
var whereAdd = undefined;
var kolX = 80;
var kolY = 25;
var lenOfTail = 19;
var currentDirection = 3;
var snakeSpeed = 500;

var curSteps = 0;
var curDlina = lenOfTail+1;
var curXav = 0;

// массив с элементами - головой и частицами хвоста
var snakeAll = [    {
    curX: 30,
    curY: 10,
    lastX:30,
    lastY:10,
    tekObject: new snakeHead() } ];


//
//  онструктор "√олова"
//
function snakeHead() {
    this.indexInArray = 0;
    this.moveForDir = function () {
        curSteps++;
        if ( snakeSpeed >200 ) {
            snakeSpeed--;
        }
        snakeAll[this.indexInArray].lastX = snakeAll[this.indexInArray].curX;
        snakeAll[this.indexInArray].lastY = snakeAll[this.indexInArray].curY;
        var x1 = numTo3str(snakeAll[this.indexInArray].curX);
        var y1 = numTo3str(snakeAll[this.indexInArray].curY);
        // debugger;
        document.getElementById(y1+x1).style.background = "#efefdf";

        switch (currentDirection) {
            case 0:
                snakeAll[this.indexInArray].curY = snakeAll[this.indexInArray].curY -1;
                break;
            case 3:
                snakeAll[this.indexInArray].curX = snakeAll[this.indexInArray].curX+1;
                break;
            case 6:
                snakeAll[this.indexInArray].curY = snakeAll[this.indexInArray].curY +1;
                break;
            case 9:
                snakeAll[this.indexInArray].curX = snakeAll[this.indexInArray].curX -1;
                break;
            default:
        }
        x = numTo3str(snakeAll[this.indexInArray].curX);
        y = numTo3str(snakeAll[this.indexInArray].curY);
        // проверка на окончание игры
        if ((document.getElementById(y+x).style.background !== "rgb(239, 239, 223)") &&
            (document.getElementById(y+x).style.background !== "orange")) {
            clearInterval(idTimeOut);
            clearInterval(idXavka);
            document.getElementById("end").innerHTML = " Game over ";
        }else{
            clearInterval(idTimeOut);
            idTimeOut = setInterval(dvig,snakeSpeed);
        }
        //
        // ѕроверка на захавывание хавки
        //
        if (document.getElementById(y+x).style.background == "orange") {
            lenOfTail = lenOfTail+1;
            snakeAll[lenOfTail] =     {
                curX: 2,
                curY: 2,
                lastX: 2,
                lastY: 2,
                tekObject: new tailOfSnake() };
                curXav++;
                curDlina++;
        }
        document.getElementById(y+x).style.background = "red";
        document.getElementById("pr").innerHTML = "<pre>Steps   "+curSteps+"</pre>";
        document.getElementById("dl").innerHTML = "<pre>Length   "+curDlina+"</pre>";
        document.getElementById("am").innerHTML = "<pre>Killed   "+curXav+"</pre>";
        document.getElementById("speed").innerHTML = "<pre>Speed   "+(1000/snakeSpeed).toFixed(2)+" steps per second </pre>";
    };
    this.showCurrentPoz = function () {
        var x = numTo3str(snakeAll[this.indexInArray].curX);
        var y = numTo3str(snakeAll[this.indexInArray].curY);
        document.getElementById(y+x).style.background = "red";
    };
}
//
//  конструктор хвост
//
function tailOfSnake() {
    this.indexInArray = snakeAll.length;
    this.showCurrentPoz = function () {
        var x = numTo3str(snakeAll[this.indexInArray].curX);
        var y = numTo3str(snakeAll[this.indexInArray].curY);
        document.getElementById(y+x).style.background = "green";
    };
    this.moveAfter = function () {
        var x1 = numTo3str(snakeAll[this.indexInArray].lastX);
        var y1 = numTo3str(snakeAll[this.indexInArray].lastY);
        document.getElementById(y1+x1).style.background = "#efefdf";
        x1 = numTo3str(snakeAll[this.indexInArray].curX);
        y1 = numTo3str(snakeAll[this.indexInArray].curY);
        document.getElementById(y1+x1).style.background = "green";
    };
}
//-------------------------------------------------
//  ќтработка клавиш
//
function ruling(event) {
    switch (event.keyCode){
        case 38:        // up
            if (currentDirection == 3) { turnLeft() }
            if (currentDirection == 9) { turnRight()}
            break;
        case 37:        // left
            if (currentDirection == 0) {turnLeft() }
            if (currentDirection == 6) {turnRight()}
            break;
        case 39:        // right
            if (currentDirection == 6) {turnLeft() }
            if (currentDirection == 0) {turnRight()}
            break;
        case 40:        // down
            if (currentDirection == 9) {turnLeft() }
            if (currentDirection == 3) {turnRight()}
            break;
        default:
    }
    function turnLeft() { currentDirection = currentDirection -3;
        if (currentDirection == -3) { currentDirection = 9  }
    }
    function turnRight() {currentDirection = currentDirection +3;
        if (currentDirection == 12) { currentDirection = 0  }
    }
}

//-----------------------
// ƒобавление "еды"
//
function addXavka() {
    var x;
    var y;
    var x1;
    var y1;
    var notAdd = true;
    while(notAdd) {
        x1 = (Math.random()*kolX).toFixed(0);
        y1 = (Math.random()*kolY).toFixed(0);
        if ( x1>1 && x1 < kolX-2 && y1 >1 && y1 < kolY - 2 ) {
            x = numTo3str(x1);
            y = numTo3str(y1);
            if (document.getElementById(y + x).style.background == "rgb(239, 239, 223)") {
                document.getElementById(y + x).style.background = "orange";
                notAdd = false;
            }
        }

    }
}
//--------------------------------
// ќтработка движени€
function dvig() {
    snakeAll[0].tekObject.moveForDir();   // движение головы
    for (var g=1; g<=lenOfTail; g++) {    // движение элементов хвоста
        snakeAll[g].lastX = snakeAll[g].curX;
        snakeAll[g].lastY = snakeAll[g].curY;
        snakeAll[g].curX = snakeAll[g-1].lastX;
        snakeAll[g].curY = snakeAll[g-1].lastY;
        snakeAll[g].tekObject.moveAfter();
    }
}
//''''''''''''''''''''''''''''''
//  —оздание пол€
function fieldCreate() {
    // создание tr - ов
    whereAdd = document.getElementById("first");
    for (var i = 1; i <= kolY+2; i++ ) {
        addNewElementTr(whereAdd,"tr"," ","tr"+i);
    }
// создание строк таблицы
    for (k=1; k<=kolY+2; k++) {
        // создание одной строки
        whereAdd = document.getElementById("tr"+k);
        for (var j= 1; j<=kolX+2; j++) {
            if (j==1 || j==kolX+2 || k==1 || k==kolY+2) {
                addNewElementOfTable(whereAdd,"td"," ", numTo3str(k)+numTo3str(j),"background: #000000");
            }else{
                addNewElementOfTable(whereAdd,"td"," ", numTo3str(k)+numTo3str(j),"background: #efefdf");
            }
        }
    }
}
//  создание одной строки
function addNewElementOfTable(where, newElemName, newText,idOfElem,styleAdd ){
    var neElem = document.createElement(newElemName);
    var newText  = document.createTextNode(newText);
    where.appendChild(neElem);
    where.lastElementChild.appendChild(newText);
    where.lastElementChild.setAttribute("id",idOfElem);
    where.lastElementChild.innerHTML = "<pre> </pre>";
    where.lastElementChild.setAttribute("style",styleAdd);
}
// добавление tr
function addNewElementTr(where, newElemName, newText,idOfElem ){
    var neElem = document.createElement(newElemName);
    var newText  = document.createTextNode(newText);
    where.appendChild(neElem);
    where.lastElementChild.appendChild(newText);
    where.lastElementChild.setAttribute("id",idOfElem);

}
// преобразование n в 3 символа с ведущими нул€ми
function numTo3str(n) {
    if ( n<10  ) {return "00"+n  }
    if ( n<100 ) {return "0"+n   }
    if ( n<1000) {return n+""    }
}

//--------------------------
// создание пол€
fieldCreate();

//---------------------------
// Ќачальный показ головы
snakeAll[0].tekObject.showCurrentPoz();

//---------------------------------
// ‘ормируем хвост
//
for (var g = 1; g<=lenOfTail; g++) {
    snakeAll[g] =     {
        curX: 30-g,
        curY: 10,
        lastX:30,
        lastY:10,
        tekObject: new tailOfSnake() };
    snakeAll[g].tekObject.showCurrentPoz();
}

// задаем интервал дл€ перемещени€ змеи
var idTimeOut = setInterval(dvig,snakeSpeed);
// забрасываем сразу первую хавку
addXavka();
// задаем интервал дл€ забрасывани€ хавки
var idXavka = setInterval(addXavka,10000);
