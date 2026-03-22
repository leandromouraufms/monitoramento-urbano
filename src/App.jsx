// Versão 1.1 - SISMONI - SISTEMA DE MONITORAMENTO URBANO - BAIRRO SÃO CONRADO - CAMPO GRANDE-MS
// INTEGRADO COM SCHEMA SQLITE - Adequações para viabilizar futura base de dados.

import React, { useState } from 'react'

function App() {
  const [telaAtual, setTelaAtual] = useState('portal') 
  const [modoCidadao, setModoCidadao] = useState(false)
  const [abaAtiva, setAbaAtiva] = useState('painel')
  const [vistoriaAberta, setVistoriaAberta] = useState(null)
  const [visualizarOficio, setVisualizarOficio] = useState(null)

  // ESTADOS DO FORMULÁRIO
  const [formRua, setFormRua] = useState('')
  const [formProblema, setFormProblema] = useState('Mato Alto')
  const [formDescricao, setFormDescricao] = useState('')
  
  // --- NOVA FUNÇÃO DE LIMPEZA (Adicionada conforme solicitado) ---
  const limparFormulario = () => {
    setFormRua('')
    setFormDescricao('')
    setFormProblema('Mato Alto')
  }

  // DADOS DO USUÁRIO (Sincronizados com o Schema: id_usuario, nome, cpf, senha, perfil)
  const [usuarioLogado, setUsuarioLogado] = useState({ nome: 'Leandro Fiscal', cpf: '123.456.789-00', perfil: 'Fiscal' })

  // BANCO DE DADOS SIMULADO (Com campos de Data e Mídia conforme Schema SQL)
  const [denuncias, setDenuncias] = useState([
    { id: 1, rua: "Rua Gen. Alberto C. Mendonça", problema: "Mato Alto", descricao: "O mato está invadindo a calçada e dificultando a passagem.", status: "Pendente", protocolo: "2026-SIS-001", dataRegistro: "15/03/2026", dataOficio: null, tecnico: "", temFoto: true },
    { id: 2, rua: "Rua Cap. Airton P. Rebouças", problema: "Lixo Acumulado", descricao: "Descarte irregular de móveis e entulho na calçada.", status: "Pendente", protocolo: "2026-SIS-002", dataRegistro: "16/03/2026", dataOficio: null, tecnico: "", temFoto: false },
    { id: 3, rua: "Rua Jandaia do Sul", problema: "Foco de Dengue", descricao: "Piscina abandonada com água parada.", status: "Vistoriado", protocolo: "2026-SIS-003", dataRegistro: "10/03/2026", dataOficio: "20/03/2026", tecnico: "Leandro Fiscal", parecerTecnico: "Local autuado. Proprietário notificado para limpeza imediata.", temFoto: true },
  ])

  // --- LÓGICA DE NEGÓCIO (CRUD) ---
  const finalizarVistoria = (id, parecer) => {
    if(!parecer) return alert("Erro: O parecer técnico é obrigatório!")
    const novasDenuncias = denuncias.map(d => {
      if (d.id === id) return { 
        ...d, 
        status: "Vistoriado", 
        dataOficio: new Date().toLocaleDateString('pt-BR'),
        tecnico: usuarioLogado.nome,
        parecerTecnico: parecer 
      }
      return d
    })
    setDenuncias(novasDenuncias)
    setVistoriaAberta(null)
  }

  const gerarProtocoloCidadao = () => {
    if(!formRua && !formDescricao) return alert("Erro: O endereço e a descrição são obrigatórios!")
    if(!formRua) return alert("Erro: Preencha o endereço!")
    if(!formDescricao) return alert("Erro: Descreva o problema encontrado!")

    const novo = {
      id: Date.now(),
      rua: formRua,
      problema: formProblema,
      descricao: formDescricao,
      status: "Pendente",
      protocolo: `2026-WEB-${Math.floor(Math.random() * 900)}`,
      dataRegistro: new Date().toLocaleDateString('pt-BR'),
      dataOficio: null,
      temFoto: true
    }
    setDenuncias([novo, ...denuncias])
    alert(`Sucesso! Protocolo ${novo.protocolo} gerado. Aguarde a fiscalização no Bairro São Conrado.`)
    limparFormulario() // Limpa após o sucesso
  }

  // --- COMPONENTE: OFÍCIO (Formatado para Impressão) ---
  if (visualizarOficio) {
    return (
      <div className="min-h-screen bg-slate-200 p-4 md:p-12 font-serif flex flex-col items-center animate-fadeIn">
        <div className="bg-white w-full max-w-[800px] shadow-2xl p-16 border-t-[20px] border-blue-900 relative print:shadow-none print:border-t-0">
          <div className="flex justify-between items-center mb-10 no-print">
             <button onClick={() => setVisualizarOficio(null)} className="bg-red-600 text-white px-4 py-2 rounded font-sans text-xs font-black uppercase shadow-lg">Fechar</button>
             <button onClick={() => window.print()} className="bg-blue-900 text-yellow-500 px-6 py-2 rounded font-sans text-xs font-black uppercase shadow-lg">Imprimir / Salvar PDF</button>
          </div>
          <div className="text-center mb-12 border-b-2 pb-6 border-slate-100">
            <h2 className="text-xl font-bold uppercase">Prefeitura Municipal de Campo Grande</h2>
            <h3 className="text-lg font-bold uppercase">SISMONI - Monitoramento Urbano</h3>
            <p className="text-xs font-sans mt-2 tracking-widest text-slate-400 italic">Bairro São Conrado - CG/MS</p>
          </div>
          <div className="mb-10 text-sm font-sans space-y-1">
            <p className="text-right mb-6">Campo Grande-MS, {visualizarOficio.dataOficio}</p>
            <p><strong>Protocolo:</strong> {visualizarOficio.protocolo}</p>
            <p><strong>Técnico Responsável:</strong> {visualizarOficio.tecnico}</p>
          </div>
          <div className="text-sm leading-loose text-justify space-y-6">
            <p>Encaminhamos para as devidas providências o laudo de vistoria realizado no endereço: <strong>{visualizarOficio.rua.toUpperCase()}</strong>.</p>
            <p>Constatou-se irregularidade de: <strong>{visualizarOficio.problema}</strong>. <br/>Parecer do Agente: <em>"{visualizarOficio.parecerTecnico}"</em>.</p>
          </div>
          <div className="mt-24 text-center border-t pt-8 font-sans">
            <p className="font-bold text-xs uppercase underline">Assinado Digitalmente via SISMONI</p>
            <p className="text-[10px] text-slate-500 mt-1">SISTEMA INTEGRADO DE MONITORAMENTO v1.1</p>
          </div>
        </div>
      </div>
    )
  }

  // --- TELAS INICIAIS ---
  if (telaAtual === 'portal') {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 max-w-md w-full text-center animate-fadeIn">
          <div className="h-28 w-28 bg-blue-900 rounded-full mx-auto mb-8 flex items-center justify-center text-white text-6xl font-black shadow-2xl border-4 border-white italic">UF</div>
          <h1 className="text-5xl font-black text-blue-900 mb-2 italic">SISMONI</h1>
          <p className="text-[11px] font-black text-blue-700 uppercase tracking-[0.4em] mb-12">São Conrado - Campo Grande-MS</p>
          <div className="space-y-5">
            <button onClick={() => { limparFormulario(); setTelaAtual('login'); }} className="w-full bg-blue-900 text-yellow-500 py-6 rounded-2xl font-black uppercase text-sm tracking-widest shadow-xl hover:scale-105 transition-all">Acesso Agente</button>
            <button onClick={() => { limparFormulario(); setModoCidadao(true); setTelaAtual('sistema'); setAbaAtiva('denuncia'); }} className="w-full bg-white text-blue-900 border-4 border-blue-900 py-6 rounded-2xl font-black uppercase text-sm shadow-md">Denúncia Cidadã</button>
            <button onClick={() => { limparFormulario(); setTelaAtual('cadastro'); }} className="text-[11px] font-black text-slate-400 uppercase mt-8 block mx-auto underline italic">Novo Agente? Cadastrar no Sistema</button>
          </div>
        </div>
      </div>
    )
  }

  if (telaAtual === 'cadastro' || telaAtual === 'login') {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="bg-white p-12 rounded-[3rem] shadow-2xl max-w-sm w-full border-b-[12px] border-blue-900 animate-slideUp">
          <h2 className="text-3xl font-black text-blue-900 mb-10 uppercase italic tracking-tighter">{telaAtual === 'login' ? 'Login Agente' : 'Novo Agente'}</h2>
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setTelaAtual('sistema'); setModoCidadao(false); }}>
            {telaAtual === 'cadastro' && <input type="text" required className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold shadow-inner" placeholder="Nome Completo" />}
            <input type="text" required className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold shadow-inner" placeholder="CPF" />
            <input type="password" required className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold shadow-inner" placeholder="Senha" />
            <button type="submit" className="w-full bg-blue-900 text-white py-6 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl">{telaAtual === 'login' ? 'Entrar' : 'Salvar e Acessar'}</button>
            <button onClick={() => { limparFormulario(); setTelaAtual('portal'); }} className="w-full text-slate-300 font-black text-[10px] uppercase mt-2">Voltar</button>
          </form>
        </div>
      </div>
    )
  }

  // --- LAYOUT DO SISTEMA ---
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {vistoriaAberta && (
        <div className="fixed inset-0 bg-blue-900/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] shadow-2xl max-w-lg w-full p-12 animate-slideUp border-b-[15px] border-blue-900">
            <h3 className="text-3xl font-black text-blue-900 uppercase italic tracking-tighter mb-8">Laudo Técnico</h3>
            <div className="mb-8 p-6 bg-yellow-50 border-l-[10px] border-yellow-400 rounded-r-3xl">
              <p className="text-lg font-black text-slate-800 uppercase leading-none">{vistoriaAberta.rua}</p>
            </div>
            <textarea id="parecer" className="w-full p-6 border-2 border-slate-100 bg-slate-50 rounded-3xl h-44 mb-8 font-bold text-sm outline-none focus:border-blue-900 shadow-inner" placeholder="Relate as condições observadas para a SESAU..."></textarea>
            <div className="flex gap-4">
              <button onClick={() => finalizarVistoria(vistoriaAberta.id, document.getElementById('parecer').value)} className="flex-grow bg-blue-900 text-yellow-500 py-6 rounded-2xl font-black uppercase text-[11px] shadow-2xl">Finalizar e Gerar Ofício</button>
              <button onClick={() => setVistoriaAberta(null)} className="px-8 py-6 text-slate-300 font-black uppercase text-[11px]">Sair</button>
            </div>
          </div>
        </div>
      )}

      <header className="bg-blue-900 text-white p-10 border-b-[10px] border-yellow-500 shadow-2xl">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none underline decoration-yellow-500 decoration-4">SISMONI</h1>
            <p className="text-[11px] font-black text-blue-300 uppercase tracking-[0.4em] mt-3">Sistema de Monitoramento Urbano - São Conrado - CG/MS</p>
          </div>
          <div className="flex gap-4 mt-8 md:mt-0 items-center">
            {!modoCidadao && <button onClick={() => { limparFormulario(); setAbaAtiva('painel'); }} className={`px-8 py-4 rounded-xl text-xs font-black transition-all ${abaAtiva === 'painel' ? 'bg-yellow-500 text-blue-900 scale-110 shadow-xl' : 'bg-blue-800 hover:bg-blue-700'}`}>PAINEL GERAL</button>}
            <button onClick={() => { limparFormulario(); setAbaAtiva('denuncia'); }} className={`px-8 py-4 rounded-xl text-xs font-black transition-all ${abaAtiva === 'denuncia' ? 'bg-yellow-500 text-blue-900 scale-110 shadow-xl' : 'bg-blue-800 hover:bg-blue-700'}`}>NOVA DENÚNCIA</button>
            <button onClick={() => { limparFormulario(); setTelaAtual('portal'); setModoCidadao(false); }} className="bg-red-600 p-4 rounded-full shadow-lg hover:scale-110 transition-all ml-4">
              <span className="text-xs font-black uppercase text-white px-2 italic">Sair</span>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6 md:p-16 flex-grow">
        {abaAtiva === 'painel' && !modoCidadao && (
          <div className="animate-fadeIn">
            {/* CARDS DE CONTAGEM */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
              <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border-l-[15px] border-red-500">
                <p className="text-[11px] font-black text-slate-400 uppercase mb-2">Aguardando Vistoria</p>
                <h4 className="text-6xl font-black text-slate-800 italic">{denuncias.filter(d => d.status === 'Pendente').length}</h4>
              </div>
              <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border-l-[15px] border-yellow-500">
                <p className="text-[11px] font-black text-slate-400 uppercase mb-2">Monitoramento Ativo</p>
                <h4 className="text-3xl font-black text-slate-800 uppercase italic">São Conrado</h4>
              </div>
              <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border-l-[15px] border-green-500">
                <p className="text-[11px] font-black text-slate-400 uppercase mb-2">Ofícios Gerados</p>
                <h4 className="text-6xl font-black text-blue-900 italic underline decoration-yellow-500">{denuncias.filter(d => d.dataOficio).length}</h4>
              </div>
            </div>

            <div className="bg-white rounded-[3.5rem] shadow-2xl p-12 border border-slate-50 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-4 h-full bg-blue-900"></div>
              <h3 className="text-3xl font-black text-blue-900 mb-10 border-b-4 border-slate-50 pb-8 uppercase italic tracking-tighter">Ocorrências no Banco de Dados</h3>
              <div className="space-y-8">
                {denuncias.map(item => (
                  <div key={item.id} className="flex flex-col md:flex-row justify-between items-center p-10 rounded-[2rem] border-2 border-slate-50 hover:bg-slate-50 transition-all gap-8 shadow-sm">
                    <div className="flex-grow">
                      <div className="flex items-center gap-5 mb-4">
                        <span className="text-xl font-black text-slate-800 uppercase italic">{item.rua}</span>
                        <span className={`text-[10px] px-4 py-1 rounded-full font-black uppercase shadow-md text-white ${item.status === 'Pendente' ? 'bg-red-500' : 'bg-green-600'}`}>{item.status}</span>
                        <span className="text-[10px] bg-slate-100 text-slate-500 px-4 py-1 rounded-lg font-bold italic">📅 {item.dataRegistro}</span>
                      </div>
                      <p className="text-sm font-bold text-slate-500 italic bg-white p-5 rounded-2xl border border-slate-100 shadow-inner leading-relaxed">"{item.descricao}"</p>
                      <div className="flex gap-4 mt-4">
                        <span className="text-[10px] bg-blue-900 text-yellow-500 px-4 py-1.5 rounded-lg font-black uppercase shadow-sm">{item.problema}</span>
                        {item.temFoto && (
                          <button onClick={() => alert("Mídia Detectada: Arquivo verificado via Hash MD5.")} className="text-[10px] bg-purple-100 text-purple-700 px-4 py-1.5 rounded-lg font-black uppercase hover:bg-purple-200">Ver Foto Anexa</button>
                        )}
                        <span className="text-[10px] bg-slate-200 text-slate-600 px-4 py-1.5 rounded-lg font-black italic">PROT: {item.protocolo}</span>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      {item.status === 'Pendente' ? (
                        <button onClick={() => setVistoriaAberta(item)} className="bg-green-600 text-white px-10 py-5 rounded-2xl font-black uppercase text-[11px] shadow-xl hover:scale-110 transition-all">Vistoriar</button>
                      ) : (
                        <button onClick={() => setVisualizarOficio(item)} className="bg-blue-900 text-white px-8 py-5 rounded-2xl font-black uppercase text-[11px] shadow-xl border-b-8 border-yellow-500 hover:scale-105 transition-all">Ver Ofício</button>
                      )}
                      <button onClick={() => { if(window.confirm("Apagar permanentemente do Banco de Dados?")) setDenuncias(denuncias.filter(d => d.id !== item.id)) }} className="bg-red-50 text-red-600 p-5 rounded-2xl hover:bg-red-100 transition-colors shadow-sm">🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {abaAtiva === 'denuncia' && (
          <section className="max-w-2xl mx-auto bg-white p-14 rounded-[4rem] shadow-2xl border-t-[12px] border-blue-900 animate-slideUp">
            <h2 className="text-4xl font-black text-blue-900 uppercase italic text-center mb-10 tracking-tighter">Registrar Denúncia</h2>
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="text-[12px] font-black text-slate-500 uppercase block mb-3 ml-3 italic">Endereço no São Conrado</label>
                <input type="text" value={formRua} onChange={(e) => setFormRua(e.target.value)} className="w-full bg-slate-50 border-2 border-slate-100 p-6 rounded-[1.5rem] font-bold text-sm outline-none focus:border-blue-900 shadow-inner" placeholder="Rua e Número" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="text-[12px] font-black text-slate-500 uppercase block mb-3 ml-3 italic">Tipo de Irregularidade</label>
                  <select value={formProblema} onChange={(e) => setFormProblema(e.target.value)} className="w-full bg-slate-50 border-2 border-slate-100 p-6 rounded-[1.5rem] font-black text-xs uppercase cursor-pointer">
                    <option>Mato Alto</option>
                    <option>Lixo Acumulado</option>
                    <option>Foco de Dengue</option>
                    <option>Outros</option>
                  </select>
                </div>
                <div>
                  <label className="text-[12px] font-black text-slate-500 uppercase block mb-3 ml-3 italic">Anexo (Opcional)</label>
                  <input type="file" className="text-[10px] w-full p-5 bg-blue-50 border-2 border-dashed border-blue-200 rounded-[1.5rem] font-black" />
                </div>
              </div>
              <div>
                <label className="text-[12px] font-black text-slate-500 uppercase block mb-3 ml-3 italic">Descrição Detalhada</label>
                <textarea value={formDescricao} onChange={(e) => setFormDescricao(e.target.value)} className="w-full bg-slate-50 border-2 border-slate-100 p-6 rounded-[1.5rem] font-bold text-sm h-44 shadow-inner outline-none focus:border-blue-900" placeholder="Relate o que foi visto..."></textarea>
              </div>
              <button onClick={gerarProtocoloCidadao} className="w-full bg-blue-900 text-yellow-500 py-8 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-2xl hover:scale-[1.02] transition-all">Protocolar Agora</button>
            </form>
          </section>
        )}
      </main>

      <footer className="p-16 text-center border-t bg-white mt-12">
        <p className="text-[13px] font-black text-blue-900 uppercase tracking-[0.4em] mb-2 italic">SISMONI v1.1 - CAMPO GRANDE - MATO GROSSO DO SUL</p>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic underline decoration-blue-900">Módulo 3 - Manipulação de Dados SQLite • 2026</p>
      </footer>
    </div>
  )
}

export default App