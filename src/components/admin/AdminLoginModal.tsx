import React, { useState } from 'react';
import { X, Lock, Mail, ShieldAlert, ArrowRight, Sparkles } from 'lucide-react';
import { loginAdmin } from '../../services/storeStorage';
import { AdminUser } from '../../types/store';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AdminUser) => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  if (!isOpen) return null;

  const [email, setEmail] = useState('admin@belliartesanatos.com.br');
  const [password, setPassword] = useState('admin123');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    const res = loginAdmin(email, password);
    setLoading(false);

    if (res.success && res.user) {
      onLoginSuccess(res.user);
      onClose();
    } else {
      setErrorMsg(res.error || 'Credenciais inválidas.');
    }
  };

  const handleQuickFill = () => {
    setEmail('admin@belliartesanatos.com.br');
    setPassword('admin123');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-[#D9A6AE]/40 relative p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#594744] hover:text-[#B87583] rounded-full hover:bg-[#FAF6F5] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#B87583]/15 text-[#B87583] flex items-center justify-center mx-auto mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <span className="text-xs uppercase font-bold text-[#B87583] tracking-widest block">
            Acesso Restrito
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#594744]">
            Painel Administrativo /admin
          </h2>
          <p className="text-xs text-[#594744]/70 mt-1">
            Gestão comercial, estoque, pedidos e financeiro da Belli.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[11px] font-medium text-[#594744] block mb-1">E-mail Administrativo</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-2.5 rounded-xl border border-[#D9A6AE]/60 bg-[#FAF6F5] text-[#594744] focus:bg-white focus:outline-none focus:border-[#B87583]"
              />
              <Mail className="w-4 h-4 absolute left-2.5 top-2.5 text-[#B87583]" />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-medium text-[#594744] block mb-1">Senha de Acesso</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-2.5 rounded-xl border border-[#D9A6AE]/60 bg-[#FAF6F5] text-[#594744] focus:bg-white focus:outline-none focus:border-[#B87583]"
              />
              <Lock className="w-4 h-4 absolute left-2.5 top-2.5 text-[#B87583]" />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 rounded-full bg-[#594744] hover:bg-[#594744]/90 text-[#F3E5E3] font-semibold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <span>{loading ? 'Validando...' : 'Acessar Central de Gestão'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3 bg-[#FAF6F5] rounded-xl border border-[#D9A6AE]/30 text-[11px] text-[#594744]/80 flex items-center justify-between">
            <span>Acesso demo: <strong>admin@belliartesanatos.com.br</strong> / <strong>admin123</strong></span>
            <button
              type="button"
              onClick={handleQuickFill}
              className="text-[#B87583] font-bold hover:underline"
            >
              Preencher
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};