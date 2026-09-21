import test from "node:test";
import assert from "node:assert/strict";

const BASE_URL = "http://127.0.0.1:3007";

test("normal referral is accepted", async () => {
  const response = await fetch(`${BASE_URL}/referrals`, {
    method: "POST",
  });

  assert.equal(response.status, 201);

  const body = await response.json();
  assert.equal(body.status, "accepted");
});

test("invalid referral returns 400", async () => {
  const response = await fetch(`${BASE_URL}/referrals?failure=400`, {
    method: "POST",
  });

  assert.equal(response.status, 400);

  const body = await response.json();
  assert.equal(body.error, "invalid referral payload");
});

test("unauthorized referral returns 401", async () => {
  const response = await fetch(`${BASE_URL}/referrals?failure=401`, {
    method: "POST",
  });

  assert.equal(response.status, 401);

  const body = await response.json();
  assert.equal(body.error, "unauthorized");
});

test("server failure returns 500", async () => {
  const response = await fetch(`${BASE_URL}/referrals?failure=500`, {
    method: "POST",
  });

  assert.equal(response.status, 500);

  const body = await response.json();
  assert.equal(body.error, "simulated server failure");
});

test("delayed dependency returns 504 after controlled delay", async () => {
  const started = Date.now();

  const response = await fetch(`${BASE_URL}/referrals?failure=timeout`, {
    method: "POST",
  });

  const elapsed = Date.now() - started;

  assert.equal(response.status, 504);
  assert.ok(elapsed >= 4900);

  const body = await response.json();
  assert.equal(body.error, "simulated timeout");
});
