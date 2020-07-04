const database = require("../database/database");

module.exports = {
  async index(req, res) {
    const { idDoador, idDoacao } = req.params;

    let result = database("tbDoacao")
      .where("idDoacao", idDoacao)
      .where("idDoador", idDoador)
      .select("*")
      .first();
    return res.status(200).json(result);
  },
};
