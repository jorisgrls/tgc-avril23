import AdCard from '@/components/AdCard';
import Layout from '@/components/Layout';
import { useAdsQuery } from '@/graphql/generated/schema';

export default function Home() {
  const { data } = useAdsQuery();

  return (
    <Layout title="Accueil - TGC">
      <h1 className="pt-4 pb-4 text-lg">Annonces Récentes</h1>
      {typeof data === 'undefined' ? (
        'chargement'
      ) : (
        <div data-testid="ads-list" className="flex flex-wrap">
          {data.ads.map((a) => {
            return <AdCard key={a.id} ad={a} link={`/${a.id}`} />;
          })}
        </div>
      )}
    </Layout>
  );
}
