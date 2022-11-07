const validName = (name) => {
	if (!name)
		return 'Por favor insira um nome.'

	if (name.length < 3)
		return 'O seu nome precisa ter mais de 3 caracteres.'
}

export default validName