const { User } = require("../../../models");

export const getUsers = () => {
  const res = User.findAll({});
  console.log({ res });
  return res;
};
