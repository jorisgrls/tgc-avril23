import gql from 'graphql-tag';
import { execute } from '../jest.setup';
import { Ad } from '../src/entities/ad';
import { Category } from '../src/entities/category';
import { Tag } from '../src/entities/tag';
import { User, UserRole } from '../src/entities/user';
import getAdminContext from './helpers/getAdminContext';

describe('Ad Resolver', () => {
  it('can return a list of ads', async () => {
    const automobile = await Category.create({ name: 'automobile' }).save();
    const tag1 = await Tag.create({ name: 'tag1' }).save();
    const tag2 = await Tag.create({ name: 'tag2' }).save();

    const user1 = await User.create({
      email: 'user@test.com',
      nickname: 'user1',
      hashedPassword: 'password',
      avatar:
        'https://www.shutterstock.com/image-vector/user-icon-trendy-flat-style-260nw-418179865.jpg',
    }).save();

    await Ad.create({
      title: 'Ferrari',
      description: 'description1',
      price: 80000,
      category: automobile,
      tags: [tag1, tag2],
      picture:
        'https://img.leboncoin.fr/api/v1/lbcpb1/images/93/1a/c5/931ac53fb1e84de07b5e6d3993b7498634381c77.jpg?rule=ad-large',
      location: 'Paris',
      owner: user1,
    }).save();

    const res = await execute(gql`
      query Ads {
        ads {
          id
          title
          location
          picture
          price
          category {
            id
            name
          }
          owner {
            id
            email
            nickname
            avatar
            role
          }
          tags {
            id
            name
          }
        }
      }
    `);

    expect(res).toMatchInlineSnapshot(`
{
  "data": {
    "ads": [
      {
        "category": {
          "id": 1,
          "name": "automobile",
        },
        "id": 1,
        "location": "Paris",
        "owner": {
          "avatar": "https://www.shutterstock.com/image-vector/user-icon-trendy-flat-style-260nw-418179865.jpg",
          "email": "user@test.com",
          "id": 1,
          "nickname": "user1",
          "role": "visitor",
        },
        "picture": "https://img.leboncoin.fr/api/v1/lbcpb1/images/93/1a/c5/931ac53fb1e84de07b5e6d3993b7498634381c77.jpg?rule=ad-large",
        "price": 80000,
        "tags": [
          {
            "id": 1,
            "name": "tag1",
          },
          {
            "id": 2,
            "name": "tag2",
          },
        ],
        "title": "Ferrari",
      },
    ],
  },
}
`);
  });

  it('can create an ad', async () => {
    const cat = await Category.create({ name: 'mycat' }).save();
    const res = await execute(
      gql`
        mutation Mutation($data: NewAdInput!) {
          createAd(data: $data) {
            id
            title
            description
            location
            picture
            price
            category {
              id
              name
            }
            owner {
              id
              email
            }
          }
        }
      `,
      {
        data: {
          title: 'mon annonce',
          description: 'desc',
          picture: 'http://img.com/i.png',
          price: 42,
          location: 'Lyon',
          category: {
            id: cat.id,
          },
        },
      },
      await getAdminContext()
    );

    expect(res).toMatchInlineSnapshot(`
{
  "data": {
    "createAd": {
      "category": {
        "id": 1,
        "name": "mycat",
      },
      "description": "desc",
      "id": 1,
      "location": "Lyon",
      "owner": {
        "email": "admin@app.com",
        "id": 1,
      },
      "picture": "http://img.com/i.png",
      "price": 42,
      "title": "mon annonce",
    },
  },
}
`);
  });
});
