import {
  GetAllNotificationsResponse,
  MarkNotificationSeenBody,
  MarkNotificationSeenResponse,
} from "@qw/dto";
import { api } from "./api";

const getAll = async () => {
  const response = await api.get<GetAllNotificationsResponse>("/notification");
  return response.data;
};

const mark = async (body: MarkNotificationSeenBody) => {
  const response = await api.put<MarkNotificationSeenResponse>(
    "/notification",
    body
  );
  return response.data;
};

const notificationService = {
  getAll,
  mark,
};

export default notificationService;
