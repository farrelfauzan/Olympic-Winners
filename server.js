const express = require('express');
const cors = require('cors')

const {OlympicWinners} = require('./models');
const { parseFilter } = require('./libs/parseFilter');
const OlympicWinnersRouter = require("./routes/OlympicWinnerRouter")
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/Olympic", OlympicWinnersRouter)
app.post('/api/winners/all', async (req, res) => {
  try {
    const options = parseFilter(req);

    const [data, count] = await Promise.all([
      OlympicWinners.findAll(options),
      OlympicWinners.count()
    ]);

    const result = {
      data: {
        rows: data,
        lastRows: count
      },
      message: "success get data",
      status: "success"
    }

    res.send(result);
  } catch (error) {
    console.error('error on `/api/winners/all`', error);
    res
      .send({
        message: 'Internal Server Error'
      })
      .status(500);
  }
  
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
});
