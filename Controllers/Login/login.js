'use strict'
const {pool} = require('../../BD_config')
var crypto = require('crypto');


async function selectCredenciales(req, res) {
  let conn;
  //extraemos usuario y contraseña de la petición
  var username = req.body.username
  var password = req.body.password
  //parametros para la query
  
  var selectparams = [username];
  //creamos nuestro auth_token
  var token;

   crypto.randomBytes(25, function(ex, buf) {
    token = buf.toString('base64').replace(/\//g,'_').replace(/\+/g,'-');
});
  try {
    //Creamos conexión con la base de datos
	conn = await pool.getConnection();
    
  //query
  var query = "SELECT * from usuarios where username=?";
  //usamos la query y extraemos los datos
	const rows = await conn.query(query,selectparams);
   console.log(rows)
  //verificamos que exista el registro y que las contraseñas coincidan
  if(rows[0] && password===rows[0].password){
    //obtenemos la fecha de expiración para nuestro token
   var expiration_date=new Date();
   var hour= expiration_date.getHours();
   expiration_date.setHours(hour+1);
   //query para insertar nuestro token y fecha de expiración en sesión global  
   var updateparams = [token,expiration_date,username,password];


   var query2 = "UPDATE usuarios SET token_auth=?,token_expiration_date=? WHERE username=? and password=?;";
   const rows2 = await conn.query(query2,updateparams);
   console.log(rows2)


   conn.end().then(() => {
    res.status(200).send({
      token: token,
      username: username,
      role: "rol",
      nombre: "Nombre",
      apellidos: "apellidos" 

  })  })
  .catch(err => {
    res.status(500).send("error al cerrar el db pool")
    console.log(err)
  });
  }
  } catch (err) {
    console.log(err)
      res.status(500).send("Error al conectar con la base de datos")

  
  }  


  
}



function searchToken(username) {
  let selectparams = [username];
  let conn;
  return new Promise(resolve => {
    setTimeout(async () => {
    //Creamos conexión con la base de datos
    conn = await pool.getConnection();
    
    //query
    var query = "SELECT token_auth from usuarios where username=?";
    //usamos la query y extraemos los datos
    const rows = await conn.query(query,selectparams);
    conn.end();
      resolve(rows[0].token_auth);
    }, 2000);
  });
}



async function SearchGlobalSession(req,res){
  //extraemos usuario y token de sesión de la petición
  var username = req.body.username
  const tokenExist = await searchToken(username)
   if(tokenExist){
    res.status(200).send({
      token: tokenExist,
      username: username,
      role: "rol",
      nombre: "Nombre",
      apellidos: "apellidos" 

  })  
   }
   else{
    res.status(200).send({
      err: "No hay sesión activa",
  })  
   }

  
}

async function CloseGlobalSesion(req,res){
  //extraemos usuario y token de sesión de la petición
  var username = req.body.username
  var token = req.body.token
  
}

async function UpdateGlobalSesion(req,res){
  //extraemos usuario y token de sesión de la petición
  var username = req.body.username
  var token = req.body.token
  
}

async function checkSesionExpired(req,res){
  //extraemos usuario y token de sesión de la petición
  var username = req.body.username
  var token = req.body.token
  
}

module.exports = {
  selectCredenciales,
  SearchGlobalSession
}