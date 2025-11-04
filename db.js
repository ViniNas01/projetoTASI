import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Vno!120601', // * quando Rodar o projeto trocar a senha para root
    database: 'cliente_db'
});

connection.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao MySQL: ', err.message);
        return;
    }

    console.log('Conectado ao MySQL!');
});

export default connection;

// * dados dos profissionais
const clientes = [
  {
    id: 1,
    nome: 'Maria Eduarda Silva',
    categoria: 'Eletricista',
    distancia: '1,2 km',
    estrelas: 4,
    preco: 80,
    servicos: ['Eletricista', 'Reparos rápidos'],
    localizacao: 'São Paulo',
    avaliacoes: [
      { nome: 'Maria', texto: 'Muito eficiente e rápido. Recomendo!' },
      { nome: 'Carlos', texto: 'Chegou no horário e fez um ótimo serviço.' },
      { nome: 'Ana', texto: 'Bom atendimento, preço justo.' }
    ]
  },
  {
    id: 2,
    nome: 'Júlia Santos',
    categoria: 'Diarista',
    distancia: '2,8 km',
    estrelas: 5,
    preco: 90,
    servicos: ['Limpeza residencial'],
    localizacao: 'São Paulo',
    avaliacoes: [
      { nome: 'Fernanda', texto: 'Serviço impecável, super caprichosa!' }
    ]
  },
  {
    id: 3,
    nome: 'Carlos Mendes',
    categoria: 'Jardinagem',
    distancia: '900 m',
    estrelas: 3,
    preco: 70,
    servicos: ['Jardinagem', 'Poda', 'Manutenção de gramado'],
    localizacao: 'São Paulo',
    avaliacoes: [
      { nome: 'Paulo', texto: 'Trabalha bem, mas poderia ser mais pontual.' }
    ]
  },
  {
    id: 4,
    nome: 'Rogério Lima',
    categoria: 'Pedreiro',
    distancia: '1,8 km',
    estrelas: 5,
    preco: 150,
    servicos: ['Construção', 'Reboco', 'Assentamento de pisos e azulejos'],
    localizacao: 'São Paulo',
    avaliacoes: [
      { nome: 'Cláudia', texto: 'Excelente profissional, obra entregue no prazo!' },
      { nome: 'José', texto: 'Muito cuidadoso e atencioso com os detalhes.' }
    ]
  },
  {
    id: 5,
    nome: 'Tiago Moreira',
    categoria: 'Pintor',
    distancia: '3,1 km',
    estrelas: 4,
    preco: 120,
    servicos: ['Pintura residencial', 'Textura', 'Restauração de paredes'],
    localizacao: 'São Paulo',
    avaliacoes: [
      { nome: 'Amanda', texto: 'Trabalho limpo e rápido!' },
      { nome: 'Renato', texto: 'Boa comunicação e ótimo acabamento.' }
    ]
  },
  {
    id: 6,
    nome: 'Fernanda Costa',
    categoria: 'Passeador de Cachorros',
    distancia: '700 m',
    estrelas: 5,
    preco: 50,
    servicos: ['Passeio diário', 'Adestramento básico', 'Cuidado com pets'],
    localizacao: 'São Paulo',
    avaliacoes: [
      { nome: 'Bruna', texto: 'Meu cachorro adora ela! Super confiável.' },
      { nome: 'João', texto: 'Pontual e cuidadosa com os animais.' }
    ]
  },
  {
    id: 7,
    nome: 'André Souza',
    categoria: 'Mecânico',
    distancia: '2,2 km',
    estrelas: 4,
    preco: 200,
    servicos: ['Troca de óleo', 'Revisão geral', 'Freios e suspensão'],
    localizacao: 'São Paulo',
    avaliacoes: [
      { nome: 'Ricardo', texto: 'Serviço honesto e transparente, recomendo!' },
      { nome: 'Lívia', texto: 'Atendimento rápido e preço justo.' }
    ]
  }
];
