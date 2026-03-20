import React, { useState } from 'react'

function App() {
  // Estados para controlar a navegação
  const [telaAtual, setTelaAtual] = useState('portal') // portal, login, cadastro, sistema
  const [modoCidadao, setModoCidadao] = useState(false)
  const [abaAtiva, setAbaAtiva] = useState('painel')
  const [vistoriaAberta, setVistoriaAberta] = useState(null)
  
  // Estado para o formulário do gov.br
  const [etapaCadastro, setEtapaCadastro] = useState(1)

  // Funções de Navegação
  const irParaLogin = () => setTelaAtual('login')
  const irParaCadastro = () => { setTelaAtual('cadastro'); setEtapaCadastro(1); }
  const voltarAoPortal = () => setTelaAtual('portal')
  
  const finalizarLogin = () => {
    setTelaAtual('sistema');
    setModoCidadao(false);
    setAbaAtiva('painel');
  }

  const entrarComoCidadao = () => {
    setTelaAtual('sistema');
    setModoCidadao(true);
    setAbaAtiva('denuncia');
  }

  const fazerLogout = () => {
    setTelaAtual('portal');
    setModoCidadao(false);
    setVistoriaAberta(null);
  }

  const monitoramento = [
    { id: 1, rua: "Rua Gen. Alberto C. Mendonça", problema: "Mato Alto", gravidade: "Alta", data: "18/03" },
    { id: 2, rua: "Rua Cap. Airton P. Rebouças", problema: "Lixo Acumulado", gravidade: "Média", data: "19/03" },
    { id: 3, rua: "Rua Jandaia do Sul", problema: "Foco de Dengue", gravidade: "Crítica", data: "20/03" },
  ]

  // === 1. TELA: PORTAL DE ENTRADA (AQUELE COM OS BOTÕES GRANDES) ===
  if (telaAtual === 'portal') {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-10 rounded-2xl shadow-2xl border border-slate-100 max-w-md w-full animate-fadeIn text-center">
          <div className="h-20 w-20 bg-blue-900 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-4xl font-black shadow-lg">UF</div>
          <h1 className="text-3xl font-black text-blue-900 tracking-tight leading-none mb-2">SISMONI</h1>
          <p className="text-[10px] font-bold text-blue-700 uppercase tracking-[0.2em] mb-8">Sistema de Monitoramento Urbano</p>
          
          <div className="space-y-4">
            <button onClick={irParaLogin} className="w-full bg-blue-900 text-yellow-500 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-blue-800 transition-all shadow-md">Acesso Fiscal</button>
            <button onClick={entrarComoCidadao} className="w-full bg-white text-blue-900 border-2 border-blue-900 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-blue-50 transition-all">Denúncia Cidadã</button>
            <div className="pt-4 border-t border-slate-100">
              <button onClick={irParaCadastro} className="text-[10px] font-black text-slate-400 uppercase hover:text-blue-600 transition-colors tracking-widest">Novo Fiscal? Cadastrar via gov.br</button>
            </div>
          </div>
        </div>
        <p className="mt-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Campo Grande - Mato Grosso do Sul</p>
      </div>
    )
  }

  // === 2. TELA: LOGIN (INTERMEDIÁRIA) ===
  if (telaAtual === 'login') {
    return (
      <div className="min-h-screen bg-blue-900 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-yellow-500"></div>
          <button onClick={voltarAoPortal} className="absolute top-4 right-4 text-slate-300 hover:text-slate-600 font-bold">VOLTAR</button>
          
          <h2 className="text-2xl font-black text-blue-900 mb-6 uppercase tracking-tighter">Identificação</h2>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); finalizarLogin(); }}>
            <div>
              <label className="text-[10px] font-black text-slate-500 uppercase">Matrícula ou CPF</label>
              <input type="text" required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 ring-blue-500" placeholder="000.000.000-00" />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-500 uppercase">Senha de Acesso</label>
              <input type="password" required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 ring-blue-500" placeholder="••••••••" />
            </div>
            <button type="submit" className="w-full bg-blue-900 text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-800 transition-all shadow-lg mt-2">Autenticar no Sistema</button>
          </form>
        </div>
      </div>
    )
  }

  // === 3. TELA: CADASTRO GOV.BR (SIMULADO) ===
  if (telaAtual === 'cadastro') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200">
          <div className="bg-[#004b82] p-4 flex justify-between items-center text-white">
            <span className="font-bold text-sm tracking-tighter">gov.br</span>
            <button onClick={voltarAoPortal} className="text-xs opacity-70 hover:opacity-100">Cancelar</button>
          </div>
          
          <div className="p-8">
            {etapaCadastro === 1 ? (
              <div className="animate-fadeIn">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Crie sua conta de Agente Fiscal</h2>
                <p className="text-sm text-slate-500 mb-6">Para garantir a segurança, utilizaremos seus dados do portal único do Governo Federal.</p>
                <input type="text" className="w-full p-4 border-2 border-slate-200 rounded-lg mb-4" placeholder="Digite seu CPF" />
                <button onClick={() => setEtapaCadastro(2)} className="w-full bg-[#004b82] text-white py-3 rounded-full font-bold hover:bg-blue-800 transition-all">Continuar</button>
              </div>
            ) : (
              <div className="animate-fadeIn text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">✓</div>
                <h2 className="text-xl font-bold text-slate-800 mb-2">Identidade Confirmada!</h2>
                <p className="text-sm text-slate-500 mb-6">Seus dados foram validados junto à base da Prefeitura e UFMS. Agora você pode acessar o painel fiscal.</p>
                <button onClick={finalizarLogin} className="w-full bg-[#004b82] text-white py-3 rounded-full font-bold hover:bg-blue-800 transition-all">Concluir e Acessar</button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // === 4. TELA: SISTEMA LOGADO (PAINEL OU DENÚNCIA) ===
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col relative">
      
      {/* MODAL DE VISTORIA */}
      {vistoriaAberta && (
        <div className="fixed inset-0 bg-blue-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 animate-slideUp">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-black text-blue-900 uppercase tracking-tighter">Laudo de Vistoria Técnica</h3>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{vistoriaAberta.rua}</p>
              </div>
              <button onClick={() => setVistoriaAberta(null)} className="text-slate-300 hover:text-red-500 text-3xl leading-none">×</button>
            </div>
            <form className="space-y-4">
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                <label className="flex items-center gap-3 cursor-pointer mb-4">
                  <input type="checkbox" className="w-5 h-5 accent-blue-900" />
                  <span className="text-sm font-bold text-slate-700">Irregularidade confirmada no local?</span>
                </label>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Altura do Mato (cm)</label>
                    <input type="number" className="w-full p-2 border border-slate-200 rounded" placeholder="50" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Risco Sanitário</label>
                    <select className="w-full p-2 border border-slate-200 rounded text-xs font-bold">
                      <option>Baixo</option>
                      <option>Médio</option>
                      <option>Alto (Crítico)</option>
                    </select>
                  </div>
                </div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Parecer Técnico do Agente</label>
                <textarea className="w-full p-3 border border-slate-200 rounded-lg h-24 text-sm outline-none focus:ring-2 ring-blue-500" placeholder="Descreva as condições observadas..."></textarea>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => {alert('Vistoria salva e enviada à base de dados da UFMS/Prefeitura!'); setVistoriaAberta(null);}} className="flex-grow bg-blue-900 text-yellow-500 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-800 shadow-lg">Salvar e Notificar</button>
                <button type="button" onClick={() => setVistoriaAberta(null)} className="px-6 py-4 border border-slate-200 rounded-xl font-bold text-xs text-slate-400 uppercase hover:bg-slate-50">Sair</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* HEADER DO SISTEMA */}
      <header className="bg-blue-900 text-white p-6 shadow-xl border-b-4 border-yellow-500">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-black tracking-tighter uppercase leading-none">SISMONI</h1>
            <p className="text-[10px] font-bold text-blue-300 uppercase tracking-[0.3em] mt-1">{modoCidadao ? "Portal do Cidadão - São Conrado" : "Fiscalização em Campo - UFMS"}</p>
          </div>
          <div className="mt-6 md:mt-0 flex flex-wrap justify-center gap-2">
            {!modoCidadao && <button onClick={() => setAbaAtiva('painel')} className={`px-4 py-2 rounded-lg text-xs font-black tracking-widest transition-all ${abaAtiva === 'painel' ? 'bg-yellow-500 text-blue-900 shadow-md' : 'bg-blue-800 hover:bg-blue-700'}`}>PAINEL GERAL</button>}
            <button onClick={() => setAbaAtiva('denuncia')} className={`px-4 py-2 rounded-lg text-xs font-black tracking-widest transition-all ${abaAtiva === 'denuncia' ? 'bg-yellow-500 text-blue-900 shadow-md' : 'bg-blue-800 hover:bg-blue-700'}`}>NOVA DENÚNCIA</button>
            <button onClick={fazerLogout} className="text-[10px] bg-red-600 hover:bg-red-700 p-2 px-4 rounded-full font-black uppercase ml-2 transition-all">Sair</button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-10 flex-grow">
        {abaAtiva === 'painel' && !modoCidadao && (
          <div className="animate-fadeIn">
            {/* CARDS DE RESUMO */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white p-8 rounded-2xl shadow-sm border-l-8 border-red-500">
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Focos Críticos</p>
                <h3 className="text-4xl font-black text-slate-800">08</h3>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border-l-8 border-yellow-500">
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Em Vistoria</p>
                <h3 className="text-4xl font-black text-slate-800">14</h3>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border-l-8 border-green-500">
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Resolvidos</p>
                <h3 className="text-4xl font-black text-slate-800">27</h3>
              </div>
            </div>

            {/* MAPA E LISTA */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="bg-slate-200 rounded-3xl h-[400px] flex items-center justify-center border-4 border-white shadow-inner relative overflow-hidden group">
                <div className="absolute inset-0 bg-slate-300 opacity-20 group-hover:opacity-30 transition-all"></div>
                <div className="z-10 text-center">
                  <div className="text-4xl mb-2 animate-bounce">📍</div>
                  <p className="font-black text-slate-500 uppercase text-[10px] tracking-widest">Geolocalização - São Conrado</p>
                </div>
                {/* PONTOS FICTÍCIOS NO MAPA */}
                <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50"></div>
                <div className="absolute top-1/3 left-1/2 w-3 h-3 bg-yellow-500 rounded-full animate-pulse shadow-lg shadow-yellow-500/50"></div>
              </div>

              <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
                <h3 className="font-black text-xl text-blue-900 mb-6 border-b border-slate-50 pb-4 uppercase tracking-tighter">Ocorrências Recentes</h3>
                <div className="space-y-4">
                  {monitoramento.map(item => (
                    <div key={item.id} className="flex justify-between items-center p-4 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all">
                      <div>
                        <p className="font-black text-slate-800 text-sm tracking-tight">{item.rua}</p>
                        <div className="flex gap-2 mt-1">
                          <span className="text-[9px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-black uppercase">{item.gravidade}</span>
                          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">{item.problema}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => alert('Notificação enviada ao proprietário.')} className="text-[9px] bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-black uppercase hover:bg-blue-100">Notificar</button>
                        <button onClick={() => setVistoriaAberta(item)} className="text-[9px] bg-green-500 text-white px-4 py-2 rounded-lg font-black uppercase hover:bg-green-600 shadow-md">Vistoriar</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {abaAtiva === 'denuncia' && (
          <section className="max-w-xl mx-auto bg-white p-10 rounded-3xl shadow-2xl border border-slate-100 animate-slideUp">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-black text-blue-900 uppercase tracking-tighter leading-none">Registrar Denúncia</h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase mt-2 tracking-widest">Ação Comunitária - São Conrado</p>
            </div>
            <form className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Endereço do Terreno</label>
                <input type="text" className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-xl outline-none focus:border-blue-500 transition-all font-medium" placeholder="Ex: Rua Jandaia do Sul, 123" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Natureza do Problema</label>
                  <select className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-xl outline-none appearance-none font-bold text-sm">
                    <option>Mato Alto</option>
                    <option>Lixo Acumulado</option>
                    <option>Foco de Dengue (Água Parada)</option>
                    <option>Entulho de Construção</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Anexar Foto</label>
                  <div className="relative">
                    <input type="file" className="text-[9px] w-full p-3 bg-blue-50 text-blue-700 rounded-xl border-2 border-dashed border-blue-200 font-bold" />
                  </div>
                </div>
              </div>
              <button type="button" onClick={() => alert('Sua denúncia foi protocolada e será analisada pelos fiscais da UFMS. Obrigado!')} className="w-full bg-blue-900 text-yellow-500 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-blue-800 transition-all">Protocolar Registro Cidadão</button>
            </form>
          </section>
        )}
      </main>

      <footer className="p-10 text-center border-t bg-white mt-10">
        <p className="text-[10px] font-black text-blue-900 uppercase tracking-widest mb-1">UFMS - Agência de Educação Digital e a Distância (Agead)</p>
        <p className="text-[9px] text-slate-400 font-bold uppercase">Projeto Integrador II • Monitoramento Urbano • São Conrado, CG-MS</p>
      </footer>
    </div>
  )
}

export default App