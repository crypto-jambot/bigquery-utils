import { RowMetadata } from "@google-cloud/bigquery";
declare namespace jam {
  type BigQueryUtilOptions = {
    /**
     * Required projectId. Not project number.
     */
    projectId: string;
  };

  type InsertOptions = {
    /**
     * Name of BigQuery dataset
     */
    dataset: string;
    /**
     * Name of BigQuery table
     */
    table: string;
    /**
     * Data to be inserted
     */
    data: RowMetadata;
  };
}

export default jam;
