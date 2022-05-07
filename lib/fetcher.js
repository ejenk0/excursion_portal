import request from "graphql-request";

export const fetcher = (query) =>
    request("http://localhost:4000/graphql/", query);

export const fetcherWithVar = (query, vars) =>
    request("http://localhost:4000/graphql/", query, vars);
