import connectDatabase from "../database/db_connection.js";
import {FormSetDb} from "../database/form.js";
import {formset,FormData} from "../data/FormData.js";

const conn = connectDatabase();
const form_set_db = new FormSetDb(conn);

export async function storeFormData(data){
    console.log(data)
    try {await selectID(data.Email)
      throw {name: "UserAlreadyExists", message: "user already exists"};
    } 
    catch (err) {if (err.name === "UserDoesNotExist") {
      const form_data = new FormData();
    form_data.copy(data);
    form_set_db.insert(form_data);
    } else throw err;}
    
    
    
}
  
export async function Login(Email,Password){ 
    console.log(Email,Password);
    const form_data = new FormData();
    form_data.Email = Email;
    await form_set_db.read_form_data(form_data);
    if(form_data.Password===Password){
      return {status: "success", role: form_data.role};
    }else{
      return {status: "failed", role: ""};
    }
  }
  
  export async function fetchData(Email,Password){ 
    const login_data = await Login(Email, Password);
    if(login_data.status === "success"){
      const form_data = new FormData();
      form_data.Email = Email;
      await form_set_db.read_form_data(form_data);
      return form_data;
    } else {
      return {};
    }
  }

  export async function getall(Email, Password) {
    const login_data = await Login(Email, Password);
    if(login_data.status === "success" && login_data.role === "admin"){
      const form_set = new formset();
      await form_set_db.read_all(form_set)
      console.log(form_set)
      return form_set.forms;
    }
    return [];
  }
  
  export async function update(data,pass){
      const login_data = await Login(pass.Email,pass.Password);
      if(login_data.status==="success" && login_data.role==="admin"){
          let stmt = "UPDATE form_data SET ? WHERE id = ?";
          conn.query(stmt,[data,data.id],(err,r)=>{
              console.log(r);
              if (err) throw  err;
              else return r
          })
      }
  }


export async function userUpdate(id,data){
    let stmt = "UPDATE form_data SET ? WHERE id= ?";
     conn.query(stmt,[data,id],(err,r)=>{
        if (err) throw err;
        else return r
    })
}

export async function selectID(Email){
  console.log("selectID")
    let stmt = "SELECT id FROM form_data WHERE Email= ?";
    return new Promise ( (resolve, reject) => {
      conn.query(stmt,[Email],(err,r)=>{ 
          if (err) reject(err);
          else if (r.length === 1) resolve(r[0].id);
          else reject({name: "UserDoesNotExist", message: "user does not exist"});
        
        });
    })
  
}







