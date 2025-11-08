import clienteModel from '../models/clienteModel.js';
import contratoModel from '../models/contratoModel.js';

// Mock global de profissionais (usado para home e para sugestões)
const PROFESSIONALS = [
    {
        id: 1,
        nome: 'Carlos Souza',
        categoria: 'Eletricista',
        descricao: 'Especialista em instalações e manutenções elétricas residenciais e comerciais.',
        distancia: '2.3 km',
        estrelas: 4.8,
        imagem: '/imagens/eletricista.jpg',
        preco: 'R$ 150,00'
    },
    {
        id: 2,
        nome: 'Ana Oliveira',
        categoria: 'Jardineira',
        descricao: 'Cuida de jardins, poda e paisagismo com foco sustentável.',
        distancia: '1.1 km',
        estrelas: 4.6,
        imagem: '/imagens/jardineira.jpg',
        preco: 'R$ 100,00'
    },
    {
        id: 3,
        nome: 'João Mendes',
        categoria: 'Cuidador de Pets',
        descricao: 'Amante dos animais, oferece cuidados personalizados e passeios diários.',
        distancia: '3.7 km',
        estrelas: 5.0,
        imagem: '/imagens/cuidador.jpg',
        preco: 'R$ 80,00'
    }
];

const clienteController = {

    // --- LOGIN ---
    showLoginForm(req, res) {
        res.render('login', { error: null, form: {} });
    },

    async handleLogin(req, res) {
        const { nome, telefone } = req.body;

        // Validação básica de presença
        if (!nome || !telefone) {
            return res.render('login', { error: 'Nome e telefone são obrigatórios.', form: { nome, telefone } });
        }

        try {
            const cliente = await clienteModel.findByTelefone(telefone);

            // Mensagem ambígua para evitar expor se o telefone existe
            const loginError = 'Usuário ou telefone incorretos.';

            if (!cliente || (cliente.nome && cliente.nome.trim().toLowerCase() !== nome.trim().toLowerCase())) {
                return res.render('login', { error: loginError, form: { nome, telefone } });
            }

            req.session.cliente = { id: cliente.id, nome: cliente.nome, telefone: cliente.telefone };
            return res.redirect('/home');
        } catch (err) {
            console.error(err);
            return res.render('login', { error: 'Erro do servidor. Tente novamente.', form: { nome, telefone } });
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

        // permite filtrar com query param `q`
        const q = (req.query.q || '').trim().toLowerCase();
        let profissionais = PROFESSIONALS;
        if (q) {
            profissionais = PROFESSIONALS.filter(p => {
                return p.nome.toLowerCase().includes(q)
                    || p.categoria.toLowerCase().includes(q)
                    || (p.descricao && p.descricao.toLowerCase().includes(q));
            });
        }

        res.render('home', {
            cliente: req.session.cliente,
            profissionais,
            q: req.query.q || ''
        });
    },

    // Endpoint JSON para sugestões (autocomplete)
    searchSuggestions(req, res) {
        const q = (req.query.q || '').trim().toLowerCase();
        if (!q) return res.json([]);

        const matches = PROFESSIONALS.filter(p => {
            return p.nome.toLowerCase().includes(q)
                || p.categoria.toLowerCase().includes(q)
                || (p.descricao && p.descricao.toLowerCase().includes(q));
        }).slice(0, 8).map(p => ({ id: p.id, nome: p.nome, categoria: p.categoria }));

        return res.json(matches);
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

    async confirmarContratacao(req, res) {
        if (!req.session.cliente) return res.redirect('/login');

        const { id } = req.params;
        const cliente_id = req.session.cliente.id;

        // Usamos o mesmo mock de profissionais
        const profissionais = [
            { id: 1, nome: 'Carlos Souza', categoria: 'Eletricista' },
            { id: 2, nome: 'Ana Oliveira', categoria: 'Jardineira' },
            { id: 3, nome: 'João Mendes', categoria: 'Cuidador de Pets' }
        ];

        const profissional = profissionais.find(p => p.id === parseInt(id));
        if (!profissional) return res.status(404).send('Profissional não encontrado');

        try {
            // cria o registro no banco
            await contratoModel.criar(cliente_id, profissional);

            // montar dados para exibição imediata (podemos também buscar do DB se preferir)
            const contrato = {
                data: new Date().toLocaleString('pt-BR'),
                status: 'confirmado'
            };

            return res.render('confirmacao', {
                cliente: req.session.cliente,
                profissional,
                contrato
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send('Erro ao registrar contratação.');
        }
    },

    async listarContratos(req, res) {
        if (!req.session.cliente) return res.redirect('/login');

        const cliente_id = req.session.cliente.id;

        try {
            const contratos = await contratoModel.listarPorCliente(cliente_id);
            // repassa mensagens via query string (success/error) para exibição amigável
            const success = req.query.success || null;
            const error = req.query.error || null;
            res.render('meusServicos', { cliente: req.session.cliente, contratos, success, error });
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao carregar seus serviços.');
        }
    },

    // Mostrar formulário de edição de um contrato
    async showEditarContrato(req, res) {
        if (!req.session.cliente) return res.redirect('/login');

        const { id } = req.params;
        try {
            const contrato = await contratoModel.findById(id);
            if (!contrato) return res.status(404).send('Contrato não encontrado');

            // apenas permitir que o dono veja/edite
            if (contrato.cliente_id !== req.session.cliente.id) return res.status(403).send('Acesso negado');

            return res.render('editarContrato', { cliente: req.session.cliente, contrato });
        } catch (err) {
            console.error(err);
            return res.status(500).send('Erro ao carregar contrato.');
        }
    },

    // Recebe edição do contrato
    async handleEditarContrato(req, res) {
        if (!req.session.cliente) return res.redirect('/login');

        const { id } = req.params;
        const { profissional_nome, categoria, status } = req.body;

        try {
            const contrato = await contratoModel.findById(id);
            if (!contrato) return res.status(404).send('Contrato não encontrado');
            if (contrato.cliente_id !== req.session.cliente.id) return res.status(403).send('Acesso negado');

            await contratoModel.atualizar(id, { profissional_nome, categoria, status });
            const msg = encodeURIComponent('Serviço atualizado com sucesso.');
            return res.redirect(`/meus-servicos?success=${msg}`);
        } catch (err) {
            console.error(err);
            return res.status(500).send('Erro ao atualizar contrato.');
        }
    },

    // Excluir contrato
    async excluirContrato(req, res) {
        if (!req.session.cliente) return res.redirect('/login');

        const { id } = req.params;
        try {
            const contrato = await contratoModel.findById(id);
            if (!contrato) return res.status(404).send('Contrato não encontrado');
            if (contrato.cliente_id !== req.session.cliente.id) return res.status(403).send('Acesso negado');

            await contratoModel.excluir(id);
            const msg = encodeURIComponent('Serviço excluído com sucesso.');
            return res.redirect(`/meus-servicos?success=${msg}`);
        } catch (err) {
            console.error(err);
            return res.status(500).send('Erro ao excluir contrato.');
        }
    },


    // --- LOGOUT (opcional) ---
    logout(req, res) {
        req.session.destroy(() => {
            res.redirect('/login');
        });
    }
};

export default clienteController;
