import jam from "./types";
import { BigQuery } from "@google-cloud/bigquery";

/**
 * Options required for BigQueryUtils class instantiation
 */
export interface BigQueryUtilOptions {
  projectId: string;
}

let client: BigQuery;
export class BigQueryUtil {
  constructor(options: jam.BigQueryUtilOptions) {
    const { projectId } = options;
    client = new BigQuery({ projectId });
  }

  /**
   * Takes in query string and outputs a result of any[]
   * @param query
   */
  async query(query: string): Promise<any[]> {
    const [jobs] = await client.createQueryJob({ query, location: "US" });
    const [rows] = await jobs.getQueryResults();
    return rows;
  }
}
