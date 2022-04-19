export interface ListOfCurrencies {
  meta: Meta;
  data: Currencies;
}

export interface Currencies {
  [key: string]: Currency;
}

export interface Currency {
  code: string;
  value: number;
}

export interface Meta {
  last_updated_at: string;
}
