export const ACCESS_TOKEN_KEY = "accessToken";
export const REFRESH_TOKEN_KEY = "refreshToken";

export const VehicleTypeNames = {
  CONVERTIBLE: "Convertible",
  HATCHBACK: "Hatchback",
  MINIVAN: "Minivan",
  PICKUP_TRUCK: "Pickup truck",
  SEDAN_2_DOOR: "Sedan 2 door",
  SEDAN_4_DOOR: "Sedan 4 door",
  SPORTS_CAR: "Sports car",
  STATION_WAGON: "Station wagon",
  SUV: "SUV",
};

export type IVehicleType = keyof typeof VehicleTypeNames;

export const IAppointmentStatusNames = {
  PENDING: "Pending",
  ONGOING: "Ongoing",
  FINISHED: "Finished",
  CANCELLED: "Cancelled",
} as const;

export type IAppointmentStatus = keyof typeof IAppointmentStatusNames;

export const FilterTypeNames = {
  ALL: "All",
  ...IAppointmentStatusNames,
} as const;

export type FilterType = keyof typeof FilterTypeNames;
