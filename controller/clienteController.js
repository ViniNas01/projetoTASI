import clienteModel from '../models/clienteModel.js';

const clienteController = {

  // --- LOGIN ---
  showLoginForm(req, res) {
    res.render('login', { error: null, form: {} });
  },

  async handleLogin(req, res) {
    const { telefone } = req.body;

    if (!telefone) {
      return res.render('login', { error: 'Informe o telefone.', form: { telefone } });
    }

    try {
      const cliente = await clienteModel.findByTelefone(telefone);
      if (!cliente) {
        return res.render('login', { error: 'Telefone não cadastrado.', form: { telefone } });
      }

      req.session.cliente = { id: cliente.id, nome: cliente.nome, telefone: cliente.telefone };
      res.redirect('/home');
    } catch (err) {
      console.error(err);
      res.render('login', { error: 'Erro do servidor. Tente novamente.', form: { telefone } });
    }
  },

    // --- CADASTRO ---
  showCadastroForm(req, res) {
    res.render('cadastro', { error: null, form: {} });
  },

  async handleCadastro(req, res) {
    const { nome, endereco, telefone } = req.body;

    if (!nome || !telefone) {
      return res.render('cadastro', {
        error: 'Preencha todos os campos obrigatórios.',
        form: { nome, endereco, telefone }
      });
    }

    try {
      const existe = await clienteModel.findByTelefone(telefone);
      if (existe) {
        return res.render('cadastro', {
          error: 'Telefone já cadastrado. Faça login.',
          form: { nome, endereco, telefone }
        });
      }

      const novoCliente = await ClienteModel.create({ nome, endereco, telefone });
      req.session.cliente = { id: novoCliente.id, nome: novoCliente.nome, telefone: novoCliente.telefone };

      res.redirect('/home');
    } catch (err) {
      console.error(err);
      res.render('cadastro', { error: 'Erro ao cadastrar. Tente novamente.', form: req.body });
    }
  },

  // --- HOME ---
  showHome(req, res) {
    if (!req.session.cliente) {
      return res.redirect('/login');
    }
    res.render('home', { cliente: req.session.cliente });
  },

  // --- LOGOUT (opcional) ---
  logout(req, res) {
    req.session.destroy(() => {
      res.redirect('/login');
    });
  }
};

export default clienteController;
