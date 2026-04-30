
import React, { useState } from 'react';
import { siteContent, SiteContent } from '../data/siteContent';

const AdminDashboard: React.FC = () => {
  const [content, setContent] = useState<SiteContent>(siteContent);
  const [activeTab, setActiveTab] = useState<'hero' | 'services' | 'about' | 'footer' | 'optimization'>('hero');
  const [copySuccess, setCopySuccess] = useState(false);

  const handleInputChange = (section: keyof SiteContent, field: string, value: any) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] as any),
        [field]: value
      }
    }));
  };

  const handleToggleChange = (field: keyof SiteContent['optimization'], value: boolean) => {
    setContent(prev => ({
      ...prev,
      optimization: {
        ...prev.optimization,
        [field]: value
      }
    }));
  };

  const handleServiceItemChange = (index: number, field: 'name' | 'description', value: string) => {
    const newItems = [...content.services.items];
    newItems[index] = { ...newItems[index], [field]: value };
    handleInputChange('services', 'items', newItems);
  };

  const handleCopyConfig = () => {
    navigator.clipboard.writeText(JSON.stringify(content, null, 2));
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gray-900 p-8 text-white flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-black uppercase italic tracking-tighter">Panel de <span className="text-amber-500">Configuración</span></h1>
              <p className="text-gray-400 mt-1">Modifica el contenido de tu página de forma intuitiva.</p>
            </div>
            <button 
              onClick={handleCopyConfig}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center gap-2 shadow-lg"
            >
              {copySuccess ? '¡COPIADO!' : 'COPIAR CONFIGURACIÓN'}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
            </button>
          </div>

          <div className="flex border-b border-gray-100 overflow-x-auto">
            {(['hero', 'services', 'about', 'footer', 'optimization'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 px-6 font-bold uppercase tracking-widest text-xs transition-all whitespace-nowrap ${activeTab === tab ? 'text-amber-500 border-b-2 border-amber-500 bg-amber-50/30' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {tab === 'optimization' ? 'Optimización' : tab}
              </button>
            ))}
          </div>

          <div className="p-8">
            {activeTab === 'hero' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Título Principal</label>
                    <input 
                      type="text" 
                      value={content.hero.title} 
                      onChange={(e) => handleInputChange('hero', 'title', e.target.value)}
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Texto del Botón</label>
                    <input 
                      type="text" 
                      value={content.hero.ctaText} 
                      onChange={(e) => handleInputChange('hero', 'ctaText', e.target.value)}
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Subtítulo</label>
                  <textarea 
                    value={content.hero.subtitle} 
                    onChange={(e) => handleInputChange('hero', 'subtitle', e.target.value)}
                    rows={3}
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Imagen de Fondo (URL)</label>
                  <input 
                    type="text" 
                    value={content.hero.backgroundImage} 
                    onChange={(e) => handleInputChange('hero', 'backgroundImage', e.target.value)}
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                  />
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Título de Sección</label>
                    <input 
                      type="text" 
                      value={content.services.title} 
                      onChange={(e) => handleInputChange('services', 'title', e.target.value)}
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">URL Multimedia (YouTube Embed)</label>
                    <input 
                      type="text" 
                      value={content.services.multimediaUrl} 
                      onChange={(e) => handleInputChange('services', 'multimediaUrl', e.target.value)}
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                    />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center text-sm">01</span>
                    Lista de Servicios
                  </h3>
                  <div className="grid gap-4">
                    {content.services.items.map((item, idx) => (
                      <div key={idx} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 grid md:grid-cols-3 gap-4">
                        <input 
                          type="text" 
                          value={item.name} 
                          placeholder="Nombre del servicio"
                          onChange={(e) => handleServiceItemChange(idx, 'name', e.target.value)}
                          className="p-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-500"
                        />
                        <input 
                          type="text" 
                          value={item.description} 
                          placeholder="Descripción corta"
                          onChange={(e) => handleServiceItemChange(idx, 'description', e.target.value)}
                          className="md:col-span-2 p-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'about' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Título Sobre Nosotros</label>
                  <input 
                    type="text" 
                    value={content.about.title} 
                    onChange={(e) => handleInputChange('about', 'title', e.target.value)}
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Descripción</label>
                  <textarea 
                    value={content.about.description} 
                    onChange={(e) => handleInputChange('about', 'description', e.target.value)}
                    rows={6}
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Imagen de Sección (URL)</label>
                  <input 
                    type="text" 
                    value={content.about.image} 
                    onChange={(e) => handleInputChange('about', 'image', e.target.value)}
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                  />
                </div>
              </div>
            )}

            {activeTab === 'footer' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Nombre de la Empresa</label>
                    <input 
                      type="text" 
                      value={content.footer.companyName} 
                      onChange={(e) => handleInputChange('footer', 'companyName', e.target.value)}
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Teléfono</label>
                    <input 
                      type="text" 
                      value={content.footer.phone} 
                      onChange={(e) => handleInputChange('footer', 'phone', e.target.value)}
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Email</label>
                    <input 
                      type="text" 
                      value={content.footer.email} 
                      onChange={(e) => handleInputChange('footer', 'email', e.target.value)}
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Dirección</label>
                    <input 
                      type="text" 
                      value={content.footer.address} 
                      onChange={(e) => handleInputChange('footer', 'address', e.target.value)}
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'optimization' && (
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Herramientas de Conversión</h3>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-bold text-gray-700">Botón Flotante WhatsApp</p>
                        <p className="text-xs text-gray-500">Activa el acceso directo a chat.</p>
                      </div>
                      <button 
                        onClick={() => handleToggleChange('whatsappFloating', !content.optimization.whatsappFloating)}
                        className={`w-12 h-6 rounded-full transition-all relative ${content.optimization.whatsappFloating ? 'bg-green-500' : 'bg-gray-300'}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${content.optimization.whatsappFloating ? 'left-7' : 'left-1'}`}></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-bold text-gray-700">Prueba Social (Toasts)</p>
                        <p className="text-xs text-gray-500">Muestra notificaciones de ventas recientes.</p>
                      </div>
                      <button 
                        onClick={() => handleToggleChange('socialProof', !content.optimization.socialProof)}
                        className={`w-12 h-6 rounded-full transition-all relative ${content.optimization.socialProof ? 'bg-amber-500' : 'bg-gray-300'}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${content.optimization.socialProof ? 'left-7' : 'left-1'}`}></div>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-gray-800 border-b pb-2">SEO y Analítica</h3>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Google Analytics ID</label>
                      <input 
                        type="text" 
                        placeholder="G-XXXXXXXXXX"
                        value={content.optimization.googleAnalyticsId} 
                        onChange={(e) => handleInputChange('optimization', 'googleAnalyticsId', e.target.value)}
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Meta Título (SEO)</label>
                      <input 
                        type="text" 
                        value={content.optimization.metaTitle} 
                        onChange={(e) => handleInputChange('optimization', 'metaTitle', e.target.value)}
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Meta Descripción (SEO)</label>
                      <textarea 
                        value={content.optimization.metaDescription} 
                        onChange={(e) => handleInputChange('optimization', 'metaDescription', e.target.value)}
                        rows={3}
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>


          <div className="bg-amber-50 p-6 border-t border-amber-100">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <p className="text-amber-900 font-bold">Instrucciones de Guardado</p>
                <p className="text-amber-800 text-sm mt-1">
                  Debido a que esta es una aplicación estática, los cambios que realices aquí son temporales para previsualización. 
                  Para hacerlos permanentes, haz clic en <strong>"COPIAR CONFIGURACIÓN"</strong> y envíame el código resultante para que yo actualice los archivos del sistema.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
