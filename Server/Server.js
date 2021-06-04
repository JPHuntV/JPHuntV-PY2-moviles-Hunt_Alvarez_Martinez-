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
app.post('/newPersona', function(req, res) {
    var reqBody = req.body
    const correo = reqBody.correo
    const clave = reqBody.clave
    console.log(correo, clave)
    var sql = 'INSERT INTO cuentaCiudadano (correo, clave) VALUES (?,?)'
    connection.query(sql,[correo, clave], function(err, data) {
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

app.post('/getId', function(req, res) {
    var sql = 'SELECT idcuentaCiudadano FROM cuentaCiudadano ORDER BY idcuentaCiudadano DESC LIMIT 1'
    connection.query(sql, function (error, results, fields) {
        var id = null
        id = results[0]['idcuentaCiudadano'] 
        console.log(1, id)
        res.send({id:id})
    })
})

app.post('/newInfoPersona', function(req, res) {
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
    var sql = 'INSERT INTO Ciudadano (Nombre, Apellido1,Apellido2,'+
                'Sexo,AnioNacimiento,PaisNacimiento,TipoIdentificacion,'+
                'NumIdentificacion,Provincia,Canton,Distrito,Telefono1,'+
                'Telefono2,idCuentaCiudadano) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
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
app.get('/', (req, res) => {
    res.send('Successful response.');
  });
  

app.listen(3000, () => console.log('Example app is listening on port 3000.'));