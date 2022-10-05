import {
  GetAllNotificationsResponse,
  MarkNotificationSeenBody,
  MarkNotificationSeenResponse,
  RegisterTokenBody,
  RegisterTokenResponse,
  UnregisterTokenBody,
  UnregisterTokenResponse,
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

const registerPushToken = async (body: RegisterTokenBody) => {
  const response = await api.post<RegisterTokenResponse>(
    "/notification/token/register",
    body
  );
  return response.data;
};

const unregisterPushToken = async (body: UnregisterTokenBody) => {
  const response = await api.post<UnregisterTokenResponse>(
    "/notification/token/unregister",
    body
  );
  return response.data;
};

const notificationService = {
  getAll,
  mark,
  registerPushToken,
  unregisterPushToken,
};

export default notificationService;
