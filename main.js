let contenedor = document.getElementById('container');
let input = document.getElementById('input');
let button = document.getElementById('buscar');
button.addEventListener('click', function(){
    console.log(input.value.toLowerCase()); //
    contenedor.style.display = 'flex';
    if(input.value !== ''){
        getCoin(input.value.toLowerCase());
    }else{
        contenedor.innerHTML = `
            <p>Debe ingresar una moneda</p>
        `;
    }
});

function getCoin(coin){
    
    fetch('https://api.coingecko.com/api/v3/coins/list', {mode: 'cors'})
    .then(response => response.json())
    .then((data) => {
        let moneda = data.filter(c => c.symbol == coin);
        console.log(moneda[0]);
        fetch(`https://api.coingecko.com/api/v3/coins/${moneda[0].id}`)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            contenedor.innerHTML = `
                <div class='container__intro'>
                    <h2>${data.name}</h2>
                    <img src='${data.image.small}' alt='${data.name}'>
                </div>
                <div class='container__price'>
                    <p>$${data.market_data.current_price.usd}</p>
                </div>
            `
        })
    })
    .catch(err => console.log(err));
}