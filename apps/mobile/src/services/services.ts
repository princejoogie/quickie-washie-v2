import {
  CreateServiceBody,
  CreateServiceResponse,
  GetAllServicesResponse,
} from "@qw/dto";
import { api } from "./api";

const getAll = async () => {
  const response = await api.get<GetAllServicesResponse>("/service");
  return response.data;
};

const create = async (body: CreateServiceBody) => {
  const response = await api.post<CreateServiceResponse>("/service", body);
  return response.data;
};

const servicesService = {
  create,
  getAll,
};

export default servicesService;
