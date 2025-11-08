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

router.get('/meus-servicos', ctrl.listarContratos);

// API de busca (autocomplete)
router.get('/api/search', ctrl.searchSuggestions);

// editar / excluir contratos
router.get('/contratos/:id/editar', ctrl.showEditarContrato);
router.post('/contratos/:id/editar', ctrl.handleEditarContrato);
router.post('/contratos/:id/excluir', ctrl.excluirContrato);


// LOGOUT
router.get('/logout', ctrl.logout);
export default router;


