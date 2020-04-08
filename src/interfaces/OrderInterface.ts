import { ClientInterface } from './ClientInterface';
import { PartInterface } from './PartInterface';
import { FactoryInterface } from './FactoryInterface';
import { StatusInterface } from './StatusInterface';

export interface OrderProductInterface {
  product?: PartInterface;
  total?: number;
  unitCost?: number;
  howMany?: number;
}

export interface OrderInterface {
  _id?: string;
  client?: ClientInterface;
  factory?: FactoryInterface;
  parts?: OrderProductInterface[];
  total?: number;
  timeDelivery?: Date;
  timeCreate?: Date;
  timeFullDelivery?: Date;
  status?: StatusInterface;
}
