import { GetAllServicesResponse } from "@qw/dto";
import { api } from "./api";

const getAll = async () => {
  const response = await api.get<GetAllServicesResponse>("/service");
  return response.data;
};

const servicesService = {
  getAll,
};

export default servicesService;
