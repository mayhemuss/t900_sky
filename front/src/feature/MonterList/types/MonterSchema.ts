export interface AllMontersList {
  id: string | number
  name: string
  createdAt?: string
  updateAt?: string
}

export interface MonterSchema {
  monterList: AllMontersList[] | undefined;
  // currentMonter: string;
  isLoading: boolean;
  // dateStart: string;
  // dateEnd: string;
  error?: string | undefined;
}
