const express = require("express");
const oracledb = require("oracledb");
const app = express();
const cors = require("cors");

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

app.use(cors());

app.get("/api/emotion/getEmotion", (req, res) => {
  getSelection(req, res);
});

async function getSelection(req, res) {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: "lime",
      password: "lime",
      connectString: "localhost:1521/xe",
    });

    const result = await connection.execute(
      `SELECT ID, EMOTION, CONTENT, TO_CHAR(CREATE_DATE, 'YYYY-MM-DD HH24:MI:SS') AS CREATE_DATE FROM EMOTIONDIARY ORDER BY ID`,
      []
    );

    console.log(result);

    res.send(result.rows);
  } catch (error) {
    console.log(error);
  } finally {
    if (connection) {
      try {
        connection.close();
      } catch (error) {
        console.log(error);
      }
    }
  }
}

app.listen(3000);
