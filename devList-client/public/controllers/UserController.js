class UserController {

    constructor(formIdCreate, formIdUpdate, tableId) {

        this.formEl = document.getElementById(formIdCreate);
        this.formUpdateEl = document.getElementById(formIdUpdate);
        this.tableEl = document.getElementById(tableId);

        this.onSubmit();
        this.onEditCancel();
        this.selectAll();
    }

    onEditCancel() {

        document.querySelector("#box-update-user .btn-cancel").addEventListener("click", e => {

            this.showPanelCreate();
        });

        this.formUpdateEl.addEventListener("submit", e => {

            e.preventDefault();

            let btnSubmit = this.formUpdateEl.querySelector("[type=submit]");

            btnSubmit.disabled = true;

            let values = this.getValues(this.formUpdateEl);

            let index = this.formUpdateEl.dataset.trIndex;

            let trEdit  = this.tableEl.rows[index];

            let userOldData = JSON.parse(trEdit.dataset.user);

            let result = Object.assign({}, userOldData, values);

            this.getPhoto(this.formUpdateEl).then(
                (content) => {

                    if(!values.photo) {
                        
                        result._photo = userOldData._photo;
                    } else {

                        result._photo = content;
                    }

                    let user = new User();

                    user.loadFromJSON(result);

                    user.save().then(user => {

                        this.createTr(user, trEdit);
            
                        this.updateCount();

                        this.formUpdateEl.reset();

                        btnSubmit.disabled = false;

                        this.showPanelCreate();
                    });
            }, (e) => {

                console.log(e);
            });
        });
    }

    onSubmit() {

        this.formEl.addEventListener("submit", e => {

            e.preventDefault();

            let btnSubmit = this.formEl.querySelector("[type=submit]");

            btnSubmit.disabled = true;

            let values = this.getValues(this.formEl);

            if(!values) return false;

            this.getPhoto(this.formEl).then(
                (content) => {

                values.photo = content;

                values.save().then(user => {

                    this.addLine(user);

                    this.formEl.reset();
                    btnSubmit.disabled = false;
                });                
            }, (e) => {

                console.log(e);
            });
        });
    }

    getPhoto(formEl) {

        return new Promise((resolve, reject) => {

            let fileReader = new FileReader();

            let elements = [...formEl.elements].filter(item => {

                if(item.name === "photo") {

                    return item;
                }
            });

            let file = elements[0].files[0];

            fileReader.onload = () => {

                resolve(fileReader.result);
            };

            fileReader.onerror = e => {

                reject(e);
            }

            if(file){
                fileReader.readAsDataURL(file);
            } else {
                resolve('dist/img/boxed-bg.jpg');
            }
        });
    }

    getValues(formEl) {

        let user = {};
        let isValid = true;

        [...formEl.elements].forEach(function(field, index){

            if(["name", "email", "password"].indexOf(field.name) > -1 && !field.value){

                field.parentElement.classList.add("has-error");
                isValid = false;
            }

            if(field.name == "gender"){
        
                if(field.checked){
        
                    user[field.name] = field.value;
                }
        
            } else if(field.name == "admin"){

                user[field.name] = field.checked;
            } else {
        
                user[field.name] = field.value;
            }
        });

        if(!isValid){
            return false;
        }
    
        return new User(user.name, user.gender, user.birth, user.country, user.email, user.password, user.photo, user.admin);
    }

    selectAll() {

        User.getUsersStorage().then(data => {

            data.users.forEach(dataUser => {

                let user = new User();

                user.loadFromJSON(dataUser);

                this.addLine(user);
            });
        });
    }

    addLine(dataUser){

        let tr = this.createTr(dataUser);

        this.tableEl.appendChild(tr);

        this.updateCount();    
    }

    createTr(dataUser, tr = null) {

        if(tr === null) tr = document.createElement("tr");

        tr.dataset.user = JSON.stringify(dataUser);

        tr.innerHTML =  
            `<tr>
                <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
                <td>${dataUser.name}</td>
                <td>${dataUser.email}</td>
                <td>${(dataUser.admin) ? "Sim" : "Não"}</td>
                <td>${Utils.dateFormat(dataUser.register)}</td>
                <td>
                <button type="button" class="btn btn-primary btn-xs btn-flat btn-edit">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat btn-delete">Excluir</button>
                </td>
            </tr>`;

        this.addEventsTr(tr);

        return tr;
    }

    addEventsTr(tr) {

        tr.querySelector(".btn-delete").addEventListener("click", e => {

            if(confirm("Deseja excluir esse usuario?")){

                let user = new User();

                user.loadFromJSON(JSON.parse(tr.dataset.user));

                user.delete().then(data => {

                    tr.remove();

                    this.updateCount();
                });
            }
        });

        tr.querySelector(".btn-edit").addEventListener("click", e => {

            let jsonDataUser = JSON.parse(tr.dataset.user);

            this.formUpdateEl.dataset.trIndex = tr.sectionRowIndex;

            for (let name in jsonDataUser) {

                let field = this.formUpdateEl.querySelector("[name="+name.replace("_", "")+"]");

                if(field) { 

                    switch(field.type) {

                        case "file":
                            continue;
                            break;

                        case "radio":
                            field = this.formUpdateEl.querySelector("[name="+name.replace("_", "")+"][value="+jsonDataUser[name]+"]");
                            field.checked = true;

                            break;

                        case "checkbox":
                            field.checked = jsonDataUser[name];
                            break;

                        default:
                            field.value = jsonDataUser[name];
                    }
                }
            }

            this.formUpdateEl.querySelector(".photo").src = jsonDataUser._photo;

            this.showPanelUpdate();
        });
    }

    showPanelCreate() {

        document.querySelector("#box-new-user").style.display = "block";
        document.querySelector("#box-update-user").style.display = "none";
    }

    showPanelUpdate() {

        document.querySelector("#box-new-user").style.display = "none";
        document.querySelector("#box-update-user").style.display = "block";
    }

    updateCount() {

        let numberUsers = 0;
        let numberAdmin = 0;

        [...this.tableEl.children].forEach( tr => {

            numberUsers++;

            let user = JSON.parse(tr.dataset.user);

            if(user._admin) numberAdmin++;
        });

        document.querySelector("#user-statistics").innerHTML = numberUsers;
        document.querySelector("#admin-statistics").innerHTML = numberAdmin;
    }
}