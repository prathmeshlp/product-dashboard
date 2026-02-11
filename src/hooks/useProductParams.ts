import { useSearchParams } from "react-router-dom";

export const useProductParams = () => {
  const [params, setParams] = useSearchParams();

  const page = Number(params.get("page") ?? 1);
  const search = params.get("search") ?? "";
  const category = params.get("category") ?? "";

  const setPage = (value: number) => {
    params.set("page", String(value));
    setParams(params);
  };

  const setSearch = (value: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    value ? params.set("search", value) : params.delete("search");
    params.set("page", "1");
    setParams(params);
  };

  const setCategory = (value: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    value ? params.set("category", value) : params.delete("category");
    params.set("page", "1");
    setParams(params);
  };

  return {
    page,
    search,
    category,
    setPage,
    setSearch,
    setCategory,
  };
};
