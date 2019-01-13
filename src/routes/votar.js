const express = require('express'),
	 router = express.Router(),
	 Cand = require('../models/Candidato'),
	 {isAuthenticated} = require('../helpers/auth')

router
	.get('/vistaAdmi/add',isAuthenticated, (req, res)=>{
		res.render('vistaAdmi/agregar')
	})

	.post('/vistaAdmi/agregar', isAuthenticated , async (req, res)=>{
		const {nombre, apellido, grado, curso, lema} = req.body
		const errors = [];

		if (!nombre) {
			errors.push({text: 'escriba un nombre'})
		}
		if (!apellido) {
			errors.push({text: 'escriba un apellido'})
		}
		if (!grado) {
			errors.push({text: 'escriba un grado'})
		}
		if (!curso) {
			errors.push({text: 'escriba un curso'})
		}
		if (!lema) {
			errors.push({text: 'escriba un lema'})
		}
		if (errors.length > 0) {
			res.render('vistaAdmi/agregar', {
				nombre, apellido, grado, curso, lema
			})

		}
		else{
			const voto = '0'
			const newCand = new Cand({nombre, apellido, grado, curso, lema})
			newCand.admi = req.user.id 
			newCand.voto = voto
			await newCand.save()
			req.flash('success_msg','candidato agregado con exito')
			res.redirect('/vistaAdmi/welcome')
		}

	})

	.get('/vistaAdmi/ver', isAuthenticated, async (req, res)=>{
		const candi = await Cand.find({admi: req.user.id}).sort({date: 'desc'})
		res.render('vistaAdmi/consulta', {candi})
	})

	.get('/vistaAdmi/editar/:id', isAuthenticated, async (req, res)=>{
		const candi = await Cand.findById(req.params.id)
		if (candi.admi != req.user.id) {
			req.flash('error_msg', 'usuario no autorizado')
			return redirect('/vistaAdmi/welcome')

		}
		res.render('vistaAdmi/editarC', {candi})
	})

	.put('/vistaAdmi/editarC/:id', isAuthenticated, async (req, res)=>{
		const {nombre, apellido, grado, curso, lema} = req.body
		await Cand.findByIdAndUpdate(req.params.id, {nombre, apellido, grado, curso, lema})
		req.flash('success_msg', 'candidato actualizado con exito')
		res.redirect('/vistaAdmi/welcome')
	})

	.delete('/vistaAdmi/delete/:id', isAuthenticated, async(req, res)=>{
		await Cand.findByIdAndDelete(req.params.id)
		req.flash('success_msg', 'Eliminado con exito')
		res.redirect('/vistaAdmi/welcome')
	})



	.get('/vistaAdmi/welcome', isAuthenticated, (req, res)=>{
		res.render('vistaAdmi/welcome')
	})


module.exports = router