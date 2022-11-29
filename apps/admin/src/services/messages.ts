import {
  GetAllMessagesParamsSchema,
  GetAllMessagesResponseSchema,
  CreateMessageBodySchema,
  CreateMessageParamsSchema,
  CreateMessageResponseSchema,
} from "@qw/dto";
import { api } from "./api";

const getAll = async (params: GetAllMessagesParamsSchema) => {
  const response = await api.get<GetAllMessagesResponseSchema>(
    `/appointment/${params.appointmentId}/message`
  );
  return response.data;
};

const create = async ({
  params,
  body,
}: {
  params: CreateMessageParamsSchema;
  body: CreateMessageBodySchema;
}) => {
  const response = await api.post<CreateMessageResponseSchema>(
    `/appointment/${params.appointmentId}/message`,
    body
  );
  return response.data;
};

const messageService = {
  getAll,
  create,
};

export default messageService;
