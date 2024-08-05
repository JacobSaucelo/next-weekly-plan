import Link from "next/link";
import React from "react";

import { House, PencilRuler } from "lucide-react";
import ReusablesDivider from "../Reusables/Reusables.Divider";
import ReusablesThemeToggler from "../Reusables/Reusables.ThemeToggler";

type SidebarLinksTypes = {
  Title: string;
  Icon?: any;
  LinksContainer: LinksContainerTypes[];
};
type LinksContainerTypes = {
  Title: string;
  Icon?: any;
  Route: string;
};

const SidebarLinks: SidebarLinksTypes[] = [
  {
    Title: "Pages",
    LinksContainer: [
      {
        Title: "Home",
        Icon: <House />,
        Route: "/",
      },
      {
        Title: "Tools",
        Icon: <PencilRuler />,
        Route: "/tools/",
      },
    ],
  },
];

const PrimitivesSidebar = () => {
  return (
    <section>
      {SidebarLinks.map((sideLink, index) => (
        <article key={index} className="mb-5">
          <h3 className="text-base font-semibold text-muted-foreground mb-2">
            {sideLink.Title}
          </h3>
          <ul className="text-lg ps-2">
            {sideLink.LinksContainer.map((linkItem, index) => (
              <li key={index}>
                <Link
                  href={linkItem.Route}
                  className="flex gap-2 font-semibold hover:text-blue-500"
                >
                  {linkItem.Icon} {linkItem.Title}
                </Link>
              </li>
            ))}
          </ul>
        </article>
      ))}

      <article>
        <h3 className="text-base font-semibold text-muted-foreground mb-2">
          Theming
        </h3>
        <ul className="text-lg ps-2">
          <li className="flex items-center gap-2 font-semibold">
            Toggle Theme
            <ReusablesThemeToggler />
          </li>
        </ul>
      </article>
    </section>
  );
};

export default PrimitivesSidebar;
