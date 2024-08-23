# API de Tradução Multilíngue

## Visão Geral

A API de Tradução Multilíngue é uma aplicação Node.js projetada para traduzir textos entre vários idiomas usando o serviço LibreTranslate. A API oferece suporte à autenticação baseada em JWT, caching com Redis e suporte a múltiplos serviços de tradução, tornando-a uma solução robusta e eficiente para aplicações que necessitam de funcionalidades de tradução multilíngue.

## Tecnologias Utilizadas

- **Node.js**: Plataforma principal para o backend.
- **Express.js**: Framework para criação da API RESTful.
- **JWT**: Para autenticação baseada em tokens.
- **Redis**: Sistema de cache para otimização de desempenho.
- **MongoDB**: Banco de dados NoSQL para armazenar informações dos usuários e logs.
- **LibreTranslate**: Serviço de tradução utilizado na API.

## Funcionalidades

- **Tradução de Texto**: Suporte para traduzir texto entre diversos idiomas.
- **Autenticação**: Utiliza JWT para autenticar e autorizar usuários.
- **Caching**: Implementação de cache para otimizar respostas e reduzir a carga nas APIs externas.
- **Suporte a Múltiplos Serviços**: Integração com o serviço LibreTranslate.
- **Monitoramento e Logs**: Logs detalhados utilizando Winston e suporte para monitoramento futuro.

## Requisitos

- **Node.js**: versão 14.0 ou superior
- **npm**: versão 6.0 ou superior
- **Redis**: para caching
- **MongoDB**: para persistência de dados
- **LibreTranslate API**: Serviço de tradução utilizado na API.

## Configuração do Ambiente

1. **Clone o repositório**:

    
bash
    git clone https://github.com/seu-usuario/api-traducao-multilingue.git


2. **Acesse o diretório do projeto**:

    
bash
    cd api-traducao-multilingue


3. **Instale as dependências**:

    
bash
    npm install


4. **Configure as variáveis de ambiente**:

    Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

    
plaintext
    PORT=3000
    JWT_SECRET=SENHA_SECRETA_2024
    REDIS_URL=redis://localhost:6379
    MONGO_URI=mongodb://localhost:27017/traducao_multilingue
    LIBRETRANSLATE_URL=https://libretranslate.com/translate


5. **Inicie o servidor**:

    
bash
    npm start


## Estrutura do Projeto

plaintext
api-traducao-multilingue/
│
├── node_modules/          # Módulos Node.js instalados automaticamente
├── src/                   # Código-fonte principal
│   ├── controllers/       # Controladores para cada funcionalidade
│   ├── middleware/        # Middleware para autenticação, cache, etc.
│   ├── models/            # Modelos de dados do MongoDB
│   ├── routes/            # Rotas da API
│   ├── services/          # Serviços de integração com APIs externas
│   └── utils/             # Funções utilitárias e logs
├── tests/                 # Testes unitários e de integração
├── .env                   # Variáveis de ambiente
├── .gitignore             # Arquivos ignorados pelo Git
├── package.json           # Configurações do projeto e lista de dependências
├── index.js               # Arquivo principal da API
└── README.md              # Documentação do projeto

## Endpoints da API

### POST /usuario/registrar

**Descrição**: Registra um novo usuário no sistema.

- **Body**:
    - `nome` (string, obrigatório): Nome completo do usuário.
    - `email` (string, obrigatório): E-mail do usuário.
    - `senha` (string, obrigatório): Senha do usuário.

**Respostas**:

- **201 Created**: Usuário registrado com sucesso.
- **400 Bad Request**: Dados de registro inválidos.

### POST /usuario/login

**Descrição**: Autentica um usuário e retorna um token JWT.

- **Body**:
    - `email` (string, obrigatório): E-mail do usuário.
    - `senha` (string, obrigatório): Senha do usuário.

**Respostas**:

- **200 OK**: Login realizado com sucesso.
- **401 Unauthorized**: Credenciais inválidas.

### POST /traduzir

**Descrição**: Traduz um texto de um idioma para outro.

- **Headers**:
    - `Authorization` (string, obrigatório): Token JWT para autenticação.
- **Body**:
    - `texto` (string, obrigatório): Texto a ser traduzido.
    - `idiomaOrigem` (string, obrigatório): Código do idioma de origem (ex: 'en' para inglês).
    - `idiomaDestino` (string, obrigatório): Código do idioma de destino (ex: 'pt' para português).

**Respostas**:

- **200 OK**: Tradução realizada com sucesso.
- **400 Bad Request**: Parâmetros inválidos.
- **401 Unauthorized**: Token JWT inválido ou ausente.
- **500 Internal Server Error**: Erro ao processar a tradução.

## Testes

Os testes automatizados estão localizados na pasta `tests/` e utilizam `supertest` para testar os endpoints da API.

Para executar os testes, use: `npm test`.

## Pipeline de Integração Contínua

Este projeto utiliza GitHub Actions para integração contínua. O pipeline é configurado para rodar testes automatizados e verificar a qualidade do código em cada push ou pull request para a branch `main`.

### Configuração do Pipeline

O pipeline está configurado no arquivo `.github/workflows/nodejs.yml` e realiza as seguintes tarefas:

- Faz o checkout do código.
- Instala as dependências do projeto.
- Executa os testes automatizados.
- Executa o linting do código.

## Tratamento de Erros

O projeto possui middleware para tratamento de erros, incluindo um middleware para capturar erros gerais e outro para capturar requisições a rotas inexistentes.

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests para melhorias, correções ou novas funcionalidades.

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para mais detalhes.