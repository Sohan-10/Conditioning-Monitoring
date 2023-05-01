async function getData(){
    
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
