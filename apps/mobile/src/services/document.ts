import {
  CreateDocumentBody,
  DeleteDocumentParams,
  DeleteDocumentResponse,
} from "@qw/dto";
import { api } from "./api";

const create = async (body: CreateDocumentBody) => {
  const response = await api.post("/document", body);
  return response.data;
};

const deleteDocument = async (params: DeleteDocumentParams) => {
  const response = await api.delete<DeleteDocumentResponse>(
    `/document/${params.documentId}`
  );
  return response.data;
};

const documentService = {
  create,
  deleteDocument,
};

export default documentService;
