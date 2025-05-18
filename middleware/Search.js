import stringSimilarity from "string-similarity";
import { sort } from "./sorting.js";

const SIMILARITY_THRESHOLD = 20;

const filterByRange = (list, min, max, key) => {
  if (min !== "" && max !== "") {
    return list.filter(item => {
      return item[key] > min && item[key] < max}
    );
  }
  return list;
};

const filterByKeyword = (list, keyword) => {
  if (keyword !== "") {
    return list.filter(item => {
      const similarity = stringSimilarity.compareTwoStrings(item.title, keyword);
      console.log(similarity)
      return similarity * 100 > SIMILARITY_THRESHOLD;
    });
  }
  return list;
};

const updateViews = async (model, items) => {
  for (const item of items) {
    await model.findByIdAndUpdate(item.id, { view: item.view + 1 });
  }
};

export const Search = async (minR, maxR, minA, maxA, keyWords, lists, model1) => {
  let filteredList = lists;

  filteredList = filterByRange(filteredList, minR, maxR, 'price');
  filteredList = filterByRange(filteredList, minA, maxA, 'area');

  // sort(filteredList);

  if (keyWords !== "") {
    filteredList = filterByKeyword(filteredList, keyWords);
  }

  await updateViews(model1, filteredList);

  return filteredList;
};