let back = document.querySelector('.back');
let weatherImg = document.querySelector('.weatherImg');
let weatherText = document.querySelector('.weatherText');
let wind = document.querySelector('.wind');
let windText = document.querySelector('.windText');
let humidity = document.querySelector('.humidity');
let precipitation = document.querySelector('.precipitation');
let tmx = document.querySelector('.tmx');
let tmn = document.querySelector('.tmn');
let clockText = document.querySelector('.clockText');

let time = document.querySelector('.titleTime');

let footer = document.querySelector('.footer');

let info;

let yyyy = 0,
  mm = 0,
  dd = 0,
  hours = 0,
  minutes = 0,
  seconds = 0,
  newDate = 0;

(function () {
  let xhr = new XMLHttpRequest();

  let date = new Date();

  yyyy = date.getFullYear();
  mm = date.getMonth() + 1;
  dd = date.getDate() ;

  hours = date.getHours();
  minutes = date.getMinutes();
  seconds = date.getSeconds();

  newDate = yyyy.toString() + mm.toString() + dd.toString();
  console.log(newDate);
  time.innerHTML = yyyy + '-' + mm + '-' + dd;

  let baseTime;

  if(hours >= 2 && hours < 5) {
    baseTime = '0200';
  } else if (hours >= 5 && hours < 8) {
    baseTime = '0500';
  } else if (hours >= 8 && hours < 11) {
    baseTime = '0800';
  } else if (hours >= 11 && hours < 4) {
    baseTime = '1100';
  } else if (hours >= 14 && hours < 17) {
    baseTime = '1400';
  } else if (hours >= 17 && hours < 20) {
    baseTime = '1700';
  } else if (hours >= 20 && hours < 23) {
    baseTime = '2000';
  } else if (hours >= 23 && hours < 24) {
    baseTime = '2300';
  }

  xhr.open(
    "GET",
    "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?" +
    "serviceKey=s2eMCzdkGrxPMhVr%2Bhv2U3bF%2Bj3ui%2B7qUS4r0tJKms0%2Bm%2FDN2TCj76L0o%2BacXVPei8K2lxKVFICQraz0iZgJ5g%3D%3D" +
    "&pageNo=1" +
    "&numOfRows=300" +
    "&dataType=JSON" +
    "&base_date=" + newDate +
    "&base_time=" + baseTime +
    "&nx=60" +
    "&ny=127", false);
  xhr.send();

  info = JSON.parse(xhr.responseText);

  let tmp = 0,
    reh = 0,
    wsd = 0,
    pty = 0,
    sky = 0,
    pop = 0;
    tmx = 0;
    tmn = 0;


  info.response.body.items.item.forEach((index) => {
    if (index.category == 'TMP') {
      tmp = parseInt(index.fcstValue);
    } else if (index.category == 'REH') {
      reh = parseInt(index.fcstValue);
    } else if (index.category == 'WSD') {
      wsd = index.fcstValue;
    } else if (index.category == 'PTY') {
      pty = parseInt(index.fcstValue);
    } else if (index.category == 'SKY') {
      sky = parseInt(index.fcstValue);
    } else if (index.category == 'POP') {
      pop = parseInt(index.fcstValue);
    } else if (index.category == 'TMX') {
      tmx = parseInt(index.fcstValue);
    } else if (index.category == 'TMN') {
      tmn = parseInt(index.fcstValue);
    }
  
  });


  document.querySelector('.weatherTmp').innerHTML = `${tmp}°`;
  document.querySelector('.tmx').innerHTML = `↑${tmx}°`;
  document.querySelector('.tmn').innerHTML = `↓${tmn}°`;

  if (pty == 0 && sky == 1) {
    weatherImg.style = 'background-image: url(../frontend/img/sun.png)';
    back.style = 'background-image: url(../frontend/img/back1.jpg)';
    weatherText.innerHTML = '맑음';
  } else if (pty == 0 && sky == 3) {
    weatherImg.style = 'background-image: url(../frontend/img/cloud.png)';
    back.style = 'background-image: url(../frontend/img/back1.jpg)';
    weatherText.innerHTML = '구름';
  } else if (pty == 0 && sky == 4) {
    weatherImg.style = 'background-image: url(../frontend/img/blackcloud.png)';
    back.style = 'background-image: url(../frontend/img/back2.jpg)';
    weatherText.innerHTML = '흐림';
  } else if (pty == 1) {
    weatherImg.style = 'background-image: url(../frontend/img/rain.png)';
    back.style = 'background-image: url(../frontend/img/back2.jpg)';
    weatherText.innerHTML = '비';
  } else if (pty == 2) {
    weatherImg.style = 'background-image: url(../frontend/img/rainsnow.png)';
    back.style = 'background-image: url(../frontend/img/back3.jpg)';
    weatherText.innerHTML = '비와 눈';
  } else if (pty == 3) {
    weatherImg.style = 'background-image: url(../frontend/img/snow.png)';
    back.style = 'background-image: url(../frontend/img/back3.jpg)';
    weatherText.innerHTML = '눈';
  } else if (pty == 4) {
    weatherImg.style = 'background-image: url(../frontend/img/rainrain.png)';
    back.style = 'background-image: url(../frontend/img/back2.jpg)';
    weatherText.innerHTML = '소나기';
  }

  if (wsd >= 0 && wsd < 1) {
    wind.innerHTML = '고요';
  } else if (wsd >= 1 && wsd < 2) {
    wind.innerHTML = '아주약함';
  } else if (wsd >= 2 && wsd < 3) {
    wind.innerHTML = '약함';
  } else if (wsd >= 3 && wsd < 5) {
    wind.innerHTML = '중간';
  } else if (wsd >= 5 && wsd < 7) {
    wind.innerHTML = '조금강함';
  } else if (wsd >= 7 && wsd < 10) {
    wind.innerHTML = '강함';
  } else if (wsd >= 10 && wsd < 12) {
    wind.innerHTML = '태풍';
  }



  wind.style = 'background-image: url(../frontend/img/wind.png)';
  
  humidity.style = 'background-image: url(../frontend/img/humidity.png)';
  humidity.innerHTML = `${reh}%`;

  precipitation.style = 'background-image: url(../frontend/img/precipitation.png)';
  precipitation.innerHTML = `${pop}%`;




})();

function clock() {

  let date = new Date();

  yyyy = date.getFullYear();
  mm = date.getMonth() + 1;
  dd = date.getDate();

  hours = date.getHours();
  minutes = date.getMinutes();
  seconds = date.getSeconds();
  clockText.innerHTML = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes }`  : minutes }:${seconds < 10 ? `0${seconds }`  : seconds }`;
}

function init() {

  clock();
  
  setInterval(clock, 1000);
}
  
init();