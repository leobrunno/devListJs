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
                    if(name.substring(0, 1) === '_') this[name] = json[name];
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

    toJSON() {

        let json = {};

        Object.keys(this).forEach(key => {

            if(this[key] !== undefined) json[key] = this[key];
        });

        return json;
    }

    save() {

        return new Promise((resolve, reject) => {

            let promise;

            if(this.id) {

                promise = HttpRequest.put(`/users/update/${this.id}`, this.toJSON());
            } else {

                promise = HttpRequest.post('/users', this.toJSON());
            }

            promise.then(data => {

                this.loadFromJSON(data);

                resolve(this);
            }).catch(e => {

                reject(e);
            });
        });
    }

    static getUsersStorage() {

        let users = [];

        if(localStorage.getItem("user")){

            users = JSON.parse(localStorage.getItem("user"));
        }

        return users;
    }

    delete() {

        return HttpRequest.delete(`/users/delete/${this.id}`);
    }
}