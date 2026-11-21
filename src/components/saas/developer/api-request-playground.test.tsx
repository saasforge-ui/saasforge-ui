import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ApiRequestPlayground } from "./api-request-playground";

describe("ApiRequestPlayground", () => {
  it("disables Send until the URL is a valid http(s) URL", async () => {
    render(<ApiRequestPlayground onSend={vi.fn()} />);
    const send = screen.getByRole("button", { name: "Send" });
    expect(send).toBeDisabled();
    await userEvent.type(screen.getByLabelText("Request URL"), "not a url");
    expect(send).toBeDisabled();
    await userEvent.clear(screen.getByLabelText("Request URL"));
    await userEvent.type(screen.getByLabelText("Request URL"), "https://api.acme.dev/v1/users");
    expect(send).toBeEnabled();
  });

  it("sends the request and renders status, latency and pretty JSON", async () => {
    const onSend = vi.fn().mockResolvedValue({ status: 200, durationMs: 123, body: { ok: true, count: 2 } });
    render(<ApiRequestPlayground onSend={onSend} defaultUrl="https://api.acme.dev/v1/users" defaultHeaders={[{ key: "Authorization", value: "Bearer test" }]} />);
    await userEvent.click(screen.getByRole("button", { name: "Send" }));

    expect(onSend).toHaveBeenCalledWith({
      method: "GET",
      url: "https://api.acme.dev/v1/users",
      headers: { Authorization: "Bearer test" },
      body: undefined,
    });
    expect(await screen.findByText("200 OK")).toBeInTheDocument();
    expect(screen.getByText("123 ms")).toBeInTheDocument();
    expect(screen.getByLabelText("Response body").textContent).toBe('{\n  "ok": true,\n  "count": 2\n}');
  });

  it("shows an error state when the request rejects", async () => {
    const onSend = vi.fn().mockRejectedValue(new Error("Network unreachable"));
    render(<ApiRequestPlayground onSend={onSend} defaultUrl="https://api.acme.dev" />);
    await userEvent.click(screen.getByRole("button", { name: "Send" }));
    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("Request failed");
    expect(alert).toHaveTextContent("Network unreachable");
  });

  it("adds and removes header rows, ignoring blank keys", async () => {
    const onSend = vi.fn().mockResolvedValue({ status: 204, body: "" });
    render(<ApiRequestPlayground onSend={onSend} defaultUrl="https://api.acme.dev" defaultHeaders={[{ key: "X-Old", value: "1" }]} />);
    await userEvent.click(screen.getByRole("button", { name: "Add header" }));
    await userEvent.type(screen.getByLabelText("Header 2 name"), "X-Trace");
    await userEvent.type(screen.getByLabelText("Header 2 value"), "abc");
    await userEvent.click(screen.getByRole("button", { name: "Add header" }));
    await userEvent.click(screen.getByRole("button", { name: "Remove header X-Old" }));

    await userEvent.click(screen.getByRole("button", { name: "Send" }));
    expect(onSend).toHaveBeenCalledWith(expect.objectContaining({ headers: { "X-Trace": "abc" } }));
    await waitFor(() => expect(screen.getByText("204 No Content")).toBeInTheDocument());
  });

  it("validates a JSON body for methods that send one", async () => {
    render(<ApiRequestPlayground onSend={vi.fn()} defaultMethod="POST" defaultUrl="https://api.acme.dev" defaultBody="{ not json" />);
    expect(screen.getByRole("button", { name: "Send" })).toBeDisabled();
    await userEvent.click(screen.getByRole("tab", { name: "Body" }));
    expect(screen.getByText("Body is not valid JSON.")).toBeInTheDocument();
  });

  it("explains that GET requests have no body", async () => {
    render(<ApiRequestPlayground onSend={vi.fn()} defaultUrl="https://api.acme.dev" />);
    await userEvent.click(screen.getByRole("tab", { name: "Body" }));
    expect(screen.getByText("GET requests don't send a body.")).toBeInTheDocument();
  });
});
