import { ClientInterface } from './ClientInterface';
export interface ReportStoreInterface {
  _id?: string;
  id?: number;
  fabric?: any;
  salePrice?: number;
  valueWithoutIVA?: number;
  name?: string;
  description?: string;
  partNo?: string;
  price?: number;
  stock?: number;
  vehicles?: any[];
}

export interface RequestReportInterface {
  client: ClientInterface;
  password: string;
}

export interface ReportSaveInterface {
  _id?: string;
  product?: ReportStoreInterface[];
  dateConsult?: Date;
  client?: ClientInterface;
}

