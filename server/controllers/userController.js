const mysql = require("mysql");

//Connection pool
const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// View user info
exports.view = (req, res) => {
  //Connect to DB
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("DB connection ID is " + connection.threadId);

    connection.query(
      'SELECT * FROM `user` WHERE `active` != "removed"',
      (err, rows) => {
        connection.release();

        if (!err) {
          res.render("home", { rows });
        } else {
          console.log(err);
        }

        console.log("User data: \n", rows);
      }
    );
  });
};

exports.find = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("DB connection ID is " + connection.threadId);

    let searchTerm = req.body.search;
    connection.query(
      'SELECT * FROM `user` WHERE `active` != "removed" AND `first_name` LIKE ? OR `last_name` LIKE ? OR `email` LIKE ? OR `phone` LIKE ?',
      [
        "%" + searchTerm + "%",
        "%" + searchTerm + "%",
        "%" + searchTerm + "%",
        "%" + searchTerm + "%",
      ],
      (err, rows) => {
        connection.release();

        if (!err) {
          res.render("home", { rows });
        } else {
          console.log(err);
        }

        console.log("User data: \n", rows);
      }
    );
  });
};

exports.form = (req, res) => {
  res.render("add-user");
};

exports.create = (req, res) => {
  const { first_name, last_name, email, phone, comment } = req.body;

  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("DB connection ID is " + connection.threadId);

    connection.query(
      "INSERT INTO `user` SET  `first_name` = ?, `last_name` = ?, `email`= ?, `phone` = ?, `comment` =?",
      [first_name, last_name, email, phone, comment],
      (err, rows) => {
        connection.release();

        if (!err) {
          res.render("add-user", { alert: "Great! User added successfully." });
        } else {
          console.log(err);
        }

        console.log("User data: \n", rows);
      }
    );
  });
};

exports.edit = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("DB connection ID is " + connection.threadId);

    connection.query(
      'SELECT * FROM `user` WHERE `active` != "removed" and `ID` =?',
      [req.params.id],
      (err, rows) => {
        connection.release();

        if (!err) {
          res.render("edit-user", { rows });
        } else {
          console.log(err);
        }

        console.log("User data: \n", rows);
      }
    );
  });
};

exports.update = (req, res) => {
  const { first_name, last_name, email, phone, comment } = req.body;

  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("DB connection ID is " + connection.threadId);

    connection.query(
      "UPDATE `user` SET  `first_name` = ?, `last_name` = ?, `email`= ?, `phone` = ?, `comment` =? WHERE `ID` =?",
      [first_name, last_name, email, phone, comment, req.params.id],
      (err, rows) => {
        connection.release();

        if (!err) {
            pool.getConnection((err, connection) => {
                if (err) throw err;
                console.log("DB connection ID is " + connection.threadId);
            
                connection.query(
                  'SELECT * FROM `user` WHERE `active` != "removed" and `ID` =?',
                  [req.params.id],
                  (err, rows) => {
                    connection.release();
            
                    if (!err) {
                      res.render("edit-user", { rows, alert: `${first_name} user has been updated succesfully.` });
                    } else {
                      console.log(err);
                    }
            
                    console.log("User data: \n", rows);
                  }
                );
              });
        } else {
          console.log(err);
        }

        console.log("User data: \n", rows);
      }
    );
  });
};
