const auth = require("../database/auth.json");
const fs = require("fs");

module.exports = {
  postMessage: async (req, res) => {
    try {
      let { name, email, message } = req.body;
      if (!name) {
        name = "annonymous user";
      }
      if (!email) {
        email = "annon@hng.com";
      }
      if (!message) {
        message = `Hi from ${name}`;
      }
      // let obj = {
      //   msg: [],
      // };
      const newMessage = {
        name: name,
        email: email,
        message: message,
      };

      fs.readFile(
        "./database/messages.json",
        "utf8",
        function readFileCallback(err, data) {
          if (err) {
            return;
          }
          const obj = JSON.parse(data); //now it an object
          obj.msg.push(newMessage); //add some data
          const json = JSON.stringify(obj); //convert it back to json
          fs.writeFileSync("./database/messages.json", json, "utf8");
        }
      );
      res.redirect("/");
    } catch (error) {
      throw new Error(error.message);
    }
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return;
      }
      fs.readFile("./database/auth.json", "utf-8", (err, data) => {
        if (err) {
          return;
        }
        if (email !== data.admin.email) {
          return;
        }
        if (password !== data.admin.password) {
          return;
        }
      });
      res.redirect("/me");
    } catch (error) {
      throw new Error(error.message);
    }
  },
  me: async (req, res, next) => {
    try {
      fs.readFile("./database/messages.json", "utf-8", (err, data) => {
        if (err) {
          return;
        }
        console.log(data);
        res.render("me", {
          messages: JSON.parse(data),
        });
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
