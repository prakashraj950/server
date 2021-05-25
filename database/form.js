import {FormData} from "../data/FormData.js";
import util from 'util';

export class FormSetDb{
    constructor(conn){
    this.conn =conn;
    this.query = util.promisify(conn.query).bind(conn);
}

    insert(form_data){
        if(form_data){
            
        const stmt1 = "INSERT INTO form_data SET ?";
       
        this.conn.query(stmt1,form_data,
                    (err,res)=>{
                        if(err) throw err;
                    }
                )
            
            
        
        
        
        }
    
        
    
    
    
    
    
    }


    async read_form_data(form_data){
        const stmt = "SELECT * FROM form_data WHERE  STRCMP(Email,?) = 0";

        try{
            const rows = await this.query(stmt,[form_data.Email])
            if (rows.length === 1){
             form_data.copy(rows[0]);
            }
        }
        catch(err){
            throw err;
        }
    }
















}