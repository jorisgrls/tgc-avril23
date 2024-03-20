import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '@/components/unloggedPages/login';

// Mocking react-hot-toast module
jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    error: jest.fn(),
  },
}));

// Mocking next/router module
jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mocking useLoginMutation and useProfileQuery hooks
jest.mock('@/graphql/generated/schema', () => ({
  __esModule: true,
  useLoginMutation: () => [jest.fn(), { loading: false }],
  useProfileQuery: () => ({
    data: null,
    client: {
      resetStore: jest.fn(),
    },
  }),
}));

describe('LoginForm', () => {
  it('renders login form', async () => {
    const { getByText, getByPlaceholderText } = render(
      <LoginForm setAuthAction={() => {}} />
    );
    expect(getByText('Connectez-vous')).toBeInTheDocument();
    expect(
      getByText("Entrez vos identifiants pour vous connecter à l'application")
    ).toBeInTheDocument();
    expect(getByPlaceholderText('Email')).toBeInTheDocument();
    expect(getByPlaceholderText('Mot de passe')).toBeInTheDocument();
    expect(getByText('Se connecter')).toBeInTheDocument();
    expect(getByText('Pas encore de compte ?')).toBeInTheDocument();
  });

  it('displays error message on invalid credentials', async () => {
    const { getByPlaceholderText, getByText, findByText } = render(
      <LoginForm setAuthAction={() => {}} />
    );
    fireEvent.change(getByPlaceholderText('Email'), {
      target: { value: 'invalid-email' },
    });
    fireEvent.change(getByPlaceholderText('Mot de passe'), {
      target: { value: 'min' },
    });
    fireEvent.submit(getByText('Se connecter'));

    const errorMessageEmail = await findByText("L'email n'est pas valide");
    const errorMessagePassword = await findByText(
      'Le mot de passe doit contenir au moins 5 caractères'
    );

    expect(errorMessageEmail).toBeInTheDocument();
    expect(errorMessagePassword).toBeInTheDocument();
  });
});
