const Card = require('../models/Card');

exports.createCard = async (req, res) => {
    try {
        const { userId, name, title, description, email, phone } = req.body;

        const newCard = new Card({
            userId,
            name,
            title,
            description,
            email,
            phone
        });

        await newCard.save();
        res.status(201).json({ message: 'Tarjeta creada correctamente', card: newCard });

    } catch (error) {
        res.status(500).json({ message: 'Error al crear la tarjeta', error: error.message });
    }
}


exports.getUserCards = async (req, res) => {
    try {
        const cards = await Card.find({ userId: req.params.userId });
        res.json(cards);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las tarjetas', error: error.message });
    }
}