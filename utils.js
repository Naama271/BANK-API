const fs = require("fs");

const getAllUsers = () => {
  const users = loadUsers();
  return users;
};

const getUser = (id) => {
  const users = loadUsers();
  const user = users.find((user) => user.id === id);
  if (user && user.isActive) return user;
  throw new Error("user not found or not active");
};

const getUserFilter = ({ amountFrom, amountLimit }) => {
  const users = loadUsers();
  const users = users.fiter(
    (user) => user.cash > amountFrom && user.cash < amountLimit
  );
  if (users) return users;
  throw new Error("no users match your search");
};

const addUser = (user) => {
  const users = loadUsers();
  users.push(user);
  saveUsers(users);
};

const updateCredit = (id, { credit }) => {
  const users = loadUsers();
  let user = getUser(id);

  if (parseInt(credit) < 0) throw new Error("only positive credit is allowed");

  user.credit = credit;

  saveUsers(users);
};

const depositeMoney = (id, { deposite }) => {
  const users = loadUsers();
  let user = getUser(id);
  let depositeInt = parseInt(deposite);
  let cashInt = parseInt(user.cash);

  user.cash = cashInt + depositeInt;

  saveUsers(users);
};

const withdrawMoney = (id, { withdraw }) => {
  const users = loadUsers();
  let user = getUser(id);
  let withdrawInt = parseInt(withdraw);

  if (user.cash - withdrawInt < parseInt(user.credit))
    throw new Error(
      "The withdraw is not possible. the cash and credit run out."
    );

  user.cash = user.cash - withdrawInt;
  saveUsers(users);
};

const transferMoney = (id_send, { id_receive, transfer }) => {
  const users = loadUsers();
  let user1 = getUser(id_send);
  let user2 = getUser(id_receive);
  let cash1 = parseInt(user1.cash);
  let cash2 = parseInt(user2.cash);
  let transferInt = parseInt(transfer);

  if (cash1 - transferInt < parseInt(user1.credit))
    throw new Error(
      "The transer is not possible. the cash and credit run out."
    );

  console.log(user1, user2);

  user1.cash = cash1 - transferInt;
  user2.cash = cash2 + transferInt;

  saveUsers(users);
};

function saveUsers(users) {
  const dataJSON = JSON.stringify(users);

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
