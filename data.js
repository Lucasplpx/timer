const jsonfile = require('jsonfile-promised');
const { existsSync } = require('fs');

module.exports = {
  salvaDados(curso, tempoEstudado) {
    const arquivoDoCurso = `${__dirname}/data/${curso}.json`;
    if (existsSync(arquivoDoCurso)) {
    } else {
      this.criaArquivoDeCurso(arquivoDoCurso, {}).then(() => {});
    }
  },
  criaArquivoDeCurso(nomeArquivo, conteudoArquivo) {
    return jsonfile
      .writeFile(nomeArquivo, conteudoArquivo)
      .then(() => {
        console.log('Arquivo criado');
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
