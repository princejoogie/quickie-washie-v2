import { CreateReviewParams, CreateReviewBody } from "@qw/dto";
import { api } from "./api";

const create = async ({
  params,
  body,
}: {
  params: CreateReviewParams;
  body: CreateReviewBody;
}) => {
  const response = await api.post(`/review/${params.appointmentId}`, body);
  return response.data;
};

const getAll = async () => {
  const response = await api.get(`/review`);
  return response.data;
};

const reviewService = {
  create,
  getAll,
};

export default reviewService;
