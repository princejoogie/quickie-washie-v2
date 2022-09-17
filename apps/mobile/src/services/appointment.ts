import {
  CreateAppointmentBody,
  CreateAppointmentResponse,
  DeleteAppointmentParams,
  DeleteAppointmentResponse,
  GetAllAppointmentsResponse,
  UpdateAppointmentBody,
  UpdateAppointmentParams,
  UpdateAppointmentResponse,
} from "@qw/dto";
import { api } from "./api";

const getAll = async () => {
  const response = await api.get<GetAllAppointmentsResponse>("/appointment");
  return response.data;
};

const create = async (body: CreateAppointmentBody) => {
  const response = await api.post<CreateAppointmentResponse>(
    "/appointment",
    body
  );
  return response.data;
};

const update = async ({
  params,
  body,
}: {
  params: UpdateAppointmentParams;
  body: UpdateAppointmentBody;
}) => {
  const response = await api.put<UpdateAppointmentResponse>(
    `/appointment/${params.appointmentId}`,
    body
  );
  return response.data;
};

const deleteAppointment = async (params: DeleteAppointmentParams) => {
  const response = await api.delete<DeleteAppointmentResponse>(
    `/appointment/${params.appointmentId}`
  );
  return response.data;
};

const appointmentService = {
  create,
  deleteAppointment,
  getAll,
  update,
};

export default appointmentService;
