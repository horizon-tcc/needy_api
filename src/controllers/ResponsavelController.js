const database = require("../database/database");
const { dateFormat } = require("../utils/dateFormat");

module.exports = {
  async index(req, res) {
    const { id } = req.params;

    let result = await database("tbResponsavel")
      .where("idResponsavel", id)
      .select("*")
      .first();

    let numeroResponsavel = await database("tbTelefoneResponsavel")
      .where("idResponsavel", id)
      .select("numeroTelefoneResponsavel")
      .first();

    result.dataNascimentoResponsavel = dateFormat(
      result.dataNascimentoResponsavel
    );

    result.telefone = numeroResponsavel;

    return res.status(200).json(result);
  },
};
