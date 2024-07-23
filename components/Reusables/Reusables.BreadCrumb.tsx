import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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
  return (
    <Breadcrumb className="p-2">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">{BasePage}</BreadcrumbLink>
        </BreadcrumbItem>
        {ListPage &&
          ListPage.length > 0 &&
          ListPage.map((route, index) => (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem key={index}>
                <BreadcrumbLink href={route}>{route}</BreadcrumbLink>
              </BreadcrumbItem>
            </>
          ))}
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{CurrentPage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default ReusablesBreadCrumb;
