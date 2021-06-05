const express = require('express');
const bodyParser = require('body-parser')
const mysql = require('mysql')
const app = express()


app.use( express.static( "public" ) );
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

var connection = mysql.createConnection({
    host: "db-py2-moviles-hunt-alvarez-martinez.cdseqvbeenn9.us-east-2.rds.amazonaws.com",
    user:"jphuntv",
    password:"JpHv04102K",
    database:"munimovil"
});

//ok
app.post('/RegisterCiudadano', function(req, res) {
    var reqBody = req.body
    const correo = reqBody.correo
    const clave = reqBody.clave
    var sql = 'CALL RegisterCiudadano(?,?)'
    connection.query(sql,[correo, clave], function(err, results, fields) {
        if(err){
            console.log(err.message)
            res.send({msj:false})
        }else{
            insertado = true
            var id =  results[0][0]['idcuentaCiudadano'] 
            console.log('insertado:', id)
            res.send({msj:true, idCiudadano:id})
        }   
    })    
})


//ok
app.post('/AddInfoCiudadano', function(req, res) {
    var reqBody = req.body
    console.log(reqBody)
    const Nombre = reqBody.Nombre
    const Apellido1 = reqBody.Apellido1
    const Apellido2 = reqBody.Apellido2
    const Sexo = reqBody.Sexo
    const AnioNacimiento = reqBody.AnioNacimiento
    const PaisNacimiento = reqBody.PaisNacimiento
    const TipoIdentificacion = reqBody.TipoIdentificacion
    const NumIdentificacion = reqBody.NumIdentificacion
    const Provincia = reqBody.Provincia
    const Canton = reqBody.Canton
    const Distrito = reqBody.Distrito
    const Telefono1 = reqBody.Telefono1
    const Telefono2 = reqBody.Telefono2
    const idcuentaCiudadano = reqBody.idcuentaCiudadano
    console.log(Nombre, Apellido1, Apellido2)
    var sql = 'CALL AddInfoCiudadano(?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
    connection.query(sql,[Nombre, Apellido1, Apellido2, Sexo, AnioNacimiento, 
                        PaisNacimiento, TipoIdentificacion, NumIdentificacion, 
                        Provincia, Canton, Distrito, Telefono1, Telefono2, idcuentaCiudadano], function(err, data) {
        if(err){
            console.log(err.message)
            res.send({msj:false})
        }else{
            insertado = true
            console.log('insertado')
            res.send({msj:true})
        }   
    })    
})

app.post('/LoginUser', function(req, res) {
    console.log('/loginUser')
    var reqBody = req.body
    const correo = reqBody.correo
    const clave = reqBody.clave
    var sql = 'CALL getUser(?,?)'
    connection.query(sql,[correo, clave], function(err, results, fields) {
        if(err){
            console.log(err.message)
            res.send({msj:false})
        }else{
            var id =  results[0][0]['idcuentaCiudadano'] 
            console.log('user: ', id)
            res.send({msj:true, idCiudadano:id})
        }   
    })    
})

app.get('/', (req, res) => {
    res.send('Successful response.');
  });
  

app.listen(3000, () => console.log('Example app is listening on port 3000.'));


