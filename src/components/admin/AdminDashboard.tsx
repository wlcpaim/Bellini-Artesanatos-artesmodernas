import React, { useState } from 'react';
import { 
  Package, ShoppingBag, DollarSign, Users, Tag, Settings, Plus, Edit2, 
  Trash2, Eye, CheckCircle2, Clock, AlertTriangle, Truck, ArrowLeft, RefreshCw, X, MessageCircle
} from 'lucide-react';
import { Product, Order, OrderStatus, StoreConfig, Coupon, AdminUser } from '../../types/store';
import { 
  getProducts, saveProduct, deleteProduct, getOrders, updateOrderStatus, 
  getStoreConfig, updateStoreConfig, getCoupons, logoutAdmin 
} from '../../services/storeStorage';

interface AdminDashboardProps {
  user: AdminUser;
  onLogout: () => void;
  onBackToStore: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout, onBackToStore }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'coupons' | 'settings'>('overview');
  const [products, setProducts] = useState<Product[]>(getProducts());
  const [orders, setOrders] = useState<Order[]>(getOrders());
  const [config, setConfig] = useState<StoreConfig>(getStoreConfig());
  const [coupons, setCoupons] = useState<Coupon[]>(getCoupons());

  // Modal para Criar/Editar Produto
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

  // Modal de Detalhe de Pedido
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);

  const refreshData = () => {
    setProducts(getProducts());
    setOrders(getOrders());
    setConfig(getStoreConfig());
    setCoupons(getCoupons());
  };

  // Métricas
  const totalRevenue = orders.reduce((acc, o) => acc + (o.status !== 'cancelado' ? o.total : 0), 0);
  const totalOrdersCount = orders.length;
  const avgTicket = totalOrdersCount > 0 ? totalRevenue / totalOrdersCount : 0;
  const lowStockCount = products.filter((p) => p.stock <= 5).length;

  const handleSaveProductForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.name || !editingProduct?.price || !editingProduct?.category) {
      alert('Preencha os campos obrigatórios (Nome, Preço e Categoria).');
      return;
    }

    saveProduct(editingProduct as any);
    setIsProductModalOpen(false);
    setEditingProduct(null);
    refreshData();
  };

  const handleDeleteProductClick = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta peça do catálogo?')) {
      deleteProduct(id);
      refreshData();
    }
  };

  const handleUpdateStatus = (orderId: string, status: OrderStatus) => {
    updateOrderStatus(orderId, status);
    refreshData();
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreConfig(config);
    alert('Configurações comerciais salvas com sucesso!');
    refreshData();
  };

  return (
    <div className="min-h-screen bg-[#FAF6F5] text-[#594744] flex flex-col">
      {/* Topo do Admin */}
      <header className="bg-[#594744] text-[#F3E5E3] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#B87583]/40">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToStore}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-2 text-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Voltar para a Loja Pública</span>
          </button>
          <div>
            <h1 className="font-serif text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>Belli Artesanatos</span>
              <span className="bg-[#B87583] text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">
                Painel 2.0
              </span>
            </h1>
            <p className="text-xs text-[#F3E5E3]/70">
              Operando como: <strong>{user.email}</strong> ({user.role})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={refreshData}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs flex items-center gap-1.5 transition-colors"
            title="Sincronizar dados"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Atualizar</span>
          </button>
          <button
            onClick={onLogout}
            className="px-3.5 py-1.5 rounded-xl bg-rose-900/60 hover:bg-rose-900 text-rose-100 text-xs font-semibold transition-colors"
          >
            Sair
          </button>
        </div>
      </header>

      {/* Navegação por Abas */}
      <div className="bg-white border-b border-[#D9A6AE]/30 px-6">
        <div className="max-w-7xl mx-auto flex gap-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-[#B87583] text-[#B87583]'
                : 'border-transparent text-[#594744]/70 hover:text-[#594744]'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Visão Geral & Indicadores</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`py-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'products'
                ? 'border-[#B87583] text-[#B87583]'
                : 'border-transparent text-[#594744]/70 hover:text-[#594744]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Produtos & Estoque ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`py-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'orders'
                ? 'border-[#B87583] text-[#B87583]'
                : 'border-transparent text-[#594744]/70 hover:text-[#594744]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Pedidos de Clientes ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('coupons')}
            className={`py-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'coupons'
                ? 'border-[#B87583] text-[#B87583]'
                : 'border-transparent text-[#594744]/70 hover:text-[#594744]'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Cupons Promocionais</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`py-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'settings'
                ? 'border-[#B87583] text-[#B87583]'
                : 'border-transparent text-[#594744]/70 hover:text-[#594744]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Configurações da Loja</span>
          </button>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-6 space-y-6">
        
        {/* TAB 1: VISÃO GERAL */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Cards de Métricas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-[#D9A6AE]/30 shadow-soft">
                <div className="flex items-center justify-between text-[#594744]/70 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Faturamento Total</span>
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                </div>
                <p className="font-serif text-2xl font-bold text-[#594744]">
                  R$ {totalRevenue.toFixed(2).replace('.', ',')}
                </p>
                <p className="text-[11px] text-emerald-700 font-medium mt-1">
                  Pedidos ativos e faturados
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#D9A6AE]/30 shadow-soft">
                <div className="flex items-center justify-between text-[#594744]/70 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Total de Pedidos</span>
                  <ShoppingBag className="w-5 h-5 text-[#B87583]" />
                </div>
                <p className="font-serif text-2xl font-bold text-[#594744]">{totalOrdersCount}</p>
                <p className="text-[11px] text-[#594744]/70 mt-1">Realizados na plataforma</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#D9A6AE]/30 shadow-soft">
                <div className="flex items-center justify-between text-[#594744]/70 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Ticket Médio</span>
                  <DollarSign className="w-5 h-5 text-indigo-600" />
                </div>
                <p className="font-serif text-2xl font-bold text-[#594744]">
                  R$ {avgTicket.toFixed(2).replace('.', ',')}
                </p>
                <p className="text-[11px] text-[#594744]/70 mt-1">Por compra concluída</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#D9A6AE]/30 shadow-soft">
                <div className="flex items-center justify-between text-[#594744]/70 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Estoque Baixo</span>
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>
                <p className="font-serif text-2xl font-bold text-[#594744]">{lowStockCount}</p>
                <p className="text-[11px] text-amber-700 font-medium mt-1">
                  Peças com ≤ 5 unidades
                </p>
              </div>
            </div>

            {/* Pedidos Recentes & Atalhos */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-[#D9A6AE]/30 shadow-soft">
                <h3 className="font-serif text-base font-bold text-[#594744] mb-4">
                  Últimos Pedidos Recebidos
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#D9A6AE]/30 text-[#594744]/60">
                        <th className="pb-3">Pedido</th>
                        <th className="pb-3">Cliente</th>
                        <th className="pb-3">Total</th>
                        <th className="pb-3">Pagamento</th>
                        <th className="pb-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#D9A6AE]/20">
                      {orders.slice(0, 5).map((o) => (
                        <tr key={o.id} className="hover:bg-[#FAF6F5]/50">
                          <td className="py-3 font-semibold text-[#B87583]">{o.orderNumber}</td>
                          <td className="py-3">{o.customerName}</td>
                          <td className="py-3 font-bold">R$ {o.total.toFixed(2).replace('.', ',')}</td>
                          <td className="py-3 uppercase text-[10px]">{o.paymentMethod}</td>
                          <td className="py-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              o.status === 'enviado' ? 'bg-indigo-100 text-indigo-700' :
                              o.status === 'producao' ? 'bg-amber-100 text-amber-700' :
                              o.status === 'pago' ? 'bg-emerald-100 text-emerald-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {o.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-[#D9A6AE]/30 shadow-soft space-y-4">
                <h3 className="font-serif text-base font-bold text-[#594744]">
                  Ações Rápidas
                </h3>
                <button
                  onClick={() => {
                    setEditingProduct({
                      name: '',
                      price: 0,
                      stock: 10,
                      category: 'croche',
                      description: '',
                      images: ['https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80'],
                    });
                    setIsProductModalOpen(true);
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-[#B87583] hover:bg-[#B87583]/90 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Cadastrar Novo Produto</span>
                </button>

                <div className="p-4 bg-[#FAF6F5] rounded-xl border border-[#D9A6AE]/30 space-y-2 text-xs">
                  <p className="font-bold text-[#594744]">Sincronização em Tempo Real</p>
                  <p className="text-[#594744]/75 text-[11px] leading-relaxed">
                    Toda alteração de estoque, novos produtos cadastrados ou mudança de status de pedido reflete imediatamente no catálogo público da Belli Artesanatos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUTOS (CRUD COMPLETO) */}
        {activeTab === 'products' && (
          <div className="bg-white p-6 rounded-2xl border border-[#D9A6AE]/30 shadow-soft space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#594744]">Catálogo de Peças</h2>
                <p className="text-xs text-[#594744]/70">Gerencie fotos, preços, promoções e estoque.</p>
              </div>

              <button
                onClick={() => {
                  setEditingProduct({
                    name: '',
                    price: 0,
                    stock: 10,
                    category: 'croche',
                    description: '',
                    images: ['https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80'],
                  });
                  setIsProductModalOpen(true);
                }}
                className="py-2.5 px-4 rounded-xl bg-[#B87583] hover:bg-[#B87583]/90 text-white font-semibold text-xs flex items-center gap-2 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Adicionar Peça</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#D9A6AE]/30 text-[#594744]/60">
                    <th className="pb-3">Foto</th>
                    <th className="pb-3">Nome da Peça</th>
                    <th className="pb-3">Categoria</th>
                    <th className="pb-3">Preço</th>
                    <th className="pb-3">Estoque</th>
                    <th className="pb-3">Destaque</th>
                    <th className="pb-3 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D9A6AE]/20">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-[#FAF6F5]/50">
                      <td className="py-3">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-12 h-12 rounded-lg object-cover border border-[#D9A6AE]/30"
                        />
                      </td>
                      <td className="py-3 font-semibold text-[#594744] max-w-xs">{p.name}</td>
                      <td className="py-3 uppercase text-[10px] text-[#B87583] font-bold">{p.categoryName}</td>
                      <td className="py-3 font-bold text-[#594744]">R$ {p.price.toFixed(2).replace('.', ',')}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          p.stock > 5 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {p.stock} un
                        </span>
                      </td>
                      <td className="py-3">
                        {p.featured ? (
                          <span className="text-emerald-600 font-bold">Sim</span>
                        ) : (
                          <span className="text-gray-400">Não</span>
                        )}
                      </td>
                      <td className="py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditingProduct(p);
                              setIsProductModalOpen(true);
                            }}
                            className="p-1.5 text-[#594744] hover:text-[#B87583] hover:bg-[#FAF6F5] rounded-lg"
                            title="Editar"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProductClick(p.id)}
                            className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                            title="Excluir"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: PEDIDOS */}
        {activeTab === 'orders' && (
          <div className="bg-white p-6 rounded-2xl border border-[#D9A6AE]/30 shadow-soft space-y-6">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#594744]">Gestão de Pedidos</h2>
              <p className="text-xs text-[#594744]/70">Acompanhe e altere o status de produção e envio dos clientes.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#D9A6AE]/30 text-[#594744]/60">
                    <th className="pb-3">Nº Pedido</th>
                    <th className="pb-3">Data</th>
                    <th className="pb-3">Cliente</th>
                    <th className="pb-3">WhatsApp</th>
                    <th className="pb-3">Total</th>
                    <th className="pb-3">Status Atual</th>
                    <th className="pb-3 text-right">Alterar Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D9A6AE]/20">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-[#FAF6F5]/50">
                      <td className="py-3 font-semibold text-[#B87583]">{o.orderNumber}</td>
                      <td className="py-3 text-[11px] text-[#594744]/70">
                        {new Date(o.createdAt).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="py-3 font-medium">{o.customerName}</td>
                      <td className="py-3">
                        <a
                          href={`https://wa.me/55${o.customerPhone.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-700 hover:underline flex items-center gap-1"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>{o.customerPhone}</span>
                        </a>
                      </td>
                      <td className="py-3 font-bold text-[#594744]">R$ {o.total.toFixed(2).replace('.', ',')}</td>
                      <td className="py-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          o.status === 'enviado' ? 'bg-indigo-100 text-indigo-700' :
                          o.status === 'producao' ? 'bg-amber-100 text-amber-700' :
                          o.status === 'pago' ? 'bg-emerald-100 text-emerald-700' :
                          o.status === 'entregue' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <select
                          value={o.status}
                          onChange={(e) => handleUpdateStatus(o.id, e.target.value as OrderStatus)}
                          className="text-xs bg-[#FAF6F5] border border-[#D9A6AE]/50 rounded-lg px-2 py-1 text-[#594744]"
                        >
                          <option value="pendente">Pendente</option>
                          <option value="pago">Pago</option>
                          <option value="producao">Em Produção</option>
                          <option value="enviado">Enviado</option>
                          <option value="entregue">Entregue</option>
                          <option value="cancelado">Cancelado</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: CUPONS */}
        {activeTab === 'coupons' && (
          <div className="bg-white p-6 rounded-2xl border border-[#D9A6AE]/30 shadow-soft space-y-6">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#594744]">Cupons de Desconto</h2>
              <p className="text-xs text-[#594744]/70">Códigos ativos para campanhas promocionais.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {coupons.map((c) => (
                <div key={c.code} className="p-4 rounded-xl border border-[#D9A6AE]/40 bg-[#FAF6F5] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-bold text-[#B87583]">{c.code}</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      {c.active ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>
                  <p className="text-xl font-bold font-serif text-[#594744]">{c.discountPercentage}% OFF</p>
                  <p className="text-xs text-[#594744]/70">
                    Pedido mínimo: R$ {c.minOrderValue.toFixed(2).replace('.', ',')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: CONFIGURAÇÕES */}
        {activeTab === 'settings' && (
          <div className="bg-white p-6 rounded-2xl border border-[#D9A6AE]/30 shadow-soft space-y-6 max-w-2xl">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#594744]">Configurações da Loja</h2>
              <p className="text-xs text-[#594744]/70">Ajuste dados de contato, frete e chave PIX.</p>
            </div>

            <form onSubmit={handleSaveConfig} className="space-y-4 text-xs">
              <div>
                <label className="font-medium text-[#594744] block mb-1">Nome da Loja</label>
                <input
                  type="text"
                  value={config.storeName}
                  onChange={(e) => setConfig({ ...config, storeName: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#D9A6AE]/50 bg-[#FAF6F5]"
                />
              </div>

              <div>
                <label className="font-medium text-[#594744] block mb-1">Slogan</label>
                <input
                  type="text"
                  value={config.slogan}
                  onChange={(e) => setConfig({ ...config, slogan: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#D9A6AE]/50 bg-[#FAF6F5]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-medium text-[#594744] block mb-1">WhatsApp Comercial</label>
                  <input
                    type="text"
                    value={config.whatsapp}
                    onChange={(e) => setConfig({ ...config, whatsapp: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#D9A6AE]/50 bg-[#FAF6F5]"
                  />
                </div>
                <div>
                  <label className="font-medium text-[#594744] block mb-1">Instagram</label>
                  <input
                    type="text"
                    value={config.instagram}
                    onChange={(e) => setConfig({ ...config, instagram: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#D9A6AE]/50 bg-[#FAF6F5]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-medium text-[#594744] block mb-1">Chave PIX</label>
                  <input
                    type="text"
                    value={config.pixKey}
                    onChange={(e) => setConfig({ ...config, pixKey: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#D9A6AE]/50 bg-[#FAF6F5]"
                  />
                </div>
                <div>
                  <label className="font-medium text-[#594744] block mb-1">Valor Mínimo para Frete Grátis (R$)</label>
                  <input
                    type="number"
                    value={config.freeShippingMin}
                    onChange={(e) => setConfig({ ...config, freeShippingMin: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-[#D9A6AE]/50 bg-[#FAF6F5]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="py-2.5 px-6 rounded-full bg-[#B87583] text-white font-semibold hover:bg-[#B87583]/90 shadow-sm"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        )}

      </main>

      {/* MODAL CRIAR/EDITAR PRODUTO */}
      {isProductModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#D9A6AE]/40 relative p-6 sm:p-8">
            <button
              onClick={() => { setIsProductModalOpen(false); setEditingProduct(null); }}
              className="absolute top-4 right-4 p-2 text-[#594744] hover:text-[#B87583] rounded-full hover:bg-[#FAF6F5]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-xl font-bold text-[#594744] mb-4">
              {editingProduct.id ? 'Editar Peça Artesanal' : 'Nova Peça no Catálogo'}
            </h3>

            <form onSubmit={handleSaveProductForm} className="space-y-4 text-xs">
              <div>
                <label className="font-medium block mb-1">Nome da Peça *</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  placeholder="Ex: Manta Aconchego em Crochê"
                  className="w-full p-2.5 rounded-xl border border-[#D9A6AE]/50 bg-[#FAF6F5]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-medium block mb-1">Categoria *</label>
                  <select
                    value={editingProduct.category || 'croche'}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-[#D9A6AE]/50 bg-[#FAF6F5]"
                  >
                    <option value="croche">Crochê</option>
                    <option value="amigurumi">Amigurumi</option>
                    <option value="buques">Buquês Artesanais</option>
                    <option value="macrame">Macramê</option>
                    <option value="velas">Velas Aromáticas</option>
                    <option value="bolsas">Bolsas</option>
                    <option value="decoracao">Decoração</option>
                    <option value="lembrancinhas">Lembrancinhas</option>
                  </select>
                </div>

                <div>
                  <label className="font-medium block mb-1">Estoque Disponível *</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.stock || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-[#D9A6AE]/50 bg-[#FAF6F5]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-medium block mb-1">Preço Atual (R$) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={editingProduct.price || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-[#D9A6AE]/50 bg-[#FAF6F5]"
                  />
                </div>

                <div>
                  <label className="font-medium block mb-1">Preço De / Original (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingProduct.originalPrice || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, originalPrice: e.target.value ? Number(e.target.value) : undefined })}
                    placeholder="Opcional para promoção"
                    className="w-full p-2.5 rounded-xl border border-[#D9A6AE]/50 bg-[#FAF6F5]"
                  />
                </div>
              </div>

              <div>
                <label className="font-medium block mb-1">URL da Imagem Principal</label>
                <input
                  type="text"
                  value={editingProduct.images?.[0] || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, images: [e.target.value] })}
                  placeholder="https://..."
                  className="w-full p-2.5 rounded-xl border border-[#D9A6AE]/50 bg-[#FAF6F5]"
                />
              </div>

              <div>
                <label className="font-medium block mb-1">Descrição Detalhada</label>
                <textarea
                  rows={3}
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#D9A6AE]/50 bg-[#FAF6F5]"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featuredCheck"
                  checked={Boolean(editingProduct.featured)}
                  onChange={(e) => setEditingProduct({ ...editingProduct, featured: e.target.checked })}
                  className="rounded text-[#B87583]"
                />
                <label htmlFor="featuredCheck" className="font-medium cursor-pointer">
                  Destacar na página inicial da loja
                </label>
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-full bg-[#B87583] text-white font-semibold hover:bg-[#B87583]/90 shadow-sm"
                >
                  Salvar Peça no Banco
                </button>
                <button
                  type="button"
                  onClick={() => { setIsProductModalOpen(false); setEditingProduct(null); }}
                  className="px-6 py-3 rounded-full bg-gray-100 text-[#594744] font-semibold hover:bg-gray-200"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};