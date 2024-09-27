import {HttpClient, httpClient, urls} from '../../lib/api';

const LIMIT = 14;
const MARKET = 'stocks';

export const getStockList = ({
  searchQuery,
}: {
  searchQuery?: string;
}): HttpClient => {
  return httpClient.get(urls.getStocks, {
    params: {
      limit: LIMIT,
      market: MARKET,
      search: searchQuery,
    },
  });
};

export const getNextStockList = (url: string): HttpClient => {
  return httpClient.get(url);
};
