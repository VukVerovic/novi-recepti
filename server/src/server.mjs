import app from "./app.mjs";

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Recepti backend on :${PORT}`);
});