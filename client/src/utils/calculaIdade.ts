function calculaIdade(dataNascimento: string): number {
    const dataAtual = new Date();
    const dataN = new Date(dataNascimento);
    let idade = dataAtual.getFullYear() - dataN.getFullYear();

    const mesAtual = dataAtual.getMonth();
    const diaAtual = dataAtual.getDate();
    const mesN = dataN.getMonth();
    const diaN = dataN.getDate();

    if (mesAtual < mesN || (mesAtual === mesN && diaAtual < diaN)) {
        idade--;
    }

    return idade;
}

export default calculaIdade;