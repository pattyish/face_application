import pool from "./dbConnection";

class Dboperations {
  constructor(tableName) {
    this.tableName = tableName;
  }
  async selectByField(field, params, operator = "=") {
    const query = {
      text: `SELECT * FROM ${this.tableName} WHERE ${field} ${operator} $1`,
      values: [params]
    };
    try {
      const results = await pool.query(query);
      const rowValue = results.rows;
      const rowNumber = results.rowCount;
      return {
        rowValue,
        rowNumber
      };
    } catch (error) {
      console.log(`error on select ${error}`);
    }
  }
  async insertData(data) {
    const params = [];
    const chunks = [];
    const values = [];
    const keys = [];
    Object.keys(data).forEach(key => {
      keys.push(key);
      params.push(data[key]);
      values.push(`$${params.length}`);
    });
    chunks.push(`(${values.join(", ")})`);
    try {
      const insertQuery = {
        text: `INSERT INTO ${this.tableName} (${keys.join(
          ","
        )}) VALUES ${chunks.join(",")} RETURNING *`,
        values: params
      };

      const results = await pool.query(insertQuery);
      return results.rows;
    } catch (err) {
      console.log(`error on insert ${err}`);
    }
  }
}

export { Dboperations as default };
