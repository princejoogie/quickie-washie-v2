import { GetAllVehiclesResponse } from "@qw/dto";
import { api } from "./api";

const getAll = async () => {
  const response = await api.get<GetAllVehiclesResponse>("/vehicle");
  return response.data;
};

const vehiclesService = {
  getAll,
};

export default vehiclesService;
