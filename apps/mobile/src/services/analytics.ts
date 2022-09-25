import { GetSalesResponse } from "@qw/dto";
import { api } from "./api";

const getSales = async () => {
  const response = await api.get<GetSalesResponse>("/analytics/sales");
  return response.data;
};

const analyticsService = {
  getSales,
};

export default analyticsService;
