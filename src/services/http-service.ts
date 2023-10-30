import apiClient from "./api-client";

// interface Entity {
//   id: number;
// }

interface DataStructure<T> {
  DT: T;
  EC: number;
  EM: string;
}

interface Paginate<T> {
  totalPages: number;
  totalRows: number;
  users: T;
}

interface DataStructurePaginate<T> {
  DT: Paginate<T>;
  EC: number;
  EM: string;
}

class HttpService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll<T>() {
    const controller = new AbortController();

    const response = apiClient.get<DataStructure<T[]>>(this.endpoint, {
      signal: controller.signal,
    });

    return { response, cancel: () => controller.abort() };
  }

  getAllPaginate<T>(page: number, limit: number) {
    const controller = new AbortController();

    const response = apiClient.get<DataStructurePaginate<T[]>>(
      this.endpoint + `?page=${page}&limit=${limit}`
    );

    return { response, cancel: () => controller.abort() };
  }

  getById<T>(id: string) {
    const controller = new AbortController();

    const response = apiClient.get<DataStructure<T[]>>(
      this.endpoint + `?quizId=${id}`,
      {
        signal: controller.signal,
      }
    );

    return { response, cancel: () => controller.abort() };
  }

  delete(id: number) {
    return apiClient.delete(this.endpoint, { data: { id: id } });
  }

  create<T>(entity: T) {
    return apiClient.post(this.endpoint, entity);
  }

  update<T>(entity: T) {
    return apiClient.put(this.endpoint, entity);
  }
}

const create = (endpoint: string) => new HttpService(endpoint);

export default create;
