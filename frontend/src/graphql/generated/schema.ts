import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTimeISO: any;
};

export type LoginUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addUserProduct: UserProduct;
  createExample: Scalars['String'];
  createRecipe: Recipe;
  login: Scalars['String'];
  logout: Scalars['Boolean'];
  signUp: User;
  updateRecipeStatus: Recipe;
  updateUserProduct: UserProduct;
};


export type MutationAddUserProductArgs = {
  data: UserProductInput;
};


export type MutationCreateRecipeArgs = {
  data: RecipeInput;
  products: Array<RecipeProductInput>;
};


export type MutationLoginArgs = {
  data: LoginUserInput;
};


export type MutationSignUpArgs = {
  data: NewUserInput;
};


export type MutationUpdateRecipeStatusArgs = {
  id: Scalars['Float'];
  status: Scalars['String'];
};


export type MutationUpdateUserProductArgs = {
  data: UserProductInput;
};

export type NewUserInput = {
  email: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  password: Scalars['String'];
};

export type Product = {
  __typename?: 'Product';
  icon: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  unit: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  lastRecipes: Array<Recipe>;
  pendingRecipes: Array<Recipe>;
  products: Array<Product>;
  profile: User;
  recipe: Recipe;
  recipesForUser: Array<Recipe>;
  user: User;
  userRecipes: Array<Recipe>;
};


export type QueryRecipeArgs = {
  id: Scalars['Float'];
};

export type Recipe = {
  __typename?: 'Recipe';
  content: Scalars['String'];
  createdAt: Scalars['DateTimeISO'];
  description: Scalars['String'];
  difficulty: Scalars['String'];
  duration: Scalars['String'];
  id: Scalars['Int'];
  image: Scalars['String'];
  isVegetarian: Scalars['Boolean'];
  recipeProducts: Array<RecipeProduct>;
  status: Scalars['String'];
  statusReason: Scalars['String'];
  title: Scalars['String'];
  user: User;
};

export type RecipeInput = {
  content: Scalars['String'];
  description: Scalars['String'];
  difficulty: Scalars['String'];
  duration: Scalars['String'];
  image: Scalars['String'];
  isVegetarian: Scalars['Boolean'];
  title: Scalars['String'];
};

export type RecipeProduct = {
  __typename?: 'RecipeProduct';
  id: Scalars['Int'];
  product: Product;
  quantity: Scalars['Float'];
  recipe: Recipe;
};

export type RecipeProductInput = {
  productId: Scalars['Float'];
  quantity: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  firstname: Scalars['String'];
  hashedPassword: Scalars['String'];
  id: Scalars['Int'];
  lastname: Scalars['String'];
  recipes: Array<Recipe>;
  role: Scalars['String'];
  userProducts: Array<UserProduct>;
};

export type UserProduct = {
  __typename?: 'UserProduct';
  id: Scalars['Int'];
  product: Product;
  quantity: Scalars['Float'];
  user: User;
};

export type UserProductInput = {
  productId: Scalars['Float'];
  quantity: Scalars['Float'];
};

export type AddUserProductMutationVariables = Exact<{
  data: UserProductInput;
}>;


export type AddUserProductMutation = { __typename?: 'Mutation', addUserProduct: { __typename?: 'UserProduct', id: number } };

export type CreateRecipeMutationVariables = Exact<{
  products: Array<RecipeProductInput> | RecipeProductInput;
  data: RecipeInput;
}>;


export type CreateRecipeMutation = { __typename?: 'Mutation', createRecipe: { __typename?: 'Recipe', id: number } };

export type GetLastRecipesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLastRecipesQuery = { __typename?: 'Query', lastRecipes: Array<{ __typename?: 'Recipe', id: number, title: string, difficulty: string, duration: string, description: string, image: string, isVegetarian: boolean }> };

export type GetPendingRecipesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPendingRecipesQuery = { __typename?: 'Query', pendingRecipes: Array<{ __typename?: 'Recipe', id: number, status: string, title: string, description: string }> };

