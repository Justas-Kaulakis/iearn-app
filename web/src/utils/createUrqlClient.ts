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
    url: (process.env.NEXT_PUBLIC_BE_URL_BASE || "") + "/graphql",
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
            console.log("result: ", _result);  
	    cache.updateQuery({ query: IsLoggedInDocument }, () => {
                const isLoggedIn = !(_result.login as any).errors;
		console.log({isLoggedIn});
		return { isLoggedIn };
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
