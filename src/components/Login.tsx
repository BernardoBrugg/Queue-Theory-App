"use client";

import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'react-toastify';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, signUp } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      if (isSignUp) {
        await signUp(email, password);
        toast.success('Conta criada com sucesso!');
        router.push('/');
      } else {
        await signIn(email, password);
        toast.success('Login realizado com sucesso!');
        router.push('/');
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast.error(error.message || 'Erro na autenticação');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[var(--bg-gradient-start)]">
      <div className="w-full max-w-md">
        {/* Card principal */}
        <div className="bg-[var(--element-bg)] border-2 border-[var(--element-border)] rounded-2xl shadow-lg p-8">
          {/* Logo e título */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-16 h-16 mb-4">
              <Image
                src="/cronAppLogo.png"
                alt="CronApp Logo"
                width={64}
                height={64}
                className="rounded-xl"
              />
            </div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-1">
              {isSignUp ? 'Criar Conta' : 'Entrar'}
            </h1>
            <p className="text-[var(--text-secondary)] text-sm">
              {isSignUp ? 'Preencha os dados abaixo' : 'Acesse sua conta'}
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo Email */}
            <div>
              <label className="block text-[var(--text-primary)] font-medium mb-2 text-sm">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-[var(--input-bg)] text-[var(--input-text)] border-2 border-[var(--input-border)] rounded-lg px-4 py-2.5 pl-10 focus:outline-none focus:border-[var(--input-focus)] focus:ring-2 focus:ring-[var(--input-focus)]/20 transition-all placeholder:text-[var(--text-muted)]"
                  placeholder="seu@email.com"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>

            {/* Campo Senha */}
            <div>
              <label className="block text-[var(--text-primary)] font-medium mb-2 text-sm">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-[var(--input-bg)] text-[var(--input-text)] border-2 border-[var(--input-border)] rounded-lg px-4 py-2.5 pl-10 pr-10 focus:outline-none focus:border-[var(--input-focus)] focus:ring-2 focus:ring-[var(--input-focus)]/20 transition-all placeholder:text-[var(--text-muted)]"
                  placeholder="Sua senha"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Botão de submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 px-4 mt-6 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Carregando...</span>
                </>
              ) : (
                <span>{isSignUp ? 'Criar Conta' : 'Entrar'}</span>
              )}
            </button>
          </form>

          {/* Divisor */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--element-border)]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-[var(--element-bg)] text-[var(--text-muted)]">ou</span>
            </div>
          </div>

          {/* Toggle entre Login e Cadastro */}
          <div className="text-center">
            <p className="text-[var(--text-secondary)] text-sm mb-2">
              {isSignUp ? 'Já tem uma conta?' : 'Não tem uma conta?'}
            </p>
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-[var(--button-bg)] font-semibold hover:text-[var(--button-hover)] transition-colors text-sm"
            >
              {isSignUp ? 'Fazer Login' : 'Criar Conta'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};