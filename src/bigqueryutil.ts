import jam from "./types";
import {
    BigQuery,
    RowMetadata,
    BigQueryOptions,
    InsertRowsResponse,
    InsertRowsOptions,
} from "@google-cloud/bigquery";

/**
 * Options required for BigQueryUtils class instantiation
 */
export interface InsertOptions extends Options {
    data: RowMetadata | RowMetadata[];
}

interface Options {
    dataset: string;
    table: string;
    options?: InsertRowsOptions;
}

const SIZE_LIMIT = 30000;

let client: BigQuery;

export class BigQueryUtil {
    constructor(options?: BigQueryOptions) {
        client = new BigQuery(options);
    }

    /**
     * Takes in query string and outputs a result of any[]
     * @param query
     */
    async query<T>(query: string): Promise<T[]> {
        const [jobs] = await client.createQueryJob({ query, location: "US" });
        const [rows] = await jobs.getQueryResults();
        return rows;
    }

    async insert(options: jam.InsertOptions): Promise<void> {
        const { data } = options;
        if (Array.isArray(data) && data.length > SIZE_LIMIT) {
            await this.#batchInsert(data, options);
            return;
        }
        await this.#executeInsert(data, options);
    }

    async #batchInsert(rows: RowMetadata[], options: Options): Promise<void> {
        const { length } = rows;
        if (length > SIZE_LIMIT) {
            const extraRowsConstant = length - SIZE_LIMIT;
            await this.#executeInsert(rows.slice(0, SIZE_LIMIT), options);
            await this.#batchInsert(rows.slice(SIZE_LIMIT), options);
            return;
        }
        await this.#executeInsert(rows, options);
    }

    #executeInsert(
        rows: RowMetadata[],
        options: Options
    ): Promise<InsertRowsResponse> {
        return new Promise(async (resolve, reject) => {
            try {
                const { dataset, table, options: insertOptions } = options;
                const response = await client
                    .dataset(dataset)
                    .table(table)
                    .insert(rows, insertOptions);
                resolve(response);
            } catch (err) {
                reject(err);
            }
        });
    }
}
