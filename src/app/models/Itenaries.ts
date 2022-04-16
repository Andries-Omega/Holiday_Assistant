export interface Itenaries {
  itenaryName: string;
  itenaryTage: string;
  itenaryStartTime: string;
  itenaryEndTime: string;
  costEstimate: number;
  costEstimateCurrency: string;
}
export interface Location {
  name: string;
  country: string;
  lat: number;
  lon: number;
  population: number;
  timezone: string;
  status: string;
}

export interface Holiday {
  userID: string;
  holidayName: string;
  holidayLocation: Location | null;
  holidayStartDate: Date | null;
  holidayEndDate: Date | null;
  holidayItenaries: Itenaries[] | null;
}
