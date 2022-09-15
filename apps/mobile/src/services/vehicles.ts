import {
  GetVehicleByIdParams,
  GetVehicleByIdResponse,
  GetAllVehiclesResponse,
  CreateVehicleBody,
  CreateVehicleResponse,
  UpdateVehicleBody,
  UpdateVehicleParams,
  UpdateVehicleResponse,
  DeleteVehicleParams,
  DeleteVehicleResponse,
} from "@qw/dto";
import { api } from "./api";

const getAll = async () => {
  const response = await api.get<GetAllVehiclesResponse>("/vehicle");
  return response.data;
};

const getById = async (params: GetVehicleByIdParams) => {
  const response = await api.get<GetVehicleByIdResponse>(
    `/vehicle/${params.vehicleId}`
  );
  return response.data;
};

const update = async ({
  params,
  body,
}: {
  params: UpdateVehicleParams;
  body: UpdateVehicleBody;
}) => {
  const response = await api.put<UpdateVehicleResponse>(
    `/vehicle/${params.vehicleId}`,
    body
  );
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
  getById,
  create,
  deleteVehicle,
  update,
};

export default vehiclesService;
