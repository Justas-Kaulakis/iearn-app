import { ClientOptions, dedupExchange, Exchange } from "urql";
import { Cache, cacheExchange } from "@urql/exchange-graphcache";
import { multipartFetchExchange } from "@urql/exchange-multipart-fetch";
// @ts-ignore
import { devtoolsExchange } from "@urql/devtools";
import { IsLoggedInDocument } from "../generated/graphql";
import { pipe, tap } from "wonka";
import Router from "next/router";

export const errorExchange: Exchange =
  ({ forward }) =>
  (ops$) => {
    return pipe(
      forward(ops$),
      tap(({ error }) => {
        if (error?.message.includes("not authenticated")) {
          Router.replace("/admin/login");
        }
      })
    );
  };
const invalidateProjects = (cache: Cache) => {
  // console.log("Invalidating projects: ");
  const allFields = cache.inspectFields("Query");
  // console.log("AllFields: ", allFields);
  const fieldInfos = allFields.filter((info) => info.fieldName === "projects");
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "projects", fi.arguments);
  });
};

export const createUrqlClient = (ssrExchange: any, ctx: any): ClientOptions => {
  return {
    url: process.env.NEXT_PUBLIC_BE_URL_BASE + "/graphql",
    fetchOptions: {
      credentials: "include" as const,
    },
    exchanges: [
      devtoolsExchange,
      dedupExchange,
      cacheExchange({
        keys: {
          ProjectRes: () => null,
          ProjectsRes: () => null,
          //isLoggedIn: () => null,
        },
        updates: {
          Mutation: {
            login: (_result, args, cache, _info) => {
              cache.updateQuery({ query: IsLoggedInDocument }, () => {
                return { isLoggedIn: !(_result.login as any).errors };
              });
            },
            logout: (_result, args, cache, _info) => {
              //console.log("result: ", _result);
              cache.updateQuery({ query: IsLoggedInDocument }, () => ({
                isLoggedIn: !_result.logout,
              }));

              invalidateProjects(cache);
            },
          },
        },
      }),
      errorExchange,
      ssrExchange,
      multipartFetchExchange,
    ],
  };
};

// import { devtoolsExchange } from "@urql/devtools";
// import {
//   LogoutMutation,
//   MeQuery,
//   MeDocument,
//   LoginMutation,
//   RegisterMutation,
//   VoteMutationVariables,
//   DeletePostMutationVariables,
// } from "../generated/graphql";
// import { relayPagination } from "@urql/exchange-graphcache/extras";
// import { betterUpdateQuery } from "./betterUpdateQuery";
// import { pipe, tap } from "wonka";
// import router from "next/router";
// import { gql } from "@urql/core";
// import { isServer } from "./isServer";

/*

export const errorExchange: Exchange =
  ({ forward }) =>
  (ops$) => {
    return pipe(
      forward(ops$),
      tap(({ error }) => {
        if (error?.message.includes("not authenticated")) {
          router.replace("/login");
        }
      })
    );
  };

const cursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName, error } = info;

    if (error) console.log("Error: ", error);

    const allFields = cache.inspectFields(entityKey);
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    if (fieldInfos.length === 0) {
      return undefined;
    }

    const fieldKey = cache.keyOfField(fieldName, fieldArgs);
    const isItInTheCache = cache.resolve(
      cache.resolve({ __typename: entityKey }, fieldKey) as string,
      "posts"
    );
    //info.partial = !isItInTheCache;
    info.partial = !isItInTheCache;

    let hasMore: boolean;
    const posts: string[] = [];
    fieldInfos.forEach((fi, i) => {
      const key = cache.resolve(
        { __typename: entityKey },
        fi.fieldKey
      ) as string;
      const data = cache.resolve(key, "posts") as string[];

      hasMore = cache.resolve(key, "hasMore") as boolean;
      posts.push(...data);
    });

    return {
      __typename: "PaginatedPosts",
      hasMore,
      posts,
    };
  };
};

const invalidateAllPosts = (cache: Cache) => {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter((info) => info.fieldName === "posts");
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "posts", fi.arguments);
  });
};

*/

/*
{
        keys: {
          PaginatedPosts: () => null,
        },
        resolvers: {
          Query: {
            posts: cursorPagination(),
          },
        },
        updates: {
          Mutation: {
            deletePost: (_result, args, cache, info) => {
              cache.invalidate({
                __typename: "Post",
                id: (args as DeletePostMutationVariables).id,
              });
            },
            vote: (_result, args, cache, info) => {
              const { postId, value } = args as VoteMutationVariables;
              const data = cache.readFragment(
                gql`
                  fragment _ on Post {
                    id
                    points
                    voteStatus
                  }
                `,
                { id: postId }
              );
              if (data) {
                if (data.voteStatus === value) {
                  return;
                }
                const newPoints =
                  data.points + (!data.voteStatus ? 1 : 2) * value;
                cache.writeFragment(
                  gql`
                    fragment __ on Post {
                      points
                      voteStatus
                    }
                  `,
                  { id: postId, points: newPoints, voteStatus: value }
                );
              }
            },
            createPost: (_result, args, cache, info) => {
              invalidateAllPosts(cache);
            },
            logout: (_result, args, cache, info) => {
              betterUpdateQuery<LogoutMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                () => ({ me: null })
              );
            },
            login: (_result, args, cache, info) => {
              betterUpdateQuery<LoginMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.login.errors) {
                    return query;
                  } else {
                    return { me: result.login.user };
                  }
                }
              );
              invalidateAllPosts(cache);
            },

            register: (_result, args, cache, info) => {
              betterUpdateQuery<RegisterMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.register.errors) {
                    return query;
                  } else {
                    return {
                      me: result.register.user,
                    };
                  }
                }
              );
            },
          },
        },
      }



*/
