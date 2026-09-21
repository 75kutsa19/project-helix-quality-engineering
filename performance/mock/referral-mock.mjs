import http from "node:http";

const HOST = "127.0.0.1";
const PORT = 3007;

function sendJson(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${HOST}:${PORT}`);

  if (req.method === "GET" && url.pathname === "/health") {
    return sendJson(res, 200, { status: "ok" });
  }

  if (req.method === "POST" && url.pathname === "/referrals") {
    const failure = url.searchParams.get("failure");

    if (failure === "400") {
      return sendJson(res, 400, { error: "invalid referral payload" });
    }

    if (failure === "401") {
      return sendJson(res, 401, { error: "unauthorized" });
    }

    if (failure === "500") {
      return sendJson(res, 500, { error: "simulated server failure" });
    }

    if (failure === "timeout") {
      return setTimeout(() => {
        sendJson(res, 504, { error: "simulated timeout" });
      }, 5000);
    }

    return sendJson(res, 201, {
      id: `REF-${Date.now()}`,
      status: "accepted",
    });
  }

  return sendJson(res, 404, { error: "route not found" });
});

server.listen(PORT, HOST, () => {
  console.log(`HELIX local referral mock listening on http://${HOST}:${PORT}`);
  console.log("Performance testing target is local-only.");
});
