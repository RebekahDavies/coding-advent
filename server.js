const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
    //__dirname : It will resolve to your project folder.
  });
router.get('/day-1',function(req,res){
res.sendFile(path.join(__dirname+'/public/pages/day-1.html'));

});

//add the router
app.use(express.static(__dirname + '/public'));
//Store all HTML files in view folder.

app.use('/', router);
app.listen(process.env.port || 8080);

console.log('Running at Port 8080');