export type Commodity = 'Electricity' | 'Hydrogen' | 'Heat' | 'Gas';
export type TradeType = 'buy' | 'sell';

export interface Amount {
  value: number;
  measurement_unit: string;
}

export interface Price {
  value: number;
  currency: string;
}

export interface ResourceState {
  commodity: Commodity;
  status: 'surplus' | 'deficit';
  amount: Amount;
}

export interface Company {
  name: string;
  location: string;
  statuses: ResourceState[];
  last_active: string;
}

export interface Trade {
  id?: string;
  commodity: Commodity;
  type: TradeType;
  amount: Amount;
  price: Price;
  status: 'Pending' | 'Completed';
  time?: string;
  requester_company: string;
  fulfiller_company?: string;
}