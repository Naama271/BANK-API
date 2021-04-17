const {
  getAllUsers,
  addUser,
  getUser,
  depositeMoney,
  withdrawMoney,
  updateCredit,
  transferMoney,
} = require("./utils");

const express = require("express");
const app = express();

app.use(express.json());

app.get("/api/users", (req, res) => {
  try {
    res.status(200).json(getAllUsers());
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

app.post("/api/users", (req, res) => {
  try {
    addUser(req.body);
    res.status(201).send("success");
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

app.get("/api/users/:id/", (req, res) => {
  try {
    const user = getUser(req.params.id);
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

app.put("/api/deposite/:id", (req, res) => {
  try {
    depositeMoney(req.params.id, req.body);
    res.status(201).send("success");
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

app.put("/api/credit/:id", (req, res) => {
  try {
    updateCredit(req.params.id, req.body);
    res.status(201).send("success");
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

app.put("/api/withdraw/:id", (req, res) => {
  try {
    withdrawMoney(req.params.id, req.body);
    res.status(201).send("success");
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

app.put("/api/transfer/:id", (req, res) => {
  //console.log(req.body)
  //console.log("transfer")
  try {
    transferMoney(req.params.id, req.body);
    res.status(201).send("success");
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

// app.delete("/api/usres/:id", (req, res) => {
// 	try {
// 		deleteMovie(req.params.id);
// 		res.status(201).send("movie deleted");
// 	} catch (e) {
// 		res.status(400).send({ error: e.message });
// 	}
// });

const PORT = 3000;
app.listen(PORT, () => {
  console.log("listening on port 3000");
});
