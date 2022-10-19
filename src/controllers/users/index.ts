const { User } = require("../../models");

exports.getUsers = async () => {
  const res = await User.findAll();
  return res;
};
