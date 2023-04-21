async function getData(){
    
    let res = await fetch('https://api.thingspeak.com/channels/2044503/feeds.json?api_key=K7643WI2D3N53JZQ&results=2', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });
    let data = await res.json();
    return data;
  }
  
  let fields = [0,0,0,0,0,0,0,0];
  let elements = document.getElementsByClassName('fields');
  
  function setFields() {
    for (let i = 0; i < fields.length; i++)
        elements[i].children[1].textContent = fields[i];
  }
  
  setFields();
  
  function flash(msg){
    document.getElementById('pop').style.display='block';
    document.getElementById('error-msg').textContent=msg;
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
    let volt2= document.getElementById('volt2').textContent;
    let volt3= document.getElementById('volt3').textContent;
    if (volt1&&volt2&&volt3==BORDER_VOLT_VALUE) {
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
  
  setInterval(()=>{
    getData().then(data=>{
  
        for (let i = 1; i <= 8; i++) {
            let fieldData = data.feeds[1]["field" + i];
  
            if (fieldData != null)
                fields[i-1] = fieldData;
        }
  
        console.warn("Entry ID: " + data.feeds[1].entry_id);
        setFields();
        checkFields();
  
    })
  }, 15000);

