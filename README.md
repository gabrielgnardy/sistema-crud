# Projeto Frontend - Gerenciamento de Tarefas

Este é o frontend da aplicação de gerenciamento de tarefas. O projeto utiliza React para criar uma interface de usuário dinâmica e interativa, e integra-se com o backend para realizar operações de CRUD (Create, Read, Update, Delete) nas tarefas.

## Funcionalidades

- **Autenticação de Usuário**: Registro e login de usuários com validação.
- **Gerenciamento de Tarefas**: Criação, edição, visualização e exclusão de tarefas.
- **Visualização e Edição de Tarefas**: Interface para listar tarefas e editar suas informações diretamente.
- **Documentação da API**: Acesso à documentação da API através do Swagger.

## Tecnologias Utilizadas

- **React**: Biblioteca para criar interfaces de usuário.
  - Versão: ^18.3.1
- **Material-UI (MUI)**: Biblioteca de componentes para React que fornece uma interface de usuário moderna e responsiva.
  - **@mui/material**: ^6.0.1
  - **@mui/icons-material**: ^6.0.1
- **Emotion**: Biblioteca para estilização com CSS-in-JS.
  - **@emotion/react**: ^11.13.3
  - **@emotion/styled**: ^11.13.0
- **Axios**: Biblioteca para realizar requisições HTTP.
  - Versão: ^1.7.7
- **React Router DOM**: Biblioteca para roteamento dentro da aplicação React.
  - Versão: ^6.26.1
- **Date-fns**: Biblioteca para manipulação de datas.
  - Versão: ^3.6.0
- **Testing Library**: Ferramentas para testes de componentes React.
  - **@testing-library/react**: ^13.4.0
  - **@testing-library/jest-dom**: ^5.17.0
  - **@testing-library/user-event**: ^13.5.0
- **Toolpad Core**: Biblioteca para construir e gerenciar aplicações.
  - Versão: ^0.5.2
- **React Scripts**: Scripts e configurações padrão para criar uma aplicação React.
  - Versão: 5.0.1
- **Web Vitals**: Biblioteca para medir a performance da web.
  - Versão: ^2.1.4


## Configuração do Projeto

### Instalação

1. **Clone o Repositório**:
   ```bash
   git clone https://github.com/gabrielgnardy/sistema-crud
    ```

2. **Navegue até o Diretório do Projeto:**
   ```
   cd sistema-crud
    ```

2. **Instale as Dependências:**


   ```
   npm install

    ```
## Configuração de Variáveis de Ambiente

Para configurar o projeto frontend, você precisará definir algumas variáveis de ambiente. Estas variáveis são usadas para configurar a URL base da API e outras configurações importantes.

### Criando o Arquivo `.env`

Crie um arquivo chamado `.env` na raiz do projeto, se ainda não existir. Adicione as seguintes variáveis de ambiente ao arquivo:

   ```
REACT_APP_API_URL=http://localhost:5000/api
   ```

- `REACT_APP_API_URL`: URL base para o backend da API. Substitua `http://localhost:5000/api` pela URL onde seu backend está hospedado.

### Utilizando Variáveis de Ambiente

No código React, você pode acessar as variáveis de ambiente usando `process.env`. Por exemplo, para fazer uma requisição HTTP utilizando Axios, você pode configurar a URL base da seguinte forma:

    ```javascript
    import axios from 'axios';

    const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    });

    export default api;
    ```
### Observações

- **Prefixo `REACT_APP_`**: No Create React App, todas as variáveis de ambiente acessíveis no código devem começar com o prefixo `REACT_APP_`. Isso garante que as variáveis sejam incluídas no bundle final da aplicação e possam ser acessadas através de `process.env`.

- **Segurança**: Evite incluir informações sensíveis, como chaves de API ou credenciais, diretamente no arquivo `.env`. Para proteger dados sensíveis, use variáveis de ambiente no lado do servidor ou considere outras abordagens seguras para o gerenciamento de informações confidenciais.

- **Reinicie o Servidor de Desenvolvimento**: Após adicionar ou modificar variáveis de ambiente, é necessário reiniciar o servidor de desenvolvimento (`npm start`) para que as alterações sejam aplicadas.

- **Escopo das Variáveis**: As variáveis definidas no arquivo `.env` só estarão disponíveis no contexto do frontend e não no backend. Certifique-se de configurar as variáveis de ambiente adequadas também no ambiente do servidor backend, se aplicável.
