import {
  createSerializer,
  parseAsInteger,
  parseAsIsoDateTime,
  parseAsString,
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsStringLiteral,
} from "nuqs/server";

export const renderingOptions = ["server", "client"] as const;
export type RenderingOptions = (typeof renderingOptions)[number];

export const searchParams = {
  category: parseAsArrayOf(parseAsString).withDefault([]),
  q: parseAsString.withDefault(""),
  price: parseAsString,
  brand: parseAsString,
  search: parseAsString,
  limit: parseAsInteger,
  from: parseAsIsoDateTime,
  to: parseAsIsoDateTime,
  page: parseAsInteger.withDefault(1),
  renderOn: parseAsStringLiteral(renderingOptions).withDefault("server"),
  delay: parseAsInteger.withDefault(0),
  sortBy: parseAsStringLiteral(["asc", "desc"] as const),
};
export const searchParamsCache = createSearchParamsCache(searchParams);

export const serialize = createSerializer(searchParams);
