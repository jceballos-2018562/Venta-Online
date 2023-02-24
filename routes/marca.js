const { Router } = require('express');
const { check } = require('express-validator');

//Controllers
const { getMarcas, getMarcaPorID, postMarca, putMarca, deleteMarca } = require('../controllers/marca');
const { existeMarcaPorId } = require('../helpers/db-validators');

// Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

//Manejo de rutas

// Obtener todas las marcas - publico
router.get('/', getMarcas );

// Obtener una marca por id - publico
router.get('/:id', [
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('id').custom( existeMarcaPorId ),
    validarCampos
], getMarcaPorID );

// Crear marca - privada - cualquier persona con un token válido
router.post('/agregar', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
] ,postMarca);

// Actuaizar marca - privada - cualquier persona con un token válido
router.put('/editar/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeMarcaPorId ),
    validarCampos
] ,putMarca);

//Borrar una marca - privado - Solo el admin puede eliminar una marca (estado: false)
router.delete('/eliminar/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('id').custom( existeMarcaPorId ),
    validarCampos
] ,deleteMarca);



module.exports = router;