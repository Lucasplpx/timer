const jsonfile = require('jsonfile-promised');
const { existsSync, readdirSync } = require('fs');

module.exports = {
  salvaDados(curso, tempoEstudado) {
    const caminhoDoCurso = `${__dirname}/data/${curso}.json`;
    if (existsSync(caminhoDoCurso)) {
      this.adicionaTempoAoCurso(caminhoDoCurso, tempoEstudado);
    } else {
      this.criaArquivoDeCurso(caminhoDoCurso, {}).then(() => {
        this.adicionaTempoAoCurso(caminhoDoCurso, tempoEstudado);
      });
    }
  },
  adicionaTempoAoCurso(caminhoDoCurso, tempoEstudo) {
    let dados = {
      ultimoEstudo: new Date().toString(),
      tempo: tempoEstudo,
    };
    jsonfile
      .writeFile(caminhoDoCurso, dados, { spaces: 2 })
      .then(() => {
        console.log('Tempo salvo com sucesso');
      })
      .catch(console.log);
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
  pegaDados(curso) {
    const caminhoDoCurso = `${__dirname}/data/${curso}.json`;
    return jsonfile.readFile(caminhoDoCurso);
  },
  pegaNomeDosCursos() {
    const arquivos = readdirSync(__dirname + '/data/');
    const cursos = arquivos.map((arquivo) => {
      return arquivo.substr(0, arquivo.lastIndexOf('.'));
    });

    return cursos;
  },
};
