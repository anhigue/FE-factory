import { ClientInterface } from './ClientInterface';
import { PartInterface } from './PartInterface';
export interface SaleInterface {
  id?: number;
  date?: Date;
  dateDelivery?: Date;
  total?: number;
  client?: ClientInterface;
  products?: PartInterface[];
}
