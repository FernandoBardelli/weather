document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    let input = document.querySelector('#searchInput').value;
    
    if(input !== '') {
        showWarning('Carregando...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=9f8e26909a94ce5f904a7e1c38c86209&units=metric&lang=pt_br`;
    
        let results = await fetch(url);
        let json = await results.json();

        if(json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg,
                condition: json.weather[0].description,
                humidity: json.main.humidity,
                weather: json.weather[0].main
            });
        } else {
            clearInfo();
            showWarning('Não foi possível encontrar essa localização!')
        }
        
    }
});

function showInfo(json) {
    showWarning('');

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    document.querySelector('.tempCondition').innerHTML = `${json.condition}`;
    document.querySelector('.umidadeInfo').innerHTML = `${json.humidity}<span>%</span>`;


    document.querySelector('.weatherBody').style.backgroundImage = `url(images/${json.weather}.jpg)`;



    document.querySelector('.temp img').setAttribute('src',`http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;


    document.querySelector('.resultado').style.display = 'block';
}

function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}


function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}