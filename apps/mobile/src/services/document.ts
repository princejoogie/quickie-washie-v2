import { CreateDocumentBody } from "@qw/dto";
import { api } from "./api";

const create = async (body: CreateDocumentBody) => {
  const response = await api.post("/document", body);
  return response.data;
};

const documentService = {
  create,
};

export default documentService;
