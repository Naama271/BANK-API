const fs = require("fs");

const getAllUsers = () => {
  const users = loadUsers();
  return users;
};
const getUser = (id) => {
  const users = loadUsers();
  const user = users.find((user) => user.id === id);
  if (user) return user;
  throw new Error("user not found");
};

const addUser = (user) => {
  const users = loadUsers();
  users.push(user);
  saveUsers(users);
};

const updateCredit = (id, { credit }) => {
  const users = loadUsers();
  let user = getUser(id);
  //console.log(credit)

  if (parseInt(credit) < 0) throw new Error("only positive credit is allowed");

  user = Object.assign(user, {
    credit: credit,
  });

  saveUsers(users);
  //console.log(user)
};

const depositeMoney = (id, { deposite }) => {
  const users = loadUsers();
  let user = getUser(id);
  let depositeInt = parseInt(deposite);
  let cashInt = parseInt(user.cash);

  // console.log(deposite);
  user = Object.assign(user, { cash: cashInt + depositeInt });

  // console.log(user);
  saveUsers(users);
};

const withdrawMoney = (id, { withdraw }) => {
  const users = loadUsers();
  let user = getUser(id);
  let withdrawInt = parseInt(withdraw);
  // console.log(withdrawInt);
  // console.log(user.cash);
  user.cash = user.cash - withdrawInt;

  //  console.log(user);
  saveUsers(users);
};

const transferMoney = (id_send, { id_receive, transfer }) => {
  // console.log("transferMoney")
  const users = loadUsers();
  let user1 = getUser(id_send);
  let user2 = getUser(id_receive);
  let cash1 = parseInt(user1.cash);
  let cash2 = parseInt(user2.cash);
  let transferInt = parseInt(transfer);

  if ((cash1-transferInt) < parseInt(user1.credit)) throw new Error("The transer is not possible. the cash and credit run out.");

  console.log(user1, user2);

  user1.cash = cash1 - transferInt;
  user2.cash = cash2 + transferInt;

  //console.log(user1, user2);
  saveUsers(users);
};

function saveUsers(users) {
  //   console.log(users)
  const dataJSON = JSON.stringify(users);
  //  console.log(dataJSON)

  fs.writeFileSync("users.json", dataJSON);
  console.log("users saved");
}

function loadUsers() {
  try {
    const dataBuffer = fs.readFileSync("users.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
}

module.exports = {
  getAllUsers,
  addUser,
  getUser,
  depositeMoney,
  withdrawMoney,
  updateCredit,
  transferMoney,
};
