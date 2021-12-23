const app = require('./app');

const port = process.env.BACKEND_PORT;

app.listen(port, () => console.log(`server listening on port ${port}`));
