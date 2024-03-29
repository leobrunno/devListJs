let neDb = require('nedb');
let db = new neDb({
    filename: 'users.db',
    autoload: true
});
const { check, validationResult } = require("express-validator");

module.exports = (app) => {

    let route = app.route('/users');

    route.get((req, res) => {

        db.find({}).sort({ name: 1 }).exec((err, users) => {

            if (err) {

                app.utils.error.send(err, req, res);
            } else {

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({
                    users
                });
            }
        });
    });

    let routeId = app.route('/users/:id');

    routeId.get((req, res) => {

        db.findOne({ _id: req.params.id }).exec((err, user) => {

            if (err) {

                app.utils.error.send(err, req, res);
            } else {

                res.status(200).json(user);
            }
        });
    });

    let routeUpdate = app.route('/users/update/:id');

    routeUpdate.put([
            check("_name", "O nome é obrigatório.").notEmpty(),
            check("_password", "A senha é obrigatório.").notEmpty(),
            check("_email", "Email inválido.").notEmpty().isEmail(),
        ],
        (req, res) => {

        let errors = validationResult(req);

        if (!errors.isEmpty()) {

            app.utils.error.send(errors, req, res);
            return false;
        }

        db.update({ _id: req.params.id }, req.body, err => {

            if (err) {

                app.utils.error.send(err, req, res);
            } else {

                res.status(200).json(Object.assign(req.params, req.body));
            }
        });
    });

    let routeDelete = app.route('/users/delete/:id');

    routeDelete.delete((req, res) => {

        db.remove({ _id: req.params.id }, {}, err => {

            if (err) {

                app.utils.error.send(err, req, res);
            } else {

                res.status(200).json(req.params);
            }
        });
    });

    route.post(
        [
            check("_name", "O nome é obrigatório.").notEmpty(),
            check("_password", "A senha é obrigatório.").notEmpty(),
            check("_email", "Email inválido.").notEmpty().isEmail(),
        ],
        (req, res) => {
            let errors = validationResult(req);

            if (!errors.isEmpty()) {

                app.utils.error.send(errors, req, res);
                return false;
            }

            db.insert(req.body, (err, user) => {

                if (err) {

                    app.utils.error.send(err, req, res);
                } else {

                    res.status(200).json(user);
                }
            });
        }
    );
}