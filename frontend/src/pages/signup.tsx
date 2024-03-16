import React, { FormEvent } from 'react';
import Layout from '@/components/Layout';
import {
  useLoginMutation,
  useSignupMutation,
} from '@/graphql/generated/schema';
import { useRouter } from 'next/router';

export default function SignUp() {
  const router = useRouter();
  const [loginUser] = useLoginMutation();

  const [signupUser] = useSignupMutation();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());
    await signupUser({ variables: { data: formJSON } });
    await loginUser({
      variables: {
        data: { email: formJSON.email, password: formJSON.password },
      },
    });
    router.push('/login');
  };

  return (
    <Layout title="Créer un compte">
      <h1 className="text-xl pt-4 pb-4">S'inscrire</h1>
      <form onSubmit={handleSubmit} className="pb-12">
        <div className="flex flex-wrap gap-6 mb-3">
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="email">
              <span className="label-text">Email</span>
            </label>
            <input
              data-testid="signup-email"
              required
              type="text"
              minLength={3}
              name="email"
              id="email"
              placeholder="email@example.com"
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          <div className="flex flex-wrap gap-6 mb-3">
            <div className="form-control w-full max-w-xs">
              <label className="label" htmlFor="nickname">
                <span className="label-text">Nom d'utilisateur</span>
              </label>
              <input
                data-testid="signup-nickname"
                required
                type="text"
                minLength={3}
                name="nickname"
                id="nickname"
                placeholder="johndoe"
                className="input input-bordered w-full max-w-xs"
              />
            </div>

            <div className="flex flex-wrap gap-6 mb-3">
              <div className="form-control w-full max-w-xs">
                <label className="label" htmlFor="password">
                  <span className="label-text">Mot de passe</span>
                </label>
                <input
                  data-testid="signup-password"
                  required
                  type="password"
                  minLength={8}
                  name="password"
                  id="password"
                  placeholder="********"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>

              <button className="btn btn-primary text-white mt-12 w-full">
                Creer mon compte
              </button>
            </div>
          </div>
        </div>
      </form>
    </Layout>
  );
}
