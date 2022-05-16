import satellitesConfig from "../config/satellites.config";
import { IStartSateData } from "../models/satellites";
import { parseTleFile } from "../utils/TLE/parseTLEFile";
import getCorsFreeUrl from "./CorsFreeUrl.service";

export const getSatellites = async (): Promise<IStartSateData[] | null> => {
  try {
    return await fetch(getCorsFreeUrl(satellitesConfig.satelliteDataUrl)).then(
      (res) => {
        if (res.ok) {
          return res.text().then((data) => {
            return parseTleFile(data);
          });
        } else {
          return null;
        }
      }
    );
  } catch (error) {
    return null;
  }
};
