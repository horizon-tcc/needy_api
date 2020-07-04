const database = require("../database/database");
const { dateFormat } = require("../utils/dateFormat");

module.exports = {
  async index(req, res) {
    const { id } = req.params;

    const result = await database("tbDoador")
      .where("idUsuario", id)
      .join("tbSexo", {
        "tbSexo.idSexo": "tbDoador.idSexo",
      })
      .join("tbFatorRh", {
        "tbFatorRh.idFatorRh": "tbDoador.idFatorRh",
      })
      .join("tbTipoSanguineo", {
        "tbTipoSanguineo.idTipoSanguineo": "tbDoador.idTipoSanguineo",
      })
      .select([
        "tbDoador.*",
        "tbSexo.descricaoSexo",
        "tbFatorRh.descricaoFatorRh",
        "tbTipoSanguineo.descricaoTipoSanguineo",
      ])
      .first();

    result.dataNascimentoResponsavel = dateFormat(
      result.dataNascimentoResponsavel
    );
    result.dataNascimentoDoador = dateFormat(result.dataNascimentoDoador);

    return res.json(result);
  },
};
