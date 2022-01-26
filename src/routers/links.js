const req = require("express/lib/request");
const res = require("express/lib/response");
const app = require("../config/sever");
const database= require('../config/conexion');
const { send } = require("express/lib/response");

module.exports=app =>{
    const conexion=database();
    app.get('/',(req,res)=>{
    conexion.query('SELECT * FROM  customer',(err,result)=>{
    
    res.render('main',{
        cliente:result
    });

});
});
app.post ('/agregar',(req,res)=>{
    const datos = { 
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
    }
conexion.query('insert into customer set ?', [datos],(err,customer)=>{

    console.log(customer);

    res.redirect('/');
});
});
app.get('/eliminar/:id',(req,res)=>{
    const borrar = database();
    const {id} = req.params;
    borrar.query(`DELETE FROM customer WHERE id=?`,[id],(err,customer)=>{
        console.log (customer);
        res.redirect('/');
    })
});
app.get('/editar/:id',(req,res)=>{
    const {id} = req.params;
    conexion.query('SELECT * FROM  customer where id=?',[id],(err,rows)=>{
    res.render('editar',{
        cliente:rows[0]
    });
});    
});
app.post('/actualizar/:id',(req,res)=>{
    const id = req.body.id;
    const nombre=req.body.nombre;
    const direccion= req.body.direccion;
    const telefono= req.body.telefono;
    conexion.query('update customer set ? where id=?',[{nombre:nombre,direccion:direccion,telefono:telefono},id],(err,rows)=>{
        console.log(rows)
        res.redirect('/');
    });
});
app.get('/biblioteca/',(req,res)=>{
    conexion.query('SELECT * FROM  libros',(err,result)=>{
    
    res.render('main2',{
        cliente:result
    });

});
});
};

