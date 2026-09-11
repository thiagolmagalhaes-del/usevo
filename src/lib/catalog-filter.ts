export type CatalogItem = {
  text: string;
  category: string;
};

const normalize = (value: string) => value.trim().toLocaleLowerCase();

export const matchesCatalogItem = (
  item: CatalogItem,
  query: string,
  selectedCategory: string,
) => {
  const matchesSearch = normalize(item.text).includes(normalize(query));
  const matchesCategory = normalize(selectedCategory) === "all"
    || normalize(item.category) === normalize(selectedCategory);

  return matchesSearch && matchesCategory;
};
