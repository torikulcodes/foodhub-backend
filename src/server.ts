import app from "./app.js";
import { envVariables } from "./config/env.js";

const port = envVariables.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

