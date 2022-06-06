import {conn,sql,queries} from '../database'
export const crearBodega = async(req,res) => {
    const {ubicacion} = req.body
    console.log(req.body)
    if(ubicacion == null){
        return res.status(400).json({msg:'Bad Request. Please Fill all Fields'})
    };

    try {
        const pool = await conn()
        await pool.request().input('ubicacion',sql.VarChar,ubicacion).query(queries.createBodega)
        await res.json({ubicacion})
    } catch (error) {
        await res.status(500)
        await res.send(error.message)
    }
}