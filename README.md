# 📊 Dashboard Financeiro

Este é um aplicativo web de Dashboard Financeiro para visualização de balanços de empresas. Ele permite analisar **receitas e despesas** por meio de **cards resumidos** e um **gráfico interativo**, com filtros personalizáveis para facilitar a análise.

## 🚀 Acesso rápido

🔗 [Acesse a aplicação em produção](https://dashboard-financeiro-mu.vercel.app/)

---

## 🔐 Login

Para acessar o sistema, utilize as seguintes credenciais:

* **Email**: `test@mail.com`
* **Senha**: `123456`

---

## 🧭 Funcionalidades

### Página de Login

* Validação de credenciais
* Redirecionamento para o dashboard após login
* Toasts de sucesso e erro

### Página de Dashboard

* Visualização de **receitas e despesas** em **cards** por empresa
* Visualização gráfica das transações
* Filtros disponíveis:

  * **Empresa**
  * **Estado**
  * **Data**
  * **Área de atuação**
* Botões:

  * **Home** (sem funcionalidade no momento)
  * **Logout** (remove o login e retorna à tela inicial)

---

## 🛠️ Como rodar localmente

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```

2. Instale as dependências:
    
    ```bash
    npm install
    ```

3. Inicie o servidor de desenvolvimento:
   
    ```bash
    npm run dev
    ```

4. Acesse no navegador: http://localhost:3000

## 📁 Estrutura de páginas
- / → Página de login

- /dashboard → Página principal do sistema com visualização e filtros

## 🧪 Tecnologias utilizadas

- Next.js;

- Styled Components;

- React Hook Form;

- MUI (Material UI);

- React Toastify;

- TypeScript;

## 📌 Observações
- Os dados são carregados de um arquivo local (/transactions.json)

- A autenticação é baseada em localStorage

- O projeto ainda está em desenvolvimento e pode receber novas funcionalidades

## 🧑‍💻 Autor
Feito com 💻 por Rafanfos