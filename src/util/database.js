const express = require("express");
const oracledb = require("oracledb");
const app = express();

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

app.get("/api/emotion/getEmotion", (req, res) => {
  getSelection(req, res);
});

async function getSelection(req, res) {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: "lime",
      password: "lime",
      connectString: "SID",
    });

    const result = await connection.execute(`SELECT * FROM EMOTIONDIARY`, []);
    console.log(result);
    res.snd(result.rows);
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
