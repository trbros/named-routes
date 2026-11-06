import manifest from "../../package.json";
export const release = {
  name: manifest.name,
  version: manifest.version,
  githubOrganization: "trbros",
  githubUrl: "https://github.com/trbros",
} as const;
