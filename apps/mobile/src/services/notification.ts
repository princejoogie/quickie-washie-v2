import { GetAllNotificationsResponse } from "@qw/dto";
import { api } from "./api";

const getAll = async () => {
  const response = await api.get<GetAllNotificationsResponse>("/notification");
  return response.data;
};

const notificationService = {
  getAll,
};

export default notificationService;
