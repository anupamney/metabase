// The single module that imports the `react-router` package directly. The rest
// of the app reaches these symbols through `metabase/router`, so later phases can
// swap the engine behind this seam without touching call sites.
//
// The v7-shaped API (useNavigate, useLocation, Link, Navigate, Outlet, ...) lives
// in the sibling facade modules. This file only re-exports the raw v3 symbols that
// have not been given a v7 shape yet (route-tree components, withRouter, history
// helpers) plus the raw Link/LinkProps under `Router`-prefixed names for the few
// call sites that need the unstyled primitive.
import type { ComponentClass, ReactElement } from "react";
import type {
  IndexRouteProps as BaseIndexRouteProps,
  RouteProps as BaseRouteProps,
} from "react-router";
import { IndexRoute as BaseIndexRoute, Route as BaseRoute } from "react-router";

import { routeElement } from "./Outlet";

export {
  IndexRedirect,
  Link as RouterLink,
  Redirect,
  Router,
  createMemoryHistory,
  useRouterHistory,
  withRouter,
} from "react-router";

export type {
  InjectedRouter,
  LinkProps as RouterLinkProps,
  PlainRoute,
  RouteComponent,
  WithRouterProps,
} from "react-router";

/**
 * v3's route lifecycle hooks. They have no v7 equivalent, and the app now does
 * this work in components and effects instead, so they are dropped from the route
 * props to keep them from coming back.
 */
type LifecycleHook = "onEnter" | "onChange" | "onLeave";

export type RouteProps = Omit<BaseRouteProps, LifecycleHook> & {
  /**
   * v7-style wrapper element. Rendered in place of `component`, with the matched
   * child route exposed through `<Outlet/>`.
   */
  element?: ReactElement;
};
export type IndexRouteProps = Omit<BaseIndexRouteProps, LifecycleHook>;

type RouteStatics = {
  createRouteFromReactElement: (
    element: { type: unknown; props: unknown },
    parentRoute?: unknown,
  ) => unknown;
};

// v3's Route carries the config-building static, but `@types/react-router`
// does not declare it, so reach it through a cast.
const baseCreateRouteFromReactElement = (BaseRoute as unknown as RouteStatics)
  .createRouteFromReactElement;

/**
 * v3 assembles its route config by calling `type.createRouteFromReactElement` on
 * each route element and never renders `<Route>` itself. Override that static so
 * a v7 `element` prop is translated into v3's `component`, wiring the matched
 * child through `<Outlet/>`. Routes without `element` pass straight through.
 */
class RouteWithElement extends (BaseRoute as ComponentClass) {
  static createRouteFromReactElement(
    element: ReactElement,
    parentRoute?: unknown,
  ) {
    // `ReactElement.props` is untyped; a route element carries our RouteProps.
    const { element: wrapper, ...rest } = element.props as RouteProps;
    if (wrapper == null) {
      return baseCreateRouteFromReactElement(element, parentRoute);
    }
    // v3 only reads `type` and `props` off the element to build the config, so a
    // minimal stand-in is enough to reuse its builder with `element` mapped to
    // `component`.
    return baseCreateRouteFromReactElement(
      {
        type: BaseRoute,
        props: { ...rest, component: routeElement(wrapper) },
      },
      parentRoute,
    );
  }
}

// `react-router` exports each of these as both a value and a type, so mirror that.
export type Route = ComponentClass<RouteProps>;
// Unjustified type cast. FIXME
export const Route = RouteWithElement as unknown as Route;

export type IndexRoute = ComponentClass<IndexRouteProps>;
// Unjustified type cast. FIXME
export const IndexRoute = BaseIndexRoute as IndexRoute;
