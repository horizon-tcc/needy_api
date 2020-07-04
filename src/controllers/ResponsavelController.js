const database = require("../database/database");
const { dateFormat } = require("../utils/dateFormat");

module.exports = {
  async index(req, res) {
    const { id } = req.params;

    const result = await database("tbResponsavel")
      .where("idResponsavel", id)
      .select("*")
      .first();

    result.dataNascimentoResponsavel = dateFormat(
      result.dataNascimentoResponsavel
    );
    return res.status(200).json(result);
  },
};
