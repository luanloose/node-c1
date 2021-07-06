const pessoaModel = require('../../models/postgres/Pessoa');

exports.login = async (request, response) => {
  const { email, password } = request.body;

  try {
    const pessoa = await pessoaModel.findOne({
      where: {
        email,
        password
      }
    });

    if (pessoa === null) {
      return response.status(404).json("Pessoa não cadastrada");
    }
    else {
      return response.json(pessoa);
    }
  } catch (error) {
    return response.status(400).json(error);
  }
}