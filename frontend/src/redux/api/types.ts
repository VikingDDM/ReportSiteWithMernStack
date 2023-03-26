// auth section
export interface GenericResponse {
    status: string;
    message: string;
  }
export interface IUser {
  name: string;
  email: string;
  role: string;
  _id: string;
  id: string;
  created_at: string;
  updated_at: string;
  __v: number;
}

// sidebar section
export interface SidebarState {
  open: boolean;
}

export interface IReportResponse {
  id: string;
  payment: string;
  project: string;
  study: string;
  extra: string;
  user: IUser;
  created_at: string;
  updated_at: string;
}

export interface IPayInfoResponse {
  id: string;
  username: string;
  category: string;
  account: string;
  created_at: string;
  updated_at: string;
}
  
export interface IUpworkInfoResponse {
  id: string;
  username: string;
  category: string;
  account: string;
  created_at: string;
  updated_at: string;
}
export interface IPcInfoResponse {
  id: string;
  username: string;
  category: string;
  account: string;
  created_at: string;
  updated_at: string;
}
export interface IVpsInfoResponse {
  id: string;
  username: string;
  category: string;
  account: string;
  created_at: string;
  updated_at: string;
}
export interface IFreelancerInfoResponse {
  id: string;
  username: string;
  category: string;
  account: string;
  created_at: string;
  updated_at: string;
}
  