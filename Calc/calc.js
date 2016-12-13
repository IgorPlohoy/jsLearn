/**
 * Created by Admin on 25.09.2015.
 */
var cookIndex = 0;
var underTekData='';    //  ������ ��� �������
var tekData="";         //  ������� �������� ������
var tekOper ="";        //  ������� ��������
var data1=null;         //  ������ �����
var data2=null;         //  ������ �����
var rezalt=null;        //  ���������
var simOper="";         //  ������ ��������
var inOper=false;       //  ������� ��������
var errorOper=false;    //  ������ � ��������
var endOfInput = false; //  ����� �����
var memoryData = 0;     //  ���������� ������

var inputKeys = ["Bpoint","BPlus","BMinus","BMul","BDiv","BSqrt","BPersent","BDivX","BRavno","Bpm","BC","Bmc","Bmr","Bms","Bmplus","Bmminus", "Button2", "Button3" ];
var inNumKey ='';
var keyId = '';
var arrayTekData = [];

window.onload = function(){

    for (var j=0;j<=9;j++) {
        inputKeys.push("B"+j);
    }
    // ������ ����������� ��� ���� ������ �����
    // ��� ��������� id � ������� inputKeys
    for ( i=0; i < inputKeys.length ; i++ ) {
        document.getElementById(inputKeys[i]).onclick = function () {
            inOper = false;
            keyId = document.activeElement.getAttribute("id");
            // add cookie
            addCookie("PK"+addCookieIndex(),keyId,"/",78);
            //---------------------------------------------------
            // ����������� ��� ������ ����� ����
            if (keyId[0] == "B" && (keyId[1] * 1) <= 9 && (keyId[1] * 1) >= 0) {
                inputNumKey();
            } else {
                inNumKey = '';   // ����� �� �����
            }
            // ����� ////////////////////////////////////
            if (keyId == "Bpoint") { inputPoint() }
            //  C  - �������  /////////////////////////
            if (keyId == "BC") { clearCalc();
                delAllCookie()
            }
            //  CE ����� ���������� �����  ////////////
            if (keyId == "Button2") { tekData ="" }
            //  BackSpace /////////////////////////////////////
            if (keyId == "Button3") { bakSpaceTekData()     }
            // ����� ���� ����������� �������� ///////////////////
            if (keyId == "BPlus" || keyId == "BMinus" || keyId == "BMul" || keyId == "BDiv" || keyId == "BPersent") {
                inputOper2();
            }
            // �����-���� ����������� �������� ///////////////////////
            if (keyId == "BSqrt" || keyId == "BDivX" || keyId == "Bpm" ) {
                inputOper1();
            }
            // ���� ����� ////////////////////////////////////////////
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
            // ����������� ����������� //////////////
            if (errorOper) {
                document.getElementById("wb_Text1").innerHTML = "Error";
                document.getElementById("wb_Text2").innerHTML = "Error";
                errorOper = false;
                clearCalc();
            }else{
                // ����������� ������
                if (!(memoryData == 0 ) ) {
                    document.getElementById("wb_Text3").innerHTML = "M="+memoryData;
                }else{
                    document.getElementById("wb_Text3").innerHTML = "";
                }
                // ����������� ��������� ����������

                if (rezalt==null) {
                    document.getElementById("wb_Text1").innerHTML = tekData;
                }else{
                    document.getElementById("wb_Text1").innerHTML = rezalt;
                    rezalt = null;
                }
                // ����������� ���-������
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