import { UserInterface } from './UserInterface';
import { FactoryInterface } from './FactoryInterface';
export interface ReportInterface {
  _id?: string;
  report: any;
  timeCreate?: Date;
  user?: UserInterface;
  factory?: FactoryInterface;
  status?: boolean;
  sort?: number;
  dateInit?: Date;
  dateFinal?: Date;
}
