import Citizen from './model';

export const createOrFetch = async (req, res) => {
	const { personalId } = req.body;
	try {
		const ciztizen = await Citizen.findOne({ personalId });
		if (ciztizen) {
			return res.status(200).json({ message: 'Citizen allready exists', id: ciztizen.id });
		}
		const newCitizen = new Citizen({ personalId });
		await newCitizen.save();
		return res.status(201).json({ message: 'Citizen was created', id: newCitizen.id });
	} catch (e) {
		return res.status(404).json({ error: true, message: 'Can not create citizen' });
	}
};

export const findCitizenByPersonalId = async (req, res) => {
	const { personalId } = req.body;

	try {
		const citizen = await Citizen.findByPeronalId(personalId);
		return res.status(201).json(citizen);
	} catch (e) {
		return res.status(404).json({ error: true, message: 'Can not retrieve citizen' });
	}
};
