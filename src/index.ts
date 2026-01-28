import path from "path";
import express from "express";
import scanRoute from "./routes/scan.route";
import analyzeRoute from "./routes/analyze.route";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

app.use("/scan", scanRoute);
app.use("/analyze", analyzeRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
},);

export default app;
