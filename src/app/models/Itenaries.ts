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

export interface Trip {
  tripID: string;
  userID: string;
  tripName: string;
  tripLocation: Location | null;
  tripStartDate: string;
  tripEndDate: string;
  tripItenaries: Itenary[];
}

export interface AddItenarary {
  isAddingItenary: boolean;
  selectedDate: Date | null;
}

interface TimeStamp {
  seconds: number;
  nanoseconds: number;
}
