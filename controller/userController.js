const Contact = require('../model/userModel');

function getUsers(req, res) {
  Contact.find({}, (err, contacts) => {
    if (err) return res.status(500).send({ err });

    return res.status(200).send({ contacts });
  });
}

function getUser(req, res) {
  Contact.findById(req.params.userId, (err, user) => {
    if (err) return res.status(404).send({ message: 'User not found', err });

    return res.status(200).send({ user });
  });
}

function createUser(req, res) {
  const user = new Contact(req.body);

  user.save((err, newUser) => {
    if (err) return res.status(400).send({ message: 'error saving user', err });

    return res.status(200).send({ message: 'User save', newUser });
  });
}

function replaceUser(req, res) {
  const { userId } = req.params;
  const { email } = req.body;
  const { name } = req.body;
  const { surname } = req.body;
  const { password } = req.password;
  const { phone } = req.phone;

  if (!email || !name || !surname || !phone || !password) { return res.status(400).send({ message: 'Missing parameters' }); }

  Contact.findById(userId, (err) => {
    if (err) return res.status(404).send({ message: 'user not found', err });
  });

  Contact.replaceOne(req.body, (err, replacement) => {
    if (err) res.status(500).send({ err });

    return res.status(200).send({ message: 'User replaced', replacement });
  });
}

function editUser(req, res) {
  const { userId } = req.params;

  Contact.findByIdAndUpdate(userId, req.body, (err, user) => {
    if (err) return res.status(500).send({ err });
    if (!user) return res.status(404).send({ message: 'User not found' });

    return res.status(200).send({ message: 'User updated', user });
  });
}

function deleteUser(req, res) {
  const { userId } = req.params;

  Contact.findByIdAndRemove(userId, (err, user) => {
    if (err) return res.status(500).send({ err });
    if (!user) return res.status(404).send({ message: 'User not found' });

    return res.status(200).send({ message: 'User deleted', user });
  });
}

function login(req, res) {
  const { email } = req.params;
  const { password } = req.body;

  Contact.findOne({ email }, (err, user) => {
    if (err) return res.status(500).send({ err });
    if (!user) return res.status(404).send({ err });

    if (password === user.password) return res.status(200).send({ message: 'Correct password' });
    return res.status(401).send({ message: 'Incorrect password' });
  });
}

module.exports = {
  getUsers,
  getUser,
  login,
  deleteUser,
  editUser,
  createUser,
  replaceUser,
};
