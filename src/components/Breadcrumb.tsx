import React from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "../components/ui/breadcrumb";

interface Props {
  items: { label: string; href?: string }[];
}

export function AppBreadcrumb({ items }: Props) {
  const { pathname } = useLocation();

  const visibleItems = items.filter((item) =>
    item.href ? pathname.startsWith(item.href) : true
  );

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {visibleItems.map((item, i) => {
          const isLast = i === visibleItems.length - 1;
          return (
            <React.Fragment key={i}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={item.href!}>{item.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
