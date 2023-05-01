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

let fields = [0, 0, 0, 0, 0, 0, 0, 0, 0];
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


const BORDER_TEMP_VALUE = 100;
const BORDER_VOLT_VALUE = 0;
const BORDER_CURRENT_VALUE = 3;
const BORDER_POWER_VALUE = 786;
const BORDER_ENERGY_VALUE = 1000;
const BORDER_FREQUENCY_VALUE = 50;
const BORDER_PF_VALUE = 0.76;

function checkFields() {
    /**
     * @param document.getElementById("ID OF THE <label id="temp"></label>")
     * @param flash("ID OF THE <label id="temp"></label>")
     */

    let temp = document.getElementById('temp').textContent;
    if (temp > BORDER_TEMP_VALUE) {
        flash('HIGH TEMPERATURE');
    }

    let volt1 = document.getElementById('volt1').textContent;
    let volt2 = document.getElementById('volt2').textContent;
    let volt3 = document.getElementById('volt3').textContent;
    if (volt1 && volt2  == BORDER_VOLT_VALUE) {
        flash('One Phase is Open');
    }


    let current = document.getElementById('current').textContent;
    if (current > BORDER_CURRENT_VALUE) {
        flash('current');
    }

    let power = document.getElementById('power').textContent;
    if (power > BORDER_POWER_VALUE) {
        flash('power');
    }

    let energy = document.getElementById('energy').textContent;
    if (energy > BORDER_ENERGY_VALUE) {
        flash('energy');
    }

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
        let number1=data.temp;
        let decimal1=number1.toFixed(1);
        let number2=data.volt_1;
        let decimal2=Math.trunc(number2);
        let number3=data.volt_2;
        let decimal3=number3.toFixed(1);
        let number4=data.volt_3;
        let decimal4=number4.toFixed(1);
        let number5=data.current;
        let decimal5=number5.toFixed(1);
        let number6=data.Power;
        let decimal6=number6.toFixed(1);
        let number7=data.Energy;
        let decimal7=number7.toFixed(2);
        let number8=data.frequency;
        let decimal8=number8.toFixed(1);
        let number9=data.PF;
        let decimal9=number9.toFixed(1);
        fields[0] = decimal1
        fields[1] = decimal2
        fields[2] = decimal3
        fields[3] = decimal4
        fields[4] = decimal5
        fields[5] = decimal6
        fields[6] = decimal7
        fields[7] = decimal8
        fields[8] = decimal9

        
        setFields();
        checkFields();

    })
}, 15000);
