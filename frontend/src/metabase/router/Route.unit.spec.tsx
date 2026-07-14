import { renderWithProviders, screen } from "__support__/ui";

import { Outlet } from "./Outlet";
import { Route } from "./react-router";

const Child = () => <div>child page</div>;

const Wrapper = () => (
  <div>
    <span>wrapper chrome</span>
    <Outlet />
  </div>
);

const Inner = () => (
  <div>
    <span>inner chrome</span>
    <Outlet />
  </div>
);

describe("router/Route element adapter", () => {
  it("renders an `element` wrapper with the matched child exposed via <Outlet/>", async () => {
    renderWithProviders(
      <Route element={<Wrapper />}>
        <Route path="/nested" component={Child} />
      </Route>,
      { withRouter: true, initialRoute: "/nested" },
    );

    expect(await screen.findByText("child page")).toBeInTheDocument();
    expect(screen.getByText("wrapper chrome")).toBeInTheDocument();
  });

  it("composes nested `element` wrappers", async () => {
    renderWithProviders(
      <Route element={<Wrapper />}>
        <Route element={<Inner />}>
          <Route path="/deep" component={Child} />
        </Route>
      </Route>,
      { withRouter: true, initialRoute: "/deep" },
    );

    expect(await screen.findByText("child page")).toBeInTheDocument();
    expect(screen.getByText("wrapper chrome")).toBeInTheDocument();
    expect(screen.getByText("inner chrome")).toBeInTheDocument();
  });

  it("still passes `component` routes straight through to v3", async () => {
    renderWithProviders(<Route path="/plain" component={Child} />, {
      withRouter: true,
      initialRoute: "/plain",
    });

    expect(await screen.findByText("child page")).toBeInTheDocument();
  });
});
