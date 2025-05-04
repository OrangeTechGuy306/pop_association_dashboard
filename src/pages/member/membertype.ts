import { ReactNode } from "react";

 export interface memberProps {
  key: number;
  fullname: string;
  passport: ReactNode;
  mobile: string;
  ID_NO: string;
  dob: string;
  view: ReactNode;
  status: ReactNode;
}
