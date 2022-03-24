class User {

    constructor(name, gender, birth, country, email, password, photo, admin) {

        this._id;
        this._name = name;
        this._gender = gender;
        this._birth = birth;
        this._country = country;
        this._email = email;
        this._password = password;
        this._photo = photo;
        this._admin = admin;
        this._register = new Date();
    }

    get id() {

        return this._id;
    }

    get name() {

        return this._name;
    }

    get gender() {

        return this._gender;
    }

    get birth() {

        return this._birth;
    }

    get country() {

        return this._country;
    }

    get email() {

        return this._email;
    }

    get password() {

        return this._password;
    }

    get photo() {

        return this._photo;
    }

    set photo(value) {

        this._photo = value;
    }
    
    get admin() {

        return this._admin;
    }

    get register() {

        return this._register;
    }

    loadFromJSON(json) {

        for (let name in json) {

            switch(name) {

                case "_register":
                    this[name] = new Date(json[name]);
                    break;

                default:
                    this[name] = json[name];
            }
        }
    }

    getNewId() {

        let users_id = localStorage.getItem("users_id");

        if(!users_id) users_id = 0;
        users_id++;

        localStorage.setItem("users_id", users_id);

        return users_id;
    }

    save() {

        let users = User.getUsersStorage();

        if(this.id > 0) {

            users.map(u => {

                if(u._id == this.id) {

                    Object.assign(u, this);
                }

                return u;
            });
        } else {

            this._id = this.getNewId();

            users.push(this);
        }

        localStorage.setItem("user", JSON.stringify(users));
    }

    static getUsersStorage() {

        let users = [];

        if(localStorage.getItem("user")){

            users = JSON.parse(localStorage.getItem("user"));
        }

        return users;
    }

    delete() {

        let users = User.getUsersStorage();

        users.forEach((userData, index) => {
            
            if(this._id == userData._id) {

                users.splice(index, 1);
            }
        });

        localStorage.setItem("user", JSON.stringify(users));
    }
}