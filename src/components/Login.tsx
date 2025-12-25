"use client";

import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { toast } from 'react-toastify';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      if (isSignUp) {
        await signUp(email, password);
        toast.success('Conta criada com sucesso!');
      } else {
        await signIn(email, password);
        toast.success('Login realizado com sucesso!');
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast.error(error.message || 'Erro na autenticação');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--bg-gradient-start)] via-[var(--element-bg)] to-[var(--bg-gradient-end)] flex items-center justify-center px-4">
      <Card className="bg-[var(--element-bg)] border border-[var(--element-border)] p-8 rounded-lg shadow-sm hover:shadow-md transition-colors duration-200 w-full max-w-md">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6 text-center">
          {isSignUp ? 'Criar Conta' : 'Entrar'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[var(--text-primary)] mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-[var(--element-border)] rounded-xl bg-[var(--element-bg)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all duration-300"
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label className="block text-[var(--text-primary)] mb-2">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-[var(--element-border)] rounded-xl bg-[var(--element-bg)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all duration-300"
              placeholder="Sua senha"
            />
          </div>
          <Button type="submit" className="w-full px-6 py-3">
            {isSignUp ? 'Criar Conta' : 'Entrar'}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-[var(--accent)] hover:underline"
          >
            {isSignUp ? 'Já tem conta? Entrar' : 'Não tem conta? Criar'}
          </button>
        </div>
      </Card>
    </div>
  );
};