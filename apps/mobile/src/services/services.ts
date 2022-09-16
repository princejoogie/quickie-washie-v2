import {
  CreateServiceBody,
  CreateServiceResponse,
  GetAllServicesResponse,
  GetServiceByIdParams,
  GetServiceByIdResponse,
  UpdateServiceBody,
  UpdateServiceParams,
  UpdateServiceResponse,
} from "@qw/dto";
import { api } from "./api";

const getAll = async () => {
  const response = await api.get<GetAllServicesResponse>("/service");
  return response.data;
};

const getById = async (params: GetServiceByIdParams) => {
  const response = await api.get<GetServiceByIdResponse>(
    `/service/${params.serviceId}`
  );
  return response.data;
};

const create = async (body: CreateServiceBody) => {
  const response = await api.post<CreateServiceResponse>("/service", body);
  return response.data;
};

const update = async ({
  params,
  body,
}: {
  params: UpdateServiceParams;
  body: UpdateServiceBody;
}) => {
  const response = await api.put<UpdateServiceResponse>(
    `/service/${params.serviceId}`,
    body
  );
  return response.data;
};

const servicesService = {
  create,
  getAll,
  getById,
  update,
};

export default servicesService;
