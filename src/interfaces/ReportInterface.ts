import { UserInterface } from './UserInterface';
import { FactoryInterface } from './FactoryInterface';
import { StatusInterface } from './StatusInterface';
export interface ReportInterface {
  _id?: string;
  report: any;
  timeCreate?: Date;
  user?: UserInterface;
  factory?: FactoryInterface;
  status?: StatusInterface;
  sort?: number;
  dateInit?: Date;
  dateFinal?: Date;
}
