import React from "react";
import Link from "next/link";

import { ChevronDownIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type BreadcrumbProps = {
  BasePage: String;
  CurrentPage: string;
  ListPage: string[];
};

const ReusablesBreadCrumb = ({
  BasePage,
  CurrentPage,
  ListPage,
}: BreadcrumbProps) => {
  if (ListPage.length > 3) {
    return (
      <Breadcrumb className="p-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="capitalize">
              {BasePage}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1">
              Pages
              <ChevronDownIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {ListPage.map((route, index) => (
                <Link href="route" key={index}>
                  <DropdownMenuItem className="capitalize">
                    {route}
                  </DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="capitalize">
              {CurrentPage}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  return (
    <Breadcrumb className="p-2">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="capitalize">
            {BasePage}
          </BreadcrumbLink>
        </BreadcrumbItem>
        {ListPage.length > 0 &&
          ListPage.map((route, index) => (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem key={index}>
                <BreadcrumbLink href={route} className="capitalize">
                  {route}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          ))}
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="capitalize">{CurrentPage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default ReusablesBreadCrumb;

//? EXAMPLE USAGE
/*
<ReusablesBreadCrumb
  BasePage="Home"
  CurrentPage="todo"
  ListPage={["tools"]}
/>

<ReusablesBreadCrumb
  BasePage="Home"
  CurrentPage="todo"
  ListPage={["tools", "Asdfas", "vcx", "hbvcv"]}
/>
*/
