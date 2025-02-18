import { productTypes } from "redux/slices/products.slice";
import { RECORDS_PER_PAGES } from "./constants";

export const timeSince = (date: string) => {

    date = date.split("T")[0];
    var seconds = Math.floor(((new Date(Date.now())).getTime() - (new Date(date)).getTime()) / 1000);
  
    var interval = seconds / 31536000;
  
    if (interval > 1) {
      return `${Math.floor(interval)} years ago`;
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return `${Math.floor(interval)} months ago`;
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return `${Math.floor(interval)} days ago`;
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return `${Math.floor(interval)} hours ago`;
    }
    interval = seconds / 60;
    if (interval > 1) {
      return `${Math.floor(interval)} minutes ago`;
    }
    return `${Math.floor(seconds)} seconds ago`;
}

export const calculatePagesCount = (pageSize:number, totalCount:number) => {
  // we suppose that if we have 0 items we want 1 empty page
  return totalCount < pageSize ? 1 : Math.ceil(totalCount / pageSize);
};

export const paginate = (data:productTypes[], page_number:number, page_size:number = RECORDS_PER_PAGES) => {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return data.slice((page_number - 1) * page_size, page_number * page_size);
}