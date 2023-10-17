import create from "./http-service";

export interface Participant {
  id: number;
  username: string;
  password: string;
  email: string;
  role: "USER" | "ADMIN";
  image: string | File;
}

const participantService = create("/api/v1/participant");
const participantSubService = create("/api/v1/participant/all");

export { participantService, participantSubService };
