export interface Itenaries {
  itenaryName: string;
  itenaryTag: string;
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
  holidayID: string;
  userID: string;
  holidayName: string;
  holidayLocation: Location | null;
  holidayStartDate: string;
  holidayEndDate: string;
  holidayItenaries: Itenaries[];
}

interface TimeStamp {
  seconds: number;
  nanoseconds: number;
}
