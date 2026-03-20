# SISMONI - Sistema de Monitoramento Urbano (São Conrado - Campo Grande-MS, UFMS)

Este projeto consiste em um protótipo funcional desenvolvido para a disciplina de **Projeto Integrador II**. O sistema foca na fiscalização de terrenos baldios e no controle de riscos socioambientais (como focos de Dengue) no bairro São Conrado, em Campo Grande/MS.

## 🚀 Funcionalidades Implementadas

* **Navegação Dinâmica (SPA):** A interface utiliza estados do React para que se alternem as telas sem o carregamento da página, otimizando a performance.
* **Acesso Dual:** Apresentam-se fluxos distintos para Cidadãos (denúncia anônima com envio de fotos) e Fiscais (gestão técnica).
* **Autenticação Integrada:** Simula-se o cadastro de agentes públicos através do portal **gov.br**, garantindo a identidade digital do fiscal.
* **Painel de Monitoramento:** Dashboard administrativo que exibe indicadores de focos críticos e situações em vistoria em tempo real.
* **Laudo de Vistoria Técnica:** Interface exclusiva para que agentes registrem pareceres, altura de mato e riscos sanitários diretamente do campo.
* **Design Responsivo:** A aplicação se adapta a dispositivos móveis e desktops, seguindo a filosofia *Mobile-First*.

## 🛠️ Tecnologias Utilizadas

* **React.js** - Framework Frontend para construção de interfaces componenteizadas.
* **Vite** - Ferramenta de build de alta performance.
* **Tailwind CSS** - Framework de estilização utilitária para design responsivo.
* **Hooks (useState):** Para que se gerencie o estado global da aplicação e a navegação.

## 📦 Como executar o projeto localmente

1. Clone o repositório:
   ```bash
   git clone [https://github.com/leandromouraufms/monitoramento-urbano.git](https://github.com/leandromouraufms/monitoramento-urbano.git)