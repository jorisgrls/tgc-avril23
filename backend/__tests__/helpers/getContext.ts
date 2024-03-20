import getJWT from './getJWT';

export default async function getContext() {
  const { JWT } = await getJWT();
  return { req: { headers: { authorization: `Bearer ${JWT}` } } };
}
