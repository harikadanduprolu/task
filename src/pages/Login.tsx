import React from 'react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { LoginForm } from '../components/auth/LoginForm';

export function Login() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your account"
    >
      <LoginForm />
    </AuthLayout>
  );
}