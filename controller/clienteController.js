import clienteModel from '../models/clienteModel.js';

const clienteController = {

    showLoginForm(req, res) {
        res.render('login', { error: null, form: {} });
    },

    async handleLogin(req, res) {
        try {
            const { nome, endereco, telefone } = req.body;

            if (!nome || !telefone) {
                return res.render('login', { error: 'Nome e telefone são obrigatórios.', form: { nome, endereco, telefone } });
            }

            let cliente = await clienteModel.findByTelefone(telefone);
            if (!cliente) {
                cliente = await clienteModel.create({ nome, endereco, telefone });
            }

            // atenção: session middleware deve estar configurado no app para isso funcionar
            if (req.session) {
                req.session.cliente = { id: cliente.id, nome: cliente.nome, telefone: cliente.telefone };
            }

            return res.redirect('/home');

        } catch (err) {
            console.error(err);
            return res.render('login', { error: 'Erro no servidor. Tente Novamente.', form: req.body });
        }
    },

    showHome(req, res) {
        if (!req.session || !req.session.cliente) {
            return res.redirect('/login');
        }
        res.render('home', { cliente: req.session.cliente });
    }
};

export default clienteController;
