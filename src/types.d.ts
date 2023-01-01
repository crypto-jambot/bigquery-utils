import { InsertRowsOptions, RowMetadata } from "@google-cloud/bigquery";
declare namespace jam {
    /**
     * Options for inserting data into BigQuery
     */
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
        data: RowMetadata | RowMetadata[];
        /**
         * Additional optional options for BigQuery insert
         */
        options?: InsertRowsOptions;
    };
}

export default jam;
