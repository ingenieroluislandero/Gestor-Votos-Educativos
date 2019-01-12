const mongoose = require('mongoose'),
	{Schema} = mongoose

const CandSchema = new Schema({
	nombre: {type: String, required: true},
	apellido: {type: String, required: true},
	grado: {type: String, required: true},
	curso: {type: String, required:true},
	lema: {type: String },
	votos: {type: String },
	admi: {type:String, required:true}

})

module.exports = mongoose.model('Candidato', CandSchema)
