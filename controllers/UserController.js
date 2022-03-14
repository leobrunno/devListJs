class UserController {

    constructor(formId, tableId) {

        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);

        this.onSubmit();
    }

    onSubmit() {

        this.formEl.addEventListener("submit", e => {

            e.preventDefault();

            this.addLine(this.getValues());
        });
    }

    getValues() {

        let user = {};

        [...this.formEl.elements].forEach(function(field, index){

            if(field.name == "gender"){
        
                if(field.checked){
        
                    user[field.name] = field.value;
                }
        
            } else {
        
                user[field.name] = field.value;
            }
        });
    
        return new User(user.name, user.gender, user.birth, user.country, user.email, user.password, user.photo, user.admin);
    }
}