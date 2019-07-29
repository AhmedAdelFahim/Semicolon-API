const express = require('express');
const contestRouter = require('./routers/contest')
const ojRouter = require('./routers/online_judge')

require('./update_cache')
require('./db/mongoose_connection')


const app = express();

const PORT = process.env.PORT


app.use(express.json());
app.use(contestRouter)
app.use(ojRouter)


app.listen(PORT, () => {
    console.log(`Server running at ${PORT}/`);
});
