import {conn,sql,queries} from '../database'
export const crearBodega = async(req,res) => {
    const {Ubicacion} = req.body
    console.log(req.body)
    if(Ubicacion == null){
        return res.status(400).json({msg:'Bad Request. Please Fill all Fields'})
    };

    try {
        const pool = await conn()
        await pool.request().input('Ubicacion',sql.VarChar,Ubicacion).query(queries.createBodega)
        await res.json({Ubicacion})
    } catch (error) {
        await res.status(500)
        await res.send(error.message)
    }
}