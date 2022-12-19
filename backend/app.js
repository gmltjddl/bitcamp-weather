const express = require('express');
const request = require('request');

const port = 3000;

const app = express();

app.use(express.urlencoded({extended: true}));

app.get('/weather', (req, res) => {  

  res.set('Access-Control-Allow-Origin', '*');
  res.set('Content-Type', 'application/json; charset=UTF-8');

  let openApiUrl = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?" +
  "serviceKey=s2eMCzdkGrxPMhVr%2Bhv2U3bF%2Bj3ui%2B7qUS4r0tJKms0%2Bm%2FDN2TCj76L0o%2BacXVPei8K2lxKVFICQraz0iZgJ5g%3D%3D" +
  "&pageNo=1" +
  "&numOfRows=300" +
  "&dataType=JSON" +
  "&base_date=" + req.query.newDate +
  "&base_time=" + req.query.baseTime +
  "&nx=60" +
  "&ny=127";

  request.get({
    uri: openApiUrl
  }, (error, reponse, body) =>{
    res.send(JSON.stringify(body));
    // res.send(body);
  });
});


app.listen(
  3000,                          
  () => {                        
    console.log(`${port}번 포트에서 서버 시작했음!`);
  }
);