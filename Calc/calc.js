/**
 * Created by Admin on 25.09.2015.
 */
var cookIndex = 0;
var underTekData='';    //  строка над текущей
var tekData="";         //  текущие вводимые данные
var tekOper ="";        //  текущая операция
var data1=null;         //  первое число
var data2=null;         //  второе число
var rezalt=null;        //  результат
var simOper="";         //  символ операции
var inOper=false;       //  введена операция
var errorOper=false;    //  ошибка в операции
var endOfInput = false; //  конец ввода
var memoryData = 0;     //  содержимое памяти

var inputKeys = ["Bpoint","BPlus","BMinus","BMul","BDiv","BSqrt","BPersent","BDivX","BRavno","Bpm","BC","Bmc","Bmr","Bms","Bmplus","Bmminus", "Button2", "Button3" ];
var inNumKey ='';
var keyId = '';
var arrayTekData = [];

window.onload = function(){

    for (var j=0;j<=9;j++) {
        inputKeys.push("B"+j);
    }
    // задаем обработчики для всех клавиш ввода
    // все возможные id в массиве inputKeys
    for ( i=0; i < inputKeys.length ; i++ ) {
        document.getElementById(inputKeys[i]).onclick = function () {
            inOper = false;
            keyId = document.activeElement.getAttribute("id");
            // add cookie
            addCookie("PK"+addCookieIndex(),keyId,"/",78);
            //---------------------------------------------------
            // обработчики для клавиш ввода цифр
            if (keyId[0] == "B" && (keyId[1] * 1) <= 9 && (keyId[1] * 1) >= 0) {
                inputNumKey();
            } else {
                inNumKey = '';   // ввели не цифру
            }
            // точка ////////////////////////////////////
            if (keyId == "Bpoint") { inputPoint() }
            //  C  - очистка  /////////////////////////
            if (keyId == "BC") { clearCalc();
                delAllCookie()
            }
            //  CE сброс последнего числа  ////////////
            if (keyId == "Button2") { tekData ="" }
            //  BackSpace /////////////////////////////////////
            if (keyId == "Button3") { bakSpaceTekData()     }
            // Какая либо двухместная операция ///////////////////
            if (keyId == "BPlus" || keyId == "BMinus" || keyId == "BMul" || keyId == "BDiv" || keyId == "BPersent") {
                inputOper2();
            }
            // Какая-либо одноместная операция ///////////////////////
            if (keyId == "BSqrt" || keyId == "BDivX" || keyId == "Bpm" ) {
                inputOper1();
            }
            // Если равно ////////////////////////////////////////////
            if (keyId == "BRavno") { inputRavno() }
            // MC ///////////////////////////////////////////////////
            if (keyId == "Bmc") {
                memoryData = 0;
                inOper = true;
            }
            // MR /////////////////////////
            if (keyId == "Bmr") {
                tekData = memoryData+"";
                inOper = true;
            }
            // MS /////////////////////////
            if (keyId == "Bms") {
                memoryData = tekData*1;
                inOper = true;
            }
            // M+  ///////////////////////
            if (keyId == "Bmplus") {
                memoryData = memoryData + tekData*1;
                inOper = true;
            }
            // M- ///////////////////////////////
            if (keyId == "Bmminus") {
                memoryData = memoryData - tekData*1;
                inOper = true;
            }
            // отображение результатов //////////////
            if (errorOper) {
                document.getElementById("wb_Text1").innerHTML = "Error";
                document.getElementById("wb_Text2").innerHTML = "Error";
                errorOper = false;
                clearCalc();
            }else{
                // отображение памяти
                if (!(memoryData == 0 ) ) {
                    document.getElementById("wb_Text3").innerHTML = "M="+memoryData;
                }else{
                    document.getElementById("wb_Text3").innerHTML = "";
                }
                // отображение основного результата

                if (rezalt==null) {
                    document.getElementById("wb_Text1").innerHTML = tekData;
                }else{
                    document.getElementById("wb_Text1").innerHTML = rezalt;
                    rezalt = null;
                }
                // отображение над-строки
                if (tekOper !== "" && inOper ) {
                    underTekData = underTekData +" "+data1+" "+ simOper;
                }
                document.getElementById("wb_Text2").innerHTML = underTekData;
            }

        }
    }
};

function addCookieIndex() {
    return numTo3str(cookIndex++);
}

function numTo3str(n) {
    if ( n<10  ) {return "00"+n  }
    if ( n<100 ) {return "0"+n   }
    if ( n<1000) {return n+""    }
}