export class formset{
  constructor(){
    this.forms = [];
  }
}


export class FormData {
    constructor() {
      this.id = "";
      this.role="";
      this.firstname = "";
      this.lastname = "";
      this.Email = "";
      this.Gender = "";
      this.age = "";
      this.Password= "";
      this.Contact = "";
      this.Country = "";
      this.District = "";
      this.languages = [];
      this.Department = "";
      this.Photo = "";
      this.plusTwo_Certificate = "";
      this.UG_or_PG_Certificate = "";
    }
    
    copy(form){
      this.id = form.id;
      this.role = form.role;
      this.firstname = form.firstname;
      this.lastname = form.lastname;
      this.Email = form.Email;
      this.Gender = form.Gender;
      this.age = form.age;
      this.Password= form.Password;
      this.Contact = form.Contact;
      this.Country = form.Country;
      this.District = form.District;
      this.languages = form.languages;
      this.Department = form.Department;
      this.Photo = form.Photo;
      this.plusTwo_Certificate = form.plusTwo_Certificate;
      this.UG_or_PG_Certificate = form.UG_or_PG_Certificate;
    }
  
  
  }



