import React from 'react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { SignupForm } from '../components/auth/SignupForm';

export function Signup() {
  return (
    <AuthLayout
      title="Create an account"
      subtitle="Start managing your tasks effectively"
    >
      <SignupForm />
    </AuthLayout>
  );
}