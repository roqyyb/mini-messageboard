const express = require("express");

const app = express();
const PORT = 5000;

// set view engine
app.set("view engine", "ejs");

// set public asset folder
app.use(express.static("public"));
// parse formdata
app.use(express.urlencoded({ extended: true }));

// data
const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

// routes
app.get("/", (req, res) => {
  //   res.send("Working okay!");
  res.render("index", { title: "Mini Messageboard", messages });
});

app.get("/new", (req, res) => {
  res.render("form", { title: "Create New Message" });
});

app.post("/new", (req, res) => {
  const newMessage = {
    user: req.body.author,
    text: req.body.message,
    added: new Date(),
  };

  messages.push(newMessage);
  res.redirect("/");
});

app.get("/message/:id", (req, res) => {
  const id = req.params.id;
  const message = messages.find((msg) => msg.user == id);

  if (message) {
    res.render("messageDetails", {
      message: message,
      title: "Message Details",
    });
    return;
  }
  res.status(404).send(`${id} not found!`);
});

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`App listening on port ${PORT}...`);
});
