import {
  CreateBugReportBody,
  CreateBugReportResponse,
  GetAllBugReportsResponse,
  GetBugReportByIdParams,
  GetBugReportByIdResponse,
} from "@qw/dto";
import { api } from "./api";

const getAll = async () => {
  const response = await api.get<GetAllBugReportsResponse>("/report");
  return response.data;
};

const getById = async ({ reportId }: GetBugReportByIdParams) => {
  const response = await api.get<GetBugReportByIdResponse>(
    `/report/${reportId}`
  );
  return response.data;
};

const create = async (body: CreateBugReportBody) => {
  const response = await api.post<CreateBugReportResponse>("/report", body);
  return response.data;
};

const reportService = {
  create,
  getAll,
  getById,
};

export default reportService;