export type GetPossibleRecipesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPossibleRecipesQuery = { __typename?: 'Query', recipesForUser: Array<{ __typename?: 'Recipe', id: number, title: string, difficulty: string, duration: string, description: string, image: string, isVegetarian: boolean }> };

export type GetProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: number, name: string }> };

export type GetRecipeDetailsQueryVariables = Exact<{
  recipeId: Scalars['Float'];
}>;


export type GetRecipeDetailsQuery = { __typename?: 'Query', recipe: { __typename?: 'Recipe', id: number, image: string, status: string, content: string, description: string, difficulty: string, duration: string, isVegetarian: boolean, title: string, recipeProducts: Array<{ __typename?: 'RecipeProduct', id: number, quantity: number, product: { __typename?: 'Product', name: string, unit: string } }>, user: { __typename?: 'User', id: number, lastname: string, firstname: string } } };

export type GetUserProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserProductsQuery = { __typename?: 'Query', user: { __typename?: 'User', id: number, userProducts: Array<{ __typename?: 'UserProduct', id: number, quantity: number, product: { __typename?: 'Product', id: number, name: string, unit: string, icon: string } }> } };

export type GetUserRecipesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserRecipesQuery = { __typename?: 'Query', userRecipes: Array<{ __typename?: 'Recipe', id: number, title: string, status: string, statusReason: string, difficulty: string, description: string }> };

