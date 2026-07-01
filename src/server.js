import app from "./app.js";
import env from "./config/env.js";

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`
=========================================
 Student Health Management System API
=========================================
 Environment : ${env.NODE_ENV}
 Port        : ${PORT}
 Server      : Running
=========================================
`);
});