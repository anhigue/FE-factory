import { UserInterface } from './UserInterface';
export interface LogInterface {
  _id?: string;
  date?: Date;
  action?: string;
  user?: UserInterface;
}
