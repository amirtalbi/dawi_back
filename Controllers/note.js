// const note = require('../Models/note')
const { where } = require("sequelize");
const { Note } = require("../db/sequelize");

exports.getOneNote = (req, res) => {
    const id = req.params.id;
    Note.findByPk(id)
        .then((note) => {
            if (note === null) {
                const message = `La note ${id} n'existe pas`;
                return res.status(400).json({ message, data: error });
            } else {
                const message = `La note ${id} a été récuperé`;
                return res.status(201).json({ message, data: note });
            }
        })
        .catch((error) => {
            const message = `La note ${id} n'a pas pu etre récuperé. Réessayez dans quelques instants.`;
            return res.status(500).json({ message, data: error });
        });
};

exports.getUserNotes = (req, res) => {
    Note.findAll({ where: { etudiantId: req.params.id } })
        .then((notes) => {
            if (notes.length === 0) {
                const message = `Aucune note trouvée pour cet étudiant`;
                return res.status(404).json({ message });
            } else {
                return res.status(200).json({ data: notes });
            }
        })
        .catch((error) => {
            const message = `Une erreur s'est produite lors de la récupération des notes`;
            return res.status(500).json({ message, error });
        });
};

exports.getAllNotes = (req, res) => {
    Note.findAll()
        .then((note) => {
            const message = "Liste des Notes:";
            return res.json({ message, data: note });
        })
        .catch((error) => {
            const message = `La liste des Notes n'a pas pu être recupérer. Réessayez dans quelques instants.`;
            return res.status(500).json({ message, data: error });
        });
};

exports.newNote = (req, res) => {
    Note.create(req.body)
        .then((note) => {
            if (note === null) {
                const message = `La note n'est pas créer.`;
                return res.status(404).json({ message });
            } else {
                const message = `La note a été crée  id:${note.id}`;
                return res.json({ message, data: note });
            }
        })
        .catch((error) => {
            const message = `La note n'a pas pu être créer. Réessayez dans quelques instants.`;
            return res.status(500).json({ message, data: error });
        });
};

exports.updateNote = (req, res) => {
    const id = req.params.id;
    Note.update(req.body, { where: { id: id } })
        .then(() => {
            return Note.findByPk(id).then((note) => {
                if (note.id === null) {
                    const message = `La note n'existe pas.`;
                    return res.status(404).json({ message });
                } else {
                    const message = `La note ayant pour id: ${note.id} a été mis à jour `;
                    return res.status(201).json({ message, data: note });
                }
            });
        })
        .catch((error) => {
            const message = `La note n'a pas pu être modifié. Réessayez dans quelques instants.`;
            return res.status(500).json({ message, data: error });
        });
};

exports.deleteNote = (req, res) => {
    const id = req.params.id;
    Note.findByPk(id)
        .then((note) => {
            if (note === null) {
                const message = `La note n'existe pas.`;
                return res.status(404).json({ message });
            } else {
                const message = `La note ${id} à bien été supprimé`;
                return Note.destroy({ where: { id } }).then(res.status(201).json({ message, data: note }));
            }
        })
        .catch((error) => {
            const message = `La note n'a pas pu etre supprimé. Réessayez dans quelques instants.`;
            return res.status(500).json({ message, data: error });
        });
};
