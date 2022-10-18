const { User } = require("../../../models");

exports.getUsers = async () => {
  const res = await User.findAll();
  console.log({ res });
  return res;
};
