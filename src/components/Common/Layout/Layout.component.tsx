import Head from "next/head";
import React, { PropsWithChildren } from "react";

export const LayoutComponent = React.forwardRef<
  HTMLDivElement,
  PropsWithChildren
>(({ children }, ref) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main ref={ref}>{children}</main>
    </>
  );
});
LayoutComponent.displayName = "Layout";
