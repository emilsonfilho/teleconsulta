function formatDate(date: string): string {
    const partes = date.split('-')
    const ano = partes[0]
    const mes = partes[1]
    const dia = partes[2]

    return `${dia}/${mes}/${ano}`
}

export default formatDate