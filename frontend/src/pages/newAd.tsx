import Layout from '@/components/Layout';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import {
  useCategoriesQuery,
  useCreateAdMutation,
} from '@/graphql/generated/schema';
import axios from 'axios';
import { useTagsQuery } from '@/graphql/generated/schema';
import Select from 'react-select';

export default function NewAd() {
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [tags, setTags] = useState([] as any[]);
  const router = useRouter();
  const [createAd] = useCreateAdMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());
    formJSON.category = { id: parseInt(formJSON.category, 10) };
    formJSON.price = parseFloat(formJSON.price);
    formJSON.picture = imagePreviewUrl;
    formJSON.tags = formJSON.tags.map((tag: string) => ({
      id: parseInt(tag, 10),
    }));
    await createAd({ variables: { data: formJSON } });
    alert('merci !');
    router.push('/');
  };

  const { data } = useCategoriesQuery();

  const categories = data?.categories || [];

  const { data: tagsData } = useTagsQuery();

  const options =
    tagsData?.tags.map((tag) => ({
      label: tag.name,
      value: tag.id.toString(),
    })) || [];

  return (
    <Layout title="Creation d'une annonce">
      <h1 className="pt-6 pb-6 text-2xl">Creer une annonce</h1>

      <form onSubmit={handleSubmit} className="pb-12">
        <div className="flex flex-wrap gap-6 mb-3">
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="title">
              <span className="label-text">Titre</span>
            </label>
            <input
              required
              type="text"
              minLength={5}
              name="title"
              id="title"
              placeholder="Zelda : Ocarina of time"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="picture">
              <span className="label-text">Image</span>
            </label>
            <input
              type="text"
              name="picture"
              id="picture"
              required
              placeholder="https://imageshack.com/zoot.png"
              value={imagePreviewUrl}
              onChange={(e) => setImagePreviewUrl(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
            {imagePreviewUrl && (
              <img src={imagePreviewUrl} alt="image preview" />
            )}
            <input
              accept="image/*"
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                const formData = new FormData();
                formData.append('file', file as Blob);
                axios
                  .post(
                    process.env.NEXT_PUBLIC_UPLOAD_API_ENDPOINT as string,
                    formData
                  )
                  .then((res) => setImagePreviewUrl(res.data.url));
              }}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-6 mb-3">
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="location">
              <span className="label-text">Localisation</span>
            </label>
            <input
              type="text"
              name="location"
              id="location"
              required
              placeholder="Paris"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label" htmlFor="description">
            <span className="label-text">Description</span>
          </label>
          <textarea
            rows={5}
            className="textarea textarea-bordered"
            placeholder="The Legend of Zelda: Ocarina of Time est un jeu vidéo d'action-aventure développé par Nintendo EAD et édité par Nintendo sur Nintendo 64. Ocarina of Time raconte l'histoire de Link, un jeune garçon vivant dans un village perdu dans la forêt, qui parcourt le royaume d'Hyrule pour empêcher Ganondorf d'obtenir la Triforce, une relique sacrée partagée en trois : le courage (Link), la sagesse (Zelda) et la force (Ganondorf)."
            name="description"
            id="description"
            required
          ></textarea>
        </div>

        <div className="flex flex-wrap gap-6 mb-3 mt-6">
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="price">
              <span className="label-text">Prix</span>
            </label>
            <input
              required
              type="number"
              name="price"
              id="price"
              min={0}
              placeholder="30"
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="category">
              <span className="label-text">Catégorie</span>
            </label>
            <select
              className="select select-bordered"
              id="category"
              name="category"
              required
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <Select
              isMulti
              name="colors"
              options={options}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={(e) => setTags(e as any[])}
            />
          </div>
        </div>

        <button className="btn btn-primary text-white mt-12 w-full">
          Envoyer
        </button>
      </form>
    </Layout>
  );
}
