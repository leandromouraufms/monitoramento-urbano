# SISMONI - Sistema de Monitoramento Urbano (Bairro São Conrado - Campo Grande-MS - UFMS)

![Status do Projeto](https://img.shields.io/badge/Status-Módulo_4_Concluído-blue)
![Versão](https://img.shields.io/badge/Versão-1.2-orange)
![Node.js](https://img.shields.io/badge/Backend-Node.js_/_Express-green)
![React](https://img.shields.io/badge/Frontend-React.js-blue)
![SQLite](https://img.shields.io/badge/Database-SQLite-lightgrey)

O **SISMONI** é um sistema funcional desenvolvido para a disciplina de **Projeto Integrador II (UFMS)**. O sistema foca na fiscalização de terrenos baldios e no controle de riscos socioambientais no bairro São Conrado, em Campo Grande/MS.

---

### 🚀 Novidades da Versão 1.2 (Módulo 4)
Nesta etapa, o projeto deixou de ser apenas um protótipo visual e tornou-se uma aplicação **Full-Stack** real:

* **Integração de API:** Conexão total entre o Front-end (React) e o Banco de Dados (SQLite) via servidor Node.js/Express.
* **Segurança de Acesso:** Implementação de máscaras de CPF (`000.000.000-00`) e bloqueios de validação (mínimo 11 dígitos) para garantir a integridade dos cadastros.
* **Inteligência de Ofícios:** O sistema agora extrai dinamicamente o nome do fiscal responsável diretamente do parecer técnico gravado no banco, garantindo fidelidade documental.
* **Sanitização de Dados:** Limpeza automática de estados sensíveis (senhas e CPFs) ao trocar de telas ou realizar logout.

---

## 📑 Evolução do Projeto

### **Módulo 4: Integração Full-Stack e Regras de Negócio (Finalizado)**
* **Back-end Real:** Criação de rotas API (`/login`, `/usuarios`, `/denuncias`) para persistência de dados em tempo real.
* **Validação de Inputs:** Uso de Regex para máscaras de CPF e prevenção de erros de entrada.
* **Experiência do Usuário (UX):** Melhoria no fluxo de geração de Ofícios e feedback visual via alertas de validação.

### **Módulo 3: Persistência e Inteligência de Dados**
* **Modelagem Relacional:** Estruturação em **SQLite** com tabelas normalizadas em **3ª Forma Normal (3FN)**.
* **Suporte a Evidências:** Armazenamento de caminhos de imagens (`foto_anexo`) para fiscalização.
* **Integridade Referencial:** Uso de chaves primárias e estrangeiras para vincular usuários e denúncias.

### **Módulo 2: Interface e Experiência do Usuário (Frontend)**
* **Navegação Dinâmica (SPA):** Interface em React com estados para alternância de telas.
* **Design Responsivo:** Estilização com **Tailwind CSS**.

---

## 🛠️ Tecnologias Utilizadas

| Camada | Tecnologia |
| :--- | :--- |
| **Frontend** | React.js, Vite, Tailwind CSS |
| **Backend** | Node.js, Express.js, Cors |
| **Banco de Dados** | SQLite 3, Linguagem SQL |
| **Ferramentas** | VS Code, Git, GitHub, Postman |

---

## ⚖️ Governança e Segurança
O tratamento das informações segue a **LGPD (Lei nº 13.709/2018)**. As senhas e dados de acesso são tratados com fluxos de limpeza de cache no navegador, e o banco de dados armazena CPFs padronizados (apenas números) para máxima compatibilidade.

---

## 📁 Estrutura de Arquivos Críticos
- `/server.cjs`: Servidor Node.js que gerencia a API e o banco SQLite.
- `/database.sqlite`: Arquivo de banco de dados com a persistência real.
- `/src/App.jsx`: Lógica principal do sistema e interface React.

---

## 📦 Como executar o projeto localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/leandromouraufms/monitoramento-urbano.git