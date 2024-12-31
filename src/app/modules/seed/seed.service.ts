import { Application } from "../application/application.model";
import { dummyApplications } from "./seed.constant";

const seedApplicationsIntoDB = async () => {
  const newSeed = await Application.insertMany(dummyApplications);
  return newSeed;
};

export const SeedServices = {
  seedApplicationsIntoDB
};
