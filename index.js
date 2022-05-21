const app = require("./app");

app.listen(process.env.PORT || 9090, () => {
  console.log(`Node API server is running on port ${9090}`);
});
