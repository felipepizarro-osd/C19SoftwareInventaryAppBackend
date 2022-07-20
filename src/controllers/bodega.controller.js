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

export const getBodegas = async (req,res) =>{
    try {
        const pool = await conn();
        const result = await pool.request().query(queries.getBodegas);
        res.json(result.recordset)
        
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

export const getBodegaByName = async (req,res)=>{
    let Ubicacion = req.params.Ubicacion;
    try {
        const pool = await conn();
        const result = await pool.request()
        .input('Ubicacion',sql.VarChar,Ubicacion)
        .query(queries.getBodegaByName);
        
        console.log(result.recordset);
        if (result.recordset.length == 0)
        {
            await pool.request()
            .input('Ubicacion',sql.VarChar,Ubicacion).query(queries.createBodega);
            console.log("Guardado");            
        }

        res.json(result.recordset[0])
        
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}