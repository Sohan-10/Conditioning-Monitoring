async function getData() {

    let res = await fetch('http://localhost:3000/output', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });
    let data = await res.json();
    return data;
}

const host_disconnected = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
let fields = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let elements = document.getElementsByClassName('fields');

function setFields() {
    for (let i = 0; i < fields.length; i++)
        elements[i].children[1].textContent = fields[i];
}

setFields();

function flash(msg) {
    document.getElementById('pop').style.display = 'block';
    document.getElementById('error-msg').textContent = msg;
}


const BORDER_TEMP_VALUE = 40;
const BORDER_VOLT_VALUE = 240;
const BORDER_CURRENT_VALUE = 3.4;
const BORDER_POWER_VALUE = 786;
const BORDER_ENERGY_VALUE = 1000;
const BORDER_FREQUENCY_VALUE = 60;
const BORDER_PF_VALUE = 0.76;

function checkFields() {
    /**
     * @param document.getElementById("ID OF THE <label id="temp"></label>")
     * @param flash("ID OF THE <label id="temp"></label>")
     */

    let temp = document.getElementById('temp').textContent;
    if (temp > BORDER_TEMP_VALUE) {
        flash('OVERLOADING');
    }

    let volt1 = document.getElementById('volt1').textContent;
    let volt2 = document.getElementById('volt2').textContent;
    let volt3 = document.getElementById('volt3').textContent;
    if (volt1 && volt2 && volt3 == BORDER_VOLT_VALUE) {
        flash('One Phase is Open');
    }


    let current1 = document.getElementById('current1').textContent;
    let current2 = document.getElementById('current2').textContent;
    let current3 = document.getElementById('current3').textContent;
    if (current1 || current2 || current3 == BORDER_CURRENT_VALUE ) {
        flash('Overloading');
    }

    let power = document.getElementById('power').textContent;
    if (power > BORDER_POWER_VALUE) {
        flash('power');
    }

    // let energy = document.getElementById('energy').textContent;
    // if (energy > BORDER_ENERGY_VALUE) {
    //     flash('energy');
    // }

    let frequency = document.getElementById('frequency').textContent;
    if (frequency > BORDER_FREQUENCY_VALUE) {
        flash('frequency');
    }

    let pf = document.getElementById('pf').textContent;
    if (pf > BORDER_PF_VALUE) {
        flash('pf');
    }
}

setInterval(() => {
     getData().then(data => {
            // let number1=data.temp;
            // let decimal1=number1.toFixed(1);

            // let number2=isNaN(Number(data.volt_1)) ? 0 : Number(data.volt_1);
            // let decimal2=number2.toFixed(1);
            
            // let number3=isNaN(Number(data.volt_2)) ? 0 : Number(data.volt_2);
            // let decimal3=number3.toFixed(1);
            
            // let number4=isNaN(Number(data.volt_3)) ? 0 : Number(data.volt_3);
            // let decimal4=number4.toFixed(1);
            
            // let number5=isNan(Number(data.current)) ? 0 : Number(data.current);
            // let decimal5=number5.toFixed(3);
            
            // let number6=isNan(Number(data.current1)) ? 0 : Number(data.current1);
            // let decimal6=number6.toFixed(3);
            
            // let number7=isNan(Number(data.current2)) ? 0 : Number(data.current2);
            // let decimal7=number7.toFixed(3);
            
            // let number8=isNan(Number(data.Power)) ? 0 : Number(data.Power);
            // let decimal8=number8.toFixed(3);
            
            // let number9=isNan(Number(data.Power_phase2)) ? 0 : Number(data.Power_phase2);
            // let decimal9=number9.toFixed(3);
            
            // let number10=isNan(Number(data.Power_phase3)) ? 0 : Number(data.Power_phase3);
            // let decimal10=number10.toFixed(1);
            
            // let number11=isNan(Number(data.frequency)) ? 0 : Number(data.frequency);
            // let decimal11=number11.toFixed(1);

            // let number12=isNan(Number(data.PF)) ? 0 : Number(data.PF);
            // let decimal12=number12.toFixed(3);



            fields[0] = data.Temp;
            fields[1] = data.volt_1;
            fields[2] = data.volt_2;
            fields[3] = data.volt_3;
            fields[4] = data.current1;
            fields[5] = data.current2;
            fields[6] = data.current;
            fields[7] = data.Power;
            fields[8] = data.Power_phase2;
            fields[9] = data.Power_phase3;
            fields[10] = data.frequency;
            fields[11] = data.PF;
            
                
        setFields();
        checkFields();

    })
}, 5000);
