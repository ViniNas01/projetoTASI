import express from 'express';
const router = express.Router();
import ctrl from '../controller/clienteController.js';

router.get('/login', ctrl.showLoginForm);
router.post('/login', ctrl.handleLogin);

// CADASTRO
router.get('/cadastro', ctrl.showCadastroForm);
router.post('/cadastro', ctrl.handleCadastro);

// HOME
router.get('/home', ctrl.showHome);

// PROFISSIONAL (novo)
router.get('/profissional/:id', ctrl.showProfissional);
router.post('/contratar/:id', ctrl.confirmarContratacao);

// LOGOUT
router.get('/logout', ctrl.logout);
export default router;


