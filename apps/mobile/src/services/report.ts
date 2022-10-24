import { CreateBugReportBody, CreateBugReportResponse } from "@qw/dto";
import { api } from "./api";

const create = async (body: CreateBugReportBody) => {
  const response = await api.post<CreateBugReportResponse>("/report", body);
  return response.data;
};

const reportService = {
  create,
};

export default reportService;
