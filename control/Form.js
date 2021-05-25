import connectDatabase from "../database/db_connection.js";
import {FormSetDb} from "../database/form.js";
import {FormData} from "../data/FormData.js";

const conn = connectDatabase();
const form_set_db = new FormSetDb(conn);

export function storeFormData(data){
    const form_data = new FormData();
    form_data.copy(data);
    form_set_db.insert(form_data);
    
    
}
export async function Login(Email,Password){
   
   console.log(Email,Password)
    const form_data = new FormData();
    form_data.Email = Email;
    await form_set_db.read_form_data(form_data);
    console.log(form_data)
    if(form_data.Password===Password){
    return [form_data];
    }else{
        return [];
    }
}
