import create from "./http-service";

const participantService = create("/api/v1/participant");

const participantSubService = create("/api/v1/participant");

export { participantService, participantSubService };
