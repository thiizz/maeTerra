import connectDB from '../../../lib/connectDB'
import Users from '../../../models/userModels'
import { compare } from 'bcrypt'
import { createAccessToken, createRefreshToken } from '../../../utils/generateToken'

connectDB()

const post = async (req, res) => {
	switch (req.method) {
		case "POST":
			await login(req, res)
			break;
	}
}

const login = async (req, res) => {
	try {
		const { email, password } = req.body

		const user = await Users.findOne({ email })
		if (!user) return res.status(400).json({ err: 'This user does not exist.' })

		const isMatch = await compare(password, user.password)
		if (!isMatch) return res.status(400).json({ err: 'Incorrect password.' })

		const access_token = createAccessToken({ id: user._id })
		const refresh_token = createRefreshToken({ id: user._id })

		res.json({
			msg: "Logado com sucesso!",
			refresh_token,
			access_token,
			user: {
				name: user.name,
				secondName: user.secondName,
				email: user.email,
				role: user.role,
				root: user.root
			}
		})
	} catch (err) {
		return res.status(500).json({ err: err.message })
	}
}

export default post