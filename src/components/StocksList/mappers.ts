export type StockResponse = {
  ticker: string;
  name: string;
  market: 'stocks';
  locale: string;
  primary_exchange: string;
  type: string;
  active: boolean;
  currency_name: string;
  composite_figi: string;
  share_class_figi: string;
  last_updated_utc: Date;
};

export type Stock = {
  ticker: string;
  name: string;
  locale: string;
  market: 'stocks';
  primaryExchange: string;
  type: string;
  active: boolean;
  currencyName: string;
  lastUpdated: Date;
  compositeFigi: string;
  shareClassFigi: string;
};

export type ReferenceApiResponse = {
  results: StockResponse[];
  status: string;
  request_id: string;
  count: number;
  next_url: string;
};

export const mapStockList = (data: StockResponse[]): Stock[] => {
  return data.map(item => ({
    ticker: item.ticker,
    name: item.name,
    active: item.active,
    compositeFigi: item.composite_figi,
    currencyName: item.currency_name,
    market: item.market,
    locale: item.locale,
    primaryExchange: item.primary_exchange,
    lastUpdated: new Date(item.last_updated_utc),
    shareClassFigi: item.share_class_figi,
    type: item.type,
  }));
};
