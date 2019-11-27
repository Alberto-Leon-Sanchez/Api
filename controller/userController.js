const bcrypt = require('bcrypt');
const Contact = require('../model/userModel');
const service = require('../services/index');

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

  user.save((err) => {
    if (err) return res.status(500).send({ message: 'error al guardar el usuario', err });

    return res.status(200).send({ user, token: service.createToken(user) });
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
  const { email } = req.body;
  const { password } = req.body;

  Contact.findOne({ email }, (err, user) => {
    if (err) return res.status(404).send({ message: 'User not found' });

    bcrypt.compare(password, user.password, (err, same) => {
      if (err) res.status(500).send({ message: `Error al comparar contraseñas ${err} ` });

      if (same) return res.status(200).send({ message: 'Logeado correctamente', token: service.createToken(user), user });
    });
  });
}

function loginToken(req, res) {
  const { id } = req;

  Contact.findOne({ id }, (err, data) => {
    if (err) return res.status(404).send({ message: 'User not found' });

    return res.status(200).send({ User: data });
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
  loginToken,
};
