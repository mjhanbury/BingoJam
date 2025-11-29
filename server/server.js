const express = require('express');
const app = express();

const IPADDR = '192.168.1.29';
const PORTNO = 3000;

const cors = require('cors');
app.use(cors({ origin: [`http://${IPADDR}:${PORTNO}`] }));

app.use(express.static('../client/dist'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
});

app.listen(PORTNO, () => console.log(`SERVER LISTENING ON PORT ${PORTNO}`));