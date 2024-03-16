import React, { FormEvent, useState } from 'react';
import Layout from '@/components/Layout';
import {
  useLogoutMutation,
  useProfileQuery,
  useUpdateProfileMutation,
} from '@/graphql/generated/schema';
import { useRouter } from 'next/router';
import { toast, Bounce, ToastContainer } from 'react-toastify';
import Link from 'next/link';
import AdCard from '@/components/AdCard';

export default function Profile() {
  const [imagePreviewURL, setImagePreviewURL] = useState('');
  const router = useRouter();
  const [logout] = useLogoutMutation();
  const [updateProfile] = useUpdateProfileMutation();

  const { data: currentUser, client } = useProfileQuery({
    errorPolicy: 'all',
    onError: () => {
      router.push('/login');
    },
    onCompleted: (data) => {
      setImagePreviewURL(data.profile.avatar);
    },
  });

  const onPressLogout = async () => {
    await logout();
    client.resetStore();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());

    try {
      await updateProfile({ variables: { data: { ...formJSON } } });
      toast.success('Profil mis à jour');
    } catch (err) {
    } finally {
      client.resetStore();
    }
  };

  if (!currentUser) return null;

  return (
    <Layout title="Mon compte">
      <p className="pt-6">
        Vous êtes connecté avec le compte {currentUser.profile.nickname}
      </p>

      <button
        className="btn btn-error text-white mt-4 w-full"
        onClick={onPressLogout}
      >
        Se Déconnecter
      </button>

      <form className="pt-6" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-6">Mon Profil</h2>

        {imagePreviewURL && (
          <img
            className="h-40 w-40 rounded-full"
            src={imagePreviewURL}
            alt="picture"
          />
        )}

        <div className="form-control w-full max-w-xs">
          <label className="label" htmlFor="avatar">
            <span className="label-text">Avatar</span>
          </label>
          <input
            type="url"
            name="avatar"
            id="avatar"
            required
            onChange={(e) => setImagePreviewURL(e.target.value)}
            value={imagePreviewURL}
            className="input input-bordered w-full max-w-xs"
          />
        </div>

        <div className="form-control w-full max-w-xs">
          <label className="label" htmlFor="nickname">
            <span className="label-text">Pseudo</span>
          </label>
          <input
            type="text"
            name="nickname"
            id="nickname"
            defaultValue={currentUser?.profile.nickname}
            required
            className="input input-bordered w-full max-w-xs"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary text-white mt-12 w-full"
        >
          Enregistrer
        </button>
      </form>

      <h2 className="text-2xl mb-6 mt-10">Mes annonces</h2>

      <Link href="/newAd" className="button link-button mb-6">
        <span className="mobile-short-label">Publier</span>
        <span className="desktop-long-label">Publier une annonce</span>
      </Link>

      <section className="flex flex-wrap pb-24">
        {currentUser.profile?.ads.map((ad) => (
          <AdCard key={ad.id} ad={ad} link={`/ads/${ad.id}`} />
        ))}
      </section>
    </Layout>
  );
}
