import React, { useState } from 'react'

function App() {
  const [estaLogado, setEstaLogado] = useState(false)
  const [modoCidadao, setModoCidadao] = useState(false)
  const [abaAtiva, setAbaAtiva] = useState('painel')
  const [vistoriaAberta, setVistoriaAberta] = useState(null) // Controla a janela de vistoria

  const fazerLogin = () => { setEstaLogado(true); setModoCidadao(false); setAbaAtiva('painel'); }
  const entrarComoCidadao = () => { setModoCidadao(true); setEstaLogado(true); setAbaAtiva('denuncia'); }
  const fazerLogout = () => { setEstaLogado(false); setModoCidadao(false); setVistoriaAberta(null); }

  const monitoramento = [
    { id: 1, rua: "Rua Gen. Alberto C. Mendonça", problema: "Mato Alto", gravidade: "Alta", data: "18/03" },
    { id: 2, rua: "Rua Cap. Airton P. Rebouças", problema: "Lixo Acumulado", gravidade: "Média", data: "19/03" },
    { id: 3, rua: "Rua Jandaia do Sul", problema: "Foco de Dengue", gravidade: "Crítica", data: "20/03" },
  ]

  // === TELA DE LOGIN ===
  if (!estaLogado) {
    return (
      <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col items-center justify-center p-4">
        <div className="bg-white p-10 rounded-2xl shadow-2xl border border-slate-100 max-w-md w-full animate-fadeIn">
          <div className="text-center mb-8">
            <div className="h-16 w-16 bg-blue-900 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-black">UF</div>
            <h1 className="text-3xl font-black text-blue-900 tracking-tight">SISMONI - Sistema de Monitoramento Urbano</h1>
            <p className="text-xs font-light text-blue-700 uppercase tracking-widest mt-1">SÃO CONRADO • Campo Grande-MS</p>
          </div>
          <div className="space-y-4">
            <button onClick={fazerLogin} className="w-full bg-blue-900 text-yellow-500 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg">Acesso Fiscal (Login)</button>
            <div className="relative flex py-2 items-center"><div className="flex-grow border-t border-slate-200"></div><span className="mx-4 text-slate-400 text-xs uppercase font-bold">ou</span><div className="flex-grow border-t border-slate-200"></div></div>
            <button onClick={entrarComoCidadao} className="w-full bg-white text-blue-900 border-2 border-blue-900 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-blue-50 transition-all">Denúncia Cidadã</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col relative">
      
      {/* JANELA DE VISTORIA (MODAL) - Aparece apenas ao clicar em Vistoriar */}
      {vistoriaAberta && (
        <div className="fixed inset-0 bg-blue-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 animate-slideUp">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-black text-blue-900 uppercase">Laudo de Vistoria Técnica</h3>
                <p className="text-sm text-slate-500 font-bold uppercase">{vistoriaAberta.rua}</p>
              </div>
              <button onClick={() => setVistoriaAberta(null)} className="text-slate-400 hover:text-red-500 text-2xl">×</button>
            </div>
            
            <form className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <label className="flex items-center gap-3 cursor-pointer mb-3">
                  <input type="checkbox" className="w-5 h-5 accent-blue-900" />
                  <span className="text-sm font-bold text-slate-700">Problema confirmado no local?</span>
                </label>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Altura estimada do mato (cm)</label>
                <input type="number" className="w-full p-2 border border-slate-200 rounded mb-3" placeholder="Ex: 50" />
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Parecer do Agente</label>
                <textarea className="w-full p-2 border border-slate-200 rounded h-20 text-sm" placeholder="Descreva as condições encontradas..."></textarea>
              </div>
              
              <div className="flex gap-3">
                <button type="button" onClick={() => {alert('Vistoria Finalizada e Sincronizada com a UFMS!'); setVistoriaAberta(null);}} className="flex-grow bg-blue-900 text-yellow-500 py-3 rounded-xl font-black text-xs uppercase tracking-widest">Salvar Laudo</button>
                <button type="button" onClick={() => setVistoriaAberta(null)} className="px-6 py-3 border border-slate-200 rounded-xl font-bold text-xs text-slate-500 uppercase">Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header className="bg-blue-900 text-white p-6 shadow-xl border-b-4 border-yellow-500">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight uppercase tracking-tighter">SISMONI</h1>
            <p className="text-xs font-light text-blue-200 uppercase tracking-widest">{modoCidadao ? "Portal do Cidadão - São Conrado" : "Fiscalização - UFMS"}</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            {!modoCidadao && <button onClick={() => setAbaAtiva('painel')} className={`px-4 py-2 rounded-lg text-sm font-bold ${abaAtiva === 'painel' ? 'bg-yellow-500 text-blue-900' : 'bg-blue-800'}`}>PAINEL GERAL</button>}
            <button onClick={() => setAbaAtiva('denuncia')} className={`px-4 py-2 rounded-lg text-sm font-bold ${abaAtiva === 'denuncia' ? 'bg-yellow-500 text-blue-900' : 'bg-blue-800'}`}>NOVA DENÚNCIA</button>
            <button onClick={fazerLogout} className="text-xs bg-red-700 p-2 px-4 rounded-full font-bold uppercase ml-2">Sair</button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8 flex-grow">
        {abaAtiva === 'painel' && !modoCidadao && (
          <div className="animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-red-500">
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Focos Críticos</p>
                <h3 className="text-3xl font-black">08</h3>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-yellow-500">
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Em Vistoria</p>
                <h3 className="text-3xl font-black">14</h3>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border-b-4 border-green-500">
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Resolvidos</p>
                <h3 className="text-3xl font-black">27</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-slate-200 rounded-xl h-80 flex items-center justify-center border-2 border-dashed border-slate-300 relative">
                <p className="font-bold text-slate-500 uppercase text-[10px]">Mapa São Conrado (Simulado)</p>
                <div className="absolute top-1/4 left-1/3 animate-bounce">📍</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-bold text-lg mb-4 border-b pb-2">Gestão de Ocorrências</h3>
                <div className="space-y-4">
                  {monitoramento.map(item => (
                    <div key={item.id} className="flex justify-between items-center p-3 border-b last:border-0 hover:bg-slate-50">
                      <div><p className="font-bold text-sm">{item.rua}</p><p className="text-[10px] text-slate-500 uppercase font-bold">{item.problema}</p></div>
                      <div className="flex gap-2">
                        <button onClick={() => alert('Notificação enviada ao sistema do proprietário.')} className="text-[9px] bg-blue-100 text-blue-700 p-2 rounded font-black uppercase">Notificar</button>
                        <button onClick={() => setVistoriaAberta(item)} className="text-[9px] bg-green-100 text-green-700 p-2 rounded font-black uppercase">Vistoriar</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {abaAtiva === 'denuncia' && (
          <section className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-2xl border border-slate-100">
            <h2 className="text-2xl font-black text-blue-900 text-center mb-6 uppercase">Registrar Ocorrência</h2>
            <form className="space-y-5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-tighter">Local do Terreno</label>
                <input type="text" className="w-full bg-slate-50 border border-slate-200 p-3 rounded-lg outline-none" placeholder="Rua e número..." />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-tighter">Tipo de Problema</label>
                <select className="w-full bg-slate-50 border border-slate-200 p-3 rounded-lg outline-none bg-white font-bold text-sm">
                  <option>Mato Alto / Abandono</option>
                  <option>Lixo Acumulado</option>
                  <option>Foco de Dengue</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-blue-700 uppercase italic">Evidência Fotográfica</label>
                <input type="file" className="w-full text-[10px]" />
              </div>
              <button type="button" onClick={() => alert('Denúncia registrada com sucesso!')} className="w-full bg-blue-900 text-yellow-500 py-4 rounded-xl font-black text-sm uppercase tracking-widest shadow-lg">Protocolar Registro</button>
            </form>
          </section>
        )}
      </main>

      <footer className="p-8 text-center text-[10px] text-slate-400 border-t bg-white mt-10">
        <p className="font-bold text-blue-900 uppercase">UFMS - Agência de Educação Digital e a Distância (Agead)</p>
        <p className="mt-1">Projeto Integrador II • Monitoramento Urbano • v1.3</p>
      </footer>
    </div>
  )
}

export default App