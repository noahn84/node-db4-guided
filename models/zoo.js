const db = require("../data/config")

function find() {
	return db("zoos")
}

function findById(id) {
	return db("zoos")
		.where("id", id)
		.first()
}

function findZooAnimals(zooID) {
	// SELECT *
	// FROM zoos_animals
	// JOIN zoos ON zoos_animals.zoo_id = zoos.id
	// JOIN animals ON zoos_animals.animal_id = animals.id
	// WHERE zoos.id = ?;
	return db("zoos_animals as za")
		.innerJoin("zoos as z", "z.id", "za.zoo_id")
		.innerJoin("animals as a", "a.id", "za.animal_id")
		.innerJoin("species as s", "s.id", "a.species_id")
		.where("z.id", zooID)
		.select([
			"a.*",
			"a.name",
			"s.name as species_name",
			"za.arrival",
			"za.departure"
		])
}

module.exports = {
	find,
	findById,
	findZooAnimals,
}