export type LoginMutationVariables = Exact<{
  data: LoginUserInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = { __typename?: 'Query', profile: { __typename?: 'User', id: number, email: string, firstname: string, lastname: string, role: string } };

export type SignupMutationVariables = Exact<{
  data: NewUserInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signUp: { __typename?: 'User', id: number, email: string, role: string } };

export type UpdateRecipeStatusMutationVariables = Exact<{
  status: Scalars['String'];
  updateRecipeStatusId: Scalars['Float'];
}>;


export type UpdateRecipeStatusMutation = { __typename?: 'Mutation', updateRecipeStatus: { __typename?: 'Recipe', id: number } };

export type UpdateUserProductMutationVariables = Exact<{
  data: UserProductInput;
}>;


export type UpdateUserProductMutation = { __typename?: 'Mutation', updateUserProduct: { __typename?: 'UserProduct', quantity: number, product: { __typename?: 'Product', id: number } } };


export const AddUserProductDocument = gql`
    mutation AddUserProduct($data: UserProductInput!) {
  addUserProduct(data: $data) {
    id
  }
}
    `;
export type AddUserProductMutationFn = Apollo.MutationFunction<AddUserProductMutation, AddUserProductMutationVariables>;

/**
 * __useAddUserProductMutation__
 *
 * To run a mutation, you first call `useAddUserProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserProductMutation, { data, loading, error }] = useAddUserProductMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddUserProductMutation(baseOptions?: Apollo.MutationHookOptions<AddUserProductMutation, AddUserProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddUserProductMutation, AddUserProductMutationVariables>(AddUserProductDocument, options);
      }
export type AddUserProductMutationHookResult = ReturnType<typeof useAddUserProductMutation>;
export type AddUserProductMutationResult = Apollo.MutationResult<AddUserProductMutation>;
export type AddUserProductMutationOptions = Apollo.BaseMutationOptions<AddUserProductMutation, AddUserProductMutationVariables>;
export const CreateRecipeDocument = gql`
    mutation createRecipe($products: [RecipeProductInput!]!, $data: RecipeInput!) {
  createRecipe(products: $products, data: $data) {
    id
  }
}
    `;
export type CreateRecipeMutationFn = Apollo.MutationFunction<CreateRecipeMutation, CreateRecipeMutationVariables>;

/**
 * __useCreateRecipeMutation__
 *
 * To run a mutation, you first call `useCreateRecipeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRecipeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRecipeMutation, { data, loading, error }] = useCreateRecipeMutation({
 *   variables: {
 *      products: // value for 'products'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateRecipeMutation(baseOptions?: Apollo.MutationHookOptions<CreateRecipeMutation, CreateRecipeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRecipeMutation, CreateRecipeMutationVariables>(CreateRecipeDocument, options);
      }
export type CreateRecipeMutationHookResult = ReturnType<typeof useCreateRecipeMutation>;
export type CreateRecipeMutationResult = Apollo.MutationResult<CreateRecipeMutation>;
export type CreateRecipeMutationOptions = Apollo.BaseMutationOptions<CreateRecipeMutation, CreateRecipeMutationVariables>;
export const GetLastRecipesDocument = gql`
    query getLastRecipes {
  lastRecipes {
    id
    title
    difficulty
    duration
    description
    image
    isVegetarian
  }
}
    `;

/**
 * __useGetLastRecipesQuery__
 *
 * To run a query within a React component, call `useGetLastRecipesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLastRecipesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLastRecipesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLastRecipesQuery(baseOptions?: Apollo.QueryHookOptions<GetLastRecipesQuery, GetLastRecipesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLastRecipesQuery, GetLastRecipesQueryVariables>(GetLastRecipesDocument, options);
      }
export function useGetLastRecipesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLastRecipesQuery, GetLastRecipesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLastRecipesQuery, GetLastRecipesQueryVariables>(GetLastRecipesDocument, options);
        }
export type GetLastRecipesQueryHookResult = ReturnType<typeof useGetLastRecipesQuery>;
export type GetLastRecipesLazyQueryHookResult = ReturnType<typeof useGetLastRecipesLazyQuery>;
export type GetLastRecipesQueryResult = Apollo.QueryResult<GetLastRecipesQuery, GetLastRecipesQueryVariables>;
export const GetPendingRecipesDocument = gql`
    query getPendingRecipes {
  pendingRecipes {
    id
    status
    title
    description
  }
}
    `;

/**
 * __useGetPendingRecipesQuery__
 *
 * To run a query within a React component, call `useGetPendingRecipesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPendingRecipesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPendingRecipesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPendingRecipesQuery(baseOptions?: Apollo.QueryHookOptions<GetPendingRecipesQuery, GetPendingRecipesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPendingRecipesQuery, GetPendingRecipesQueryVariables>(GetPendingRecipesDocument, options);
      }
export function useGetPendingRecipesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPendingRecipesQuery, GetPendingRecipesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPendingRecipesQuery, GetPendingRecipesQueryVariables>(GetPendingRecipesDocument, options);
        }
export type GetPendingRecipesQueryHookResult = ReturnType<typeof useGetPendingRecipesQuery>;
export type GetPendingRecipesLazyQueryHookResult = ReturnType<typeof useGetPendingRecipesLazyQuery>;
export type GetPendingRecipesQueryResult = Apollo.QueryResult<GetPendingRecipesQuery, GetPendingRecipesQueryVariables>;
export const GetPossibleRecipesDocument = gql`
    query getPossibleRecipes {
  recipesForUser {
    id
    title
    difficulty
    duration
    description
    image
    isVegetarian
  }
}
    `;

/**
 * __useGetPossibleRecipesQuery__
 *
 * To run a query within a React component, call `useGetPossibleRecipesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPossibleRecipesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPossibleRecipesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPossibleRecipesQuery(baseOptions?: Apollo.QueryHookOptions<GetPossibleRecipesQuery, GetPossibleRecipesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPossibleRecipesQuery, GetPossibleRecipesQueryVariables>(GetPossibleRecipesDocument, options);
      }
export function useGetPossibleRecipesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPossibleRecipesQuery, GetPossibleRecipesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPossibleRecipesQuery, GetPossibleRecipesQueryVariables>(GetPossibleRecipesDocument, options);
        }
export type GetPossibleRecipesQueryHookResult = ReturnType<typeof useGetPossibleRecipesQuery>;
export type GetPossibleRecipesLazyQueryHookResult = ReturnType<typeof useGetPossibleRecipesLazyQuery>;
export type GetPossibleRecipesQueryResult = Apollo.QueryResult<GetPossibleRecipesQuery, GetPossibleRecipesQueryVariables>;
export const GetProductsDocument = gql`
    query getProducts {
  products {
    id
    name
  }
}
    `;

/**
 * __useGetProductsQuery__
 *
 * To run a query within a React component, call `useGetProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProductsQuery(baseOptions?: Apollo.QueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
      }
export function useGetProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
        }
export type GetProductsQueryHookResult = ReturnType<typeof useGetProductsQuery>;
export type GetProductsLazyQueryHookResult = ReturnType<typeof useGetProductsLazyQuery>;
export type GetProductsQueryResult = Apollo.QueryResult<GetProductsQuery, GetProductsQueryVariables>;
export const GetRecipeDetailsDocument = gql`
    query getRecipeDetails($recipeId: Float!) {
  recipe(id: $recipeId) {
    id
    image
    status
    recipeProducts {
      id
      quantity
      product {
        name
        unit
      }
    }
    user {
      id
      lastname
      firstname
    }
    content
    description
    difficulty
    duration
    isVegetarian
    title
  }
}
    `;

/**
 * __useGetRecipeDetailsQuery__
 *
 * To run a query within a React component, call `useGetRecipeDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecipeDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecipeDetailsQuery({
 *   variables: {
 *      recipeId: // value for 'recipeId'
 *   },
 * });
 */
export function useGetRecipeDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetRecipeDetailsQuery, GetRecipeDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRecipeDetailsQuery, GetRecipeDetailsQueryVariables>(GetRecipeDetailsDocument, options);
      }
