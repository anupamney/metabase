import cx from "classnames";

import CS from "metabase/css/core/index.css";
import { PLUGIN_LOGO_ICON_COMPONENTS } from "metabase/plugins";

interface LogoIconProps {
  width?: number;
  height?: number;
  dark?: boolean;
  fill?: string;
}

/** Insights Flow mark: three ascending bars under a flowing trend line and a spark. */
export const DefaultLogoIcon = ({
  dark,
  height = 32,
  width,
  fill = "currentcolor",
}: LogoIconProps) => {
  return (
    <svg
      className={cx(
        "Icon",
        { [CS.textMetabaseBrand]: !dark },
        { [CS.textWhite]: dark },
      )}
      viewBox="0 0 212 256"
      width={width}
      height={height}
      fill={fill}
      data-testid="main-logo"
    >
      <rect x="14" y="166" width="44" height="80" rx="12" fill="currentColor" />
      <rect x="84" y="106" width="44" height="140" rx="12" fill="currentColor" />
      <rect x="154" y="46" width="44" height="200" rx="12" fill="currentColor" />
      <path
        d="M22 148 C 70 124, 118 96, 172 44"
        stroke="currentColor"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
        opacity={0.45}
      />
      <circle cx="182" cy="18" r="14" fill="currentColor" />
    </svg>
  );
};

export function LogoIcon(props: LogoIconProps) {
  const [Component = DefaultLogoIcon] = PLUGIN_LOGO_ICON_COMPONENTS;
  return <Component {...props} />;
}
