import {
  GetAllVehiclesResponse,
  CreateVehicleBody,
  CreateVehicleResponse,
  DeleteVehicleParams,
  DeleteVehicleResponse,
} from "@qw/dto";
import { api } from "./api";

const getAll = async () => {
  const response = await api.get<GetAllVehiclesResponse>("/vehicle");
  return response.data;
};

const create = async (body: CreateVehicleBody) => {
  const response = await api.post<CreateVehicleResponse>("/vehicle", body);
  return response.data;
};

const deleteVehicle = async (params: DeleteVehicleParams) => {
  const response = await api.delete<DeleteVehicleResponse>(
    `/vehicle/${params.vehicleId}`
  );
  return response.data;
};

const vehiclesService = {
  getAll,
  create,
  deleteVehicle,
};

export default vehiclesService;
