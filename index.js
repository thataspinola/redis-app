const express = require('express');
const redis = require('redis');

let app1 = express();  // Compliant
app1.disable("x-powered-by");

let helmet = require("helmet");
let app2 = express(); // Compliant
app2.use(helmet.hidePoweredBy());
const client = redis.createClient({
    host: 'redis-server',
    port: 6379
});

client.set('visits',0);

app2.get('/', (req, res)=>{
    client.get('visits', (err, visits)=>{
        visits = parseInt(visits) + 1;
        res.send('Number of visits is:' + visits);
        client.set('visits', parseInt(visits));

        console.error(err);
    });
});

app2.listen(8081, ()=>{
    console.log('Serviço na porta 8081');
});