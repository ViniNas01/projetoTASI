import express from 'express';
const router = express.Router();
import ctrl from '../controller/clienteController';

router.get('/login', ctrl.showLoginForm);
router.post('/login', ctrl.handleLogin);
router.get('/home', ctrl.showHome);

module.exports = router;


