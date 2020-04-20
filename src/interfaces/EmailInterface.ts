export interface EmailInterface {
  to: string;
  from: string | 'higueros71@gmail.com';
  subject: string;
  text: string;
  attachments?: any[];
  data: any;
}
