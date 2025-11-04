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

      const novoCliente = await clienteModel.create({ nome, endereco, telefone });
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

    // Mock de profissionais
    const profissionais = [
      {
        id: 1,
        nome: 'Carlos Souza',
        categoria: 'Eletricista',
        descricao: 'Especialista em instalações e manutenções elétricas residenciais e comerciais.',
        distancia: '2.3 km',
        estrelas: 4.8,
        imagem: '/IMAGENS/eletricista.jpg',
        preco: 'R$ 150,00'
      },
      {
        id: 2,
        nome: 'Ana Oliveira',
        categoria: 'Jardineira',
        descricao: 'Cuida de jardins, poda e paisagismo com foco sustentável.',
        distancia: '1.1 km',
        estrelas: 4.6,
        imagem: '/IMAGENS/jardineira.jpg',
        preco: 'R$ 100,00'
      },
      {
        id: 3,
        nome: 'João Mendes',
        categoria: 'Cuidador de Pets',
        descricao: 'Amante dos animais, oferece cuidados personalizados e passeios diários.',
        distancia: '3.7 km',
        estrelas: 5.0,
        imagem: '/IMAGENS/cuidador.jpg',
        preco: 'R$ 80,00'
      }
    ];

    res.render('home', {
      cliente: req.session.cliente,
      profissionais
    });
  },

  // === NOVAS FUNÇÕES ===
  showProfissional(req, res) {
    if (!req.session.cliente) return res.redirect('/login');

    const { id } = req.params;

    // Mesmo mock (em projeto real: query no DB)
    const profissionais = [
      {
        id: 1,
        nome: 'Carlos Souza',
        categoria: 'Eletricista',
        descricao: 'Especialista em instalações e manutenções elétricas residenciais e comerciais.',
        distancia: '2.3 km',
        estrelas: 4.8,
        imagem: '/IMAGENS/eletricista.jpg',
        preco: 'R$ 150,00'
      },
      {
        id: 2,
        nome: 'Ana Oliveira',
        categoria: 'Jardineira',
        descricao: 'Cuida de jardins, poda e paisagismo com foco sustentável.',
        distancia: '1.1 km',
        estrelas: 4.6,
        imagem: '/IMAGENS/jardineira.jpg',
        preco: 'R$ 100,00'
      },
      {
        id: 3,
        nome: 'João Mendes',
        categoria: 'Cuidador de Pets',
        descricao: 'Amante dos animais, oferece cuidados personalizados e passeios diários.',
        distancia: '3.7 km',
        estrelas: 5.0,
        imagem: '/IMAGENS/cuidador.jpg',
        preco: 'R$ 80,00'
      }
    ];

    const profissional = profissionais.find(p => p.id === parseInt(id));
    if (!profissional) return res.status(404).send('Profissional não encontrado');

    res.render('profissional', {
      cliente: req.session.cliente,
      profissional
    });
  },

  confirmarContratacao(req, res) {
    if (!req.session.cliente) return res.redirect('/login');

    const { id } = req.params;
    const { nome } = req.session.cliente;

    console.log(`Cliente ${nome} contratou o profissional ID ${id}`);

    // Aqui futuramente gravaremos no banco
    res.send(`
      <h2>✅ Contratação Confirmada!</h2>
      <p>Você contratou o profissional ID ${id} com sucesso.</p>
      <a href="/home">Voltar à página inicial</a>
    `);
  },

  // --- LOGOUT (opcional) ---
  logout(req, res) {
    req.session.destroy(() => {
      res.redirect('/login');
    });
  }
};

export default clienteController;
