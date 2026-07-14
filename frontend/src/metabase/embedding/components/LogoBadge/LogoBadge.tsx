import cx from "classnames";
import { t } from "ttag";

import { ExternalLink } from "metabase/common/components/ExternalLink";
import { LogoIcon } from "metabase/common/components/LogoIcon";
import EmbedFrameS from "metabase/embedding/theme.module.css";

import LogoBadgeStyle from "./LogoBadge.module.css";

/** Insights Flow branding: the public-embed badge shows the product mark + name and
    links to the hosting instance instead of an external site. */
export const LogoBadge = ({ dark }: { dark: boolean }) => {
  return (
    <ExternalLink
      className={cx(EmbedFrameS.LogoBadge, LogoBadgeStyle.metabaseLink, {
        [LogoBadgeStyle.dark]: dark,
        [LogoBadgeStyle.light]: !dark,
      })}
      href="/"
      target="_blank"
    >
      <span>{t`Powered by`}</span>
      <LogoIcon height={24} />
      <span>{t`Insights Flow`}</span>
    </ExternalLink>
  );
};
