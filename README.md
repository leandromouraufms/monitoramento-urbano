# SISMONI - Sistema de Monitoramento Urbano (São Conrado - Campo Grande/MS)

O **SISMONI** é um protótipo funcional de alta fidelidade desenvolvido para a disciplina de **Projeto Integrador II (UFMS)**. O sistema foca na fiscalização inteligente de terrenos baldios e no controle de riscos socioambientais, como focos de Dengue e descarte irregular de resíduos, especificamente no bairro São Conrado.

## 🚀 Evolução do Projeto (Módulo 3)

Nesta etapa, o projeto evoluiu de uma interface estática para uma aplicação com **modelagem de dados estruturada (SQL)** e fluxo de governança pública.

### 🏛️ Estrutura de Notificação e Conformidade
Para garantir a segurança jurídica e a proteção de dados (LGPD), o SISMONI adota o seguinte fluxo:
* **Ponte de Inteligência:** O sistema gera protocolos automáticos com coordenadas e provas visuais do foco crítico.
* **Encaminhamento Oficial:** Os dados são direcionados à base municipal, permitindo que a Prefeitura cruze as informações com o Cadastro Imobiliário (IPTU).
* **Ação In Loco:** A autoridade pública procede à notificação oficial do proprietário, garantindo a validade legal do processo.

## 🛠️ Funcionalidades Implementadas

* **Navegação Dinâmica (SPA):** Interface em React com transições fluidas e otimização de performance.
* **Acesso Dual (Cidadão/Fiscal):** Fluxos distintos para denúncias anônimas e gestão técnica de vistorias.
* **Persistência de Dados (SQL):** Modelagem de tabelas para Usuários, Denúncias e Protocolos de Exportação.
* **Painel de Monitoramento:** Dashboard administrativo com indicadores de focos críticos em tempo real.
* **Design Responsivo:** Aplicação totalmente adaptada para dispositivos móveis (*Mobile-First*).

## 💻 Tecnologias Utilizadas

* **React.js / Vite** - Framework e ferramenta de build de alta performance.
* **Tailwind CSS** - Estilização moderna e responsiva.
* **SQL (MySQL/PostgreSQL)** - Modelagem do esquema de banco de dados relacional.
* **Git/GitHub** - Controle de versão e gerenciamento do ciclo de vida do software.

## 📦 Como executar o projeto localmente

1. Clone o repositório:
   ```bash
   git clone [https://github.com/leandromouraufms/monitoramento-urbano.git](https://github.com/leandromouraufms/monitoramento-urbano.git)