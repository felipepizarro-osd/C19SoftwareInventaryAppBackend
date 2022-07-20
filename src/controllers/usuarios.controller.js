import {conn,sql,queries} from '../database'
export const crearUsuario = async(req,res) => {
    const {Rut, Nombre, Contrasena} = req.body
    if(Rut == null || Nombre == null || Contrasena == null){
        return res.status(400).json({msg:'Bad Request. Please Fill all Fields'})
    };
    try{
        const pool = await conn()
        await pool.request()
        .input('Rut',sql.VarChar,Rut)
        .input('Nombre',sql.VarChar,Nombre)
        .input('Contrasena',sql.VarChar,Contrasena).query(queries.createUsuario)
        await res.json({Rut, Nombre, Contrasena})
    }catch (error){
        await res.status(500)
        await res.send(error.message)
    }
}
export const getUsuario = async (req,res)=> {
    try {
        const pool = await conn();
        const result = await pool.request().query(queries.getAllUsuarios);
        //console.log(result);
        res.json(result.recordset)
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
export const getUsuariobyRUT  = async (req,res)=>{
    const {rut} = req.params;
    //console.log(sku);
    const pool = await conn();
    const result = await pool.request().input('rut',sql.VarChar,rut).query(queries.getUsuariosByRut)
    //console.log(result);
    res.send(result.recordset)
}
export const getUsuariobyRutPassword  = async (request,response)=>{
    const {rut,contrasena} = request.body;
	console.log(request.body);
	// Ensure the input fields exists and are not empty
	console.log("paso por aqui")
	if (rut && contrasena) {
		const pool = await conn();
		// Execute SQL query that'll select the account from the database based on the specified rut and password
		const result = await pool.request().input('rut',sql.VarChar,rut).input('contrasena',sql.VarChar,contrasena).query(queries.getUsuariosByRutContrasena)
		console.log(result)
			// If there is an issue with the query, output the error
			// If the account exists
			if (result.recordset.length > 0) {
				// Authenticate the user
				//request.session.loggedin = true;
				//request.session.rut = rut;
				// Redirect to home page
				//response.redirect('http://localhost:3000/');
				response.send(result.recordset[0].Nombre);
				//console.log('entro')
			} else {
				response.send('Incorrect rut and/or Password!');
			}			
			response.end();
		
	} else {
		response.send('Please enter rut and Password!');
		response.end();
	}
}