export function useGetRecipeDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRecipeDetailsQuery, GetRecipeDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRecipeDetailsQuery, GetRecipeDetailsQueryVariables>(GetRecipeDetailsDocument, options);
        }
export type GetRecipeDetailsQueryHookResult = ReturnType<typeof useGetRecipeDetailsQuery>;
export type GetRecipeDetailsLazyQueryHookResult = ReturnType<typeof useGetRecipeDetailsLazyQuery>;
export type GetRecipeDetailsQueryResult = Apollo.QueryResult<GetRecipeDetailsQuery, GetRecipeDetailsQueryVariables>;
export const GetUserProductsDocument = gql`
    query getUserProducts {
  user {
    userProducts {
      id
      quantity
      product {
        id
        name
        unit
        icon
      }
    }
    id
  }
}
    `;

/**
 * __useGetUserProductsQuery__
 *
 * To run a query within a React component, call `useGetUserProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserProductsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserProductsQuery, GetUserProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserProductsQuery, GetUserProductsQueryVariables>(GetUserProductsDocument, options);
      }
export function useGetUserProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserProductsQuery, GetUserProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserProductsQuery, GetUserProductsQueryVariables>(GetUserProductsDocument, options);
        }
export type GetUserProductsQueryHookResult = ReturnType<typeof useGetUserProductsQuery>;
export type GetUserProductsLazyQueryHookResult = ReturnType<typeof useGetUserProductsLazyQuery>;
export type GetUserProductsQueryResult = Apollo.QueryResult<GetUserProductsQuery, GetUserProductsQueryVariables>;
export const GetUserRecipesDocument = gql`
    query GetUserRecipes {
  userRecipes {
    id
    title
    status
    statusReason
    difficulty
    description
  }
}
    `;

/**
 * __useGetUserRecipesQuery__
 *
 * To run a query within a React component, call `useGetUserRecipesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserRecipesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserRecipesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserRecipesQuery(baseOptions?: Apollo.QueryHookOptions<GetUserRecipesQuery, GetUserRecipesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserRecipesQuery, GetUserRecipesQueryVariables>(GetUserRecipesDocument, options);
      }
export function useGetUserRecipesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserRecipesQuery, GetUserRecipesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserRecipesQuery, GetUserRecipesQueryVariables>(GetUserRecipesDocument, options);
        }
export type GetUserRecipesQueryHookResult = ReturnType<typeof useGetUserRecipesQuery>;
export type GetUserRecipesLazyQueryHookResult = ReturnType<typeof useGetUserRecipesLazyQuery>;
export type GetUserRecipesQueryResult = Apollo.QueryResult<GetUserRecipesQuery, GetUserRecipesQueryVariables>;
export const LoginDocument = gql`
    mutation Login($data: LoginUserInput!) {
  login(data: $data)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const ProfileDocument = gql`
    query Profile {
  profile {
    id
    email
    firstname
    lastname
    role
  }
}
    `;

/**
 * __useProfileQuery__
 *
 * To run a query within a React component, call `useProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useProfileQuery(baseOptions?: Apollo.QueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
      }
export function useProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
        }
export type ProfileQueryHookResult = ReturnType<typeof useProfileQuery>;
export type ProfileLazyQueryHookResult = ReturnType<typeof useProfileLazyQuery>;
export type ProfileQueryResult = Apollo.QueryResult<ProfileQuery, ProfileQueryVariables>;
export const SignupDocument = gql`
    mutation Signup($data: NewUserInput!) {
  signUp(data: $data) {
    id
    email
    role
  }
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const UpdateRecipeStatusDocument = gql`
    mutation UpdateRecipeStatus($status: String!, $updateRecipeStatusId: Float!) {
  updateRecipeStatus(status: $status, id: $updateRecipeStatusId) {
    id
  }
}
    `;
export type UpdateRecipeStatusMutationFn = Apollo.MutationFunction<UpdateRecipeStatusMutation, UpdateRecipeStatusMutationVariables>;

/**
 * __useUpdateRecipeStatusMutation__
 *
 * To run a mutation, you first call `useUpdateRecipeStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRecipeStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRecipeStatusMutation, { data, loading, error }] = useUpdateRecipeStatusMutation({
 *   variables: {
 *      status: // value for 'status'
 *      updateRecipeStatusId: // value for 'updateRecipeStatusId'
 *   },
 * });
 */
export function useUpdateRecipeStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRecipeStatusMutation, UpdateRecipeStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRecipeStatusMutation, UpdateRecipeStatusMutationVariables>(UpdateRecipeStatusDocument, options);
      }
export type UpdateRecipeStatusMutationHookResult = ReturnType<typeof useUpdateRecipeStatusMutation>;
export type UpdateRecipeStatusMutationResult = Apollo.MutationResult<UpdateRecipeStatusMutation>;
export type UpdateRecipeStatusMutationOptions = Apollo.BaseMutationOptions<UpdateRecipeStatusMutation, UpdateRecipeStatusMutationVariables>;
export const UpdateUserProductDocument = gql`
    mutation UpdateUserProduct($data: UserProductInput!) {
  updateUserProduct(data: $data) {
    quantity
    product {
      id
    }
  }
}
    `;
export type UpdateUserProductMutationFn = Apollo.MutationFunction<UpdateUserProductMutation, UpdateUserProductMutationVariables>;

/**
 * __useUpdateUserProductMutation__
 *
 * To run a mutation, you first call `useUpdateUserProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserProductMutation, { data, loading, error }] = useUpdateUserProductMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUserProductMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserProductMutation, UpdateUserProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserProductMutation, UpdateUserProductMutationVariables>(UpdateUserProductDocument, options);
      }
export type UpdateUserProductMutationHookResult = ReturnType<typeof useUpdateUserProductMutation>;
export type UpdateUserProductMutationResult = Apollo.MutationResult<UpdateUserProductMutation>;
export type UpdateUserProductMutationOptions = Apollo.BaseMutationOptions<UpdateUserProductMutation, UpdateUserProductMutationVariables>;