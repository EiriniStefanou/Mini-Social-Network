const bcrypt = require("bcryptjs");

/**
 * @param {string} password
 */
const hashPassword = async (password) => {
  const hashed = await bcrypt.hashSync(password, 12);

  return hashed;
};

module.exports = hashPassword;
