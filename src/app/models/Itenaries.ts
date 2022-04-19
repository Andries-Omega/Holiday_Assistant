export interface Itenary {
  itenaryName: string;
  itenaryTag: string;
  itenaryDate: string;
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
  holidayItenaries: Itenary[];
}

export interface AddItenarary {
  isAddingItenary: boolean;
  selectedDate: Date | null;
}

interface TimeStamp {
  seconds: number;
  nanoseconds: number;
}
