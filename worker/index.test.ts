import { afterEach, describe, expect, test, vi } from "vite-plus/test";
import worker from "./index";

const assets = vi.fn(async (_req: Request) => new Response("desktop"));
const env = { ASSETS: { fetch: assets } } as unknown as Env;
const get = (url: string, init?: RequestInit) => worker.fetch(new Request(url, init) as never, env);

afterEach(() => {
  vi.unstubAllGlobals();
  assets.mockClear();
});

describe("addresses", () => {
  test("the others redirect to jona.no, path and query kept", async () => {
    for (const from of [
      "https://www.jona.no",
      "https://jonas-jensen.com",
      "http://www.jonas-jensen.com",
    ]) {
      const res = await get(`${from}/docs/x?y=1`);
      expect([res.status, res.headers.get("location")]).toEqual([
        301,
        "https://jona.no/docs/x?y=1",
      ]);
    }
  });

  test("jona.no itself is the desktop", async () => {
    expect(await (await get("https://jona.no/floor-planner")).text()).toBe("desktop");
  });
});

describe("embedded apps", () => {
  test("are fetched from their deploy, and only a listed app's own sign-in hears its address", async () => {
    const upstream = vi.fn(async (_url: string, _init: RequestInit) => new Response("app"));
    vi.stubGlobal("fetch", upstream);
    await get("https://jona.no/apps/floor-planner/assets/a.js?v=2");
    await get("https://jona.no/apps/edh-land/api/providers");
    const [[pages, pagesInit], [edh, edhInit]] = upstream.mock.calls;
    expect(pages).toBe("https://j0nas.github.io/floor-boards-planner/assets/a.js?v=2");
    expect(new Headers(pagesInit.headers).has("x-public-base")).toBe(false);
    expect(edh).toBe("https://edh.land/api/providers");
    expect(new Headers(edhInit.headers).get("x-public-base")).toBe("https://jona.no/apps/edh-land");
  });

  test("a redirect within the deploy stays under /apps/<id>/", async () => {
    vi.stubGlobal(
      "fetch",
      async () =>
        new Response(null, {
          status: 301,
          headers: { location: "https://j0nas.github.io/lamp-shade-designer/docs/" },
        }),
    );
    const res = await get("https://jona.no/apps/lamp-shade/docs");
    expect(res.headers.get("location")).toBe("/apps/lamp-shade/docs/");
  });

  test("the bare path gets its slash; an unknown app is the desktop's", async () => {
    const res = await get("https://jona.no/apps/deck-box?x=1");
    expect(res.headers.get("location")).toBe("https://jona.no/apps/deck-box/?x=1");
    expect(await (await get("https://jona.no/apps/nope/")).text()).toBe("desktop");
  });
});
