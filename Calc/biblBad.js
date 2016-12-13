/**
 * Created by Admin on 25.09.2015.
 */
// клавиша сброс
function clearCalc(){
    tekOper  = '';
    tekData = '';
    underTekData = "";
    data1 = null;
    data2 = null;
    rezalt = null;
}
// клавиша равно
function inputRavno(){
    if (data1 !== null && data2 == null) {
        data2 = tekData*1;
        // +
        if (tekOper=="BPlus") {
            rezalt = data1+data2;
        }
        //  %
        if (tekOper=="BPersent") {
            rezalt = (data1*100)/data2;
        }
        // -
        if (tekOper=="BMinus") {
            rezalt = data1-data2;
        }
        //   /
        if (tekOper=="BDiv") {
            if (data2 == 0) {
                errorOper =true;
                rezalt = 0;
            }else{
                rezalt = data1/data2;
            }
        }
        //  *
        if (tekOper=="BMul") {
            rezalt = data1*data2;
        }
        if (rezalt%1 !==0 ) {
            rezalt = (rezalt.toFixed(2))*1;
        }
        //
        data1=null;
        data2=null;
        tekData = rezalt;
        underTekData="";
        tekOper ="";
        endOfInput = true;
    }


}
//------------------------------------
// Ввели точку
function inputPoint(){
    if (!isPointInString(tekData)) {
        tekData = tekData+".";
    }
}

//----------------------
//  Отработка backSpace
function bakSpaceTekData() {
    if ( tekData.length >= 1) {
        arrayTekData = [];
        for (var k = 0; k < tekData.length; k++) {
            arrayTekData[k] = tekData[k];
        }
        tekData = "";
        for (var t = 0; t < arrayTekData.length-1; t++) {
            tekData += arrayTekData[t];
        }
    }
}

//-----------------------------------------
// Одноместные операции
function inputOper1() {
    inOper = true;
    tekOper = keyId;
    data1 = tekData*1;

    if ( keyId == "BSqrt" ) {
        simOper = " Sqrt ";
        underTekData = "";
        rezalt = Math.sqrt(tekData*1);
        if (rezalt%1 !==0 ) {
            rezalt = (rezalt.toFixed(2))*1;
        }
    }
    if ( keyId == "Bpm" ) {
        simOper = "+-";
        underTekData = "";
        rezalt = tekData*(-1);
    }
    if ( keyId == "BDivX" ) {
        simOper = "1/x";
        underTekData = "";
        rezalt = 1/(tekData*1);
        if (rezalt%1 !==0 ) {
            rezalt = (rezalt.toFixed(2))*1;
        }
    }
    tekData=rezalt+"";
}
//--------------------------------------------------
// Если какая либо двухместная операция
// tekData преобразуется и перемещается в data1
// tekData очищается  в tekOper заносится текущая операция
function inputOper2(){
    inOper = true;
    data1 = (tekData) * 1;
    tekData = '';
    tekOper = keyId;

    if (keyId=="BPlus") { simOper = "+"  }
    if (keyId=="BMinus") { simOper = "-"  }
    if (keyId=="BMul") { simOper = "*"  }
    if (keyId=="BDiv") { simOper = "/"  }
    if (keyId=="BPersent") { simOper = "%"  }

}
//------------------------------------------------
// Проверка, есть ли уже точка в строке
function isPointInString(s) {
    var outValue = false;
    for (var i=0; i < s.length; i++) {
        if (s[i]=='.') { return true; }
    }
    return false;
}

// Ввели цифру
function inputNumKey( ){
    inNumKey = keyId[1];
    // если в tekData результат, то перед вводом очистить его
    if ( endOfInput ) {
        tekData="";
        endOfInput = false;
    }
    // заносим введенную цифру
    tekData+=keyId[1];      // ввели цифру

    // Удаление ведущих нулей
    if ( tekData.length > 1) {
        arrayTekData = [];
        for (var k = 0; k < tekData.length; k++) {
            arrayTekData[k] = tekData[k];
        }
        outNull:
            for (var k = 0; k < tekData.length - 1; k++) {
                if (!(tekData[k] == 0)) {
                    break outNull;
                }
            }
        tekData = "";
        for (var t = k; t < arrayTekData.length; t++) {
            tekData += arrayTekData[t];
        }
    }
}
// Вывод диагностики на консоль
function oTC(keyId, tekData, tekOper, data1, data2, rezalt){
    console.log("data1   = "+data1);
    console.log("Key     = "+keyId);
    console.log("data2   = "+data2);
    console.log("tekOper ="+tekOper);
    console.log("tekData ="+tekData);
    console.log("rezalt  ="+rezalt);
    console.log("-----------------------");
}

//------------------------------------
// Удаляет все cookie
//
function delAllCookie() {
    debugger;
    var cook = document.cookie;
    var cookArray = cook.split("; ");
    var cookForDel = [];
    var date =new Date(0);

    for (var i = 0; i < cookArray.length; i++) {
        cookForDel[i] = cookArray[i].substr(0,cookArray[i].indexOf("=")+1);
        document.cookie = cookForDel[i]+"; path=/; "+"expires="+date.toUTCString()+";";

    }
}
//------------------------------
// Добавить cookie
function addCookie(name,value,path,hour ) {
    var dateTek = new Date();
    var cookExpire = new Date( dateTek.getTime() + hour*60*60*1000);
    document.cookie = name+"="+value+"; path="+path+"; "+"expires="+cookExpire.toUTCString()+";";
}