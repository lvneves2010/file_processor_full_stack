const express = require('express');
const app = express();
const port = 3001;
const {router} = require('./routes/processRoutes');

app.use(express.json());

app.use('/api/process', router);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
