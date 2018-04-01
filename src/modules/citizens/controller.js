import Citizen from './model';

export const createCitizen = async (req, res) => {
	const {
		personalId, fullName, adress, phoneNumber,
	} = req.body;

	const newCitizen = new Citizen({
		personalId, fullName, adress, phoneNumber,
	});

	try {
		await newCitizen.save();
		return res.status(201).json({ message: 'Citizen was created' });
	} catch (e) {
		return res.status(404).json({ error: true, message: 'Can not create citizen' });
	}
};

export const updateCitizen = async (req, res) => {
	const {
		citizenId, fullName, adress, phoneNumber,
	} = req.body;

	try {
		await Citizen.update(citizenId, fullName, adress, phoneNumber);
		return res.status(201).json({ message: 'Citizen was updated' });
	} catch (e) {
		return res.status(404).json({ error: true, message: 'Can not update citizen' });
	}
};

export const findCitizenByPersonalId = async (req, res) => {
	const { personalId } = req.body;

	try {
		const citizen = await Citizen.findByPeronalId(personalId);
		return res.status(201).json({ Citize: citizen });
	} catch (e) {
		return res.status(404).json({ error: true, message: 'Can not retrieve citizen' });
	}
};
