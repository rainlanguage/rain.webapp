"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Navbar } from "flowbite-react";

export function NavItems() {
  return (
    <>
      <Navbar.Link href="/flare">Browse strategies</Navbar.Link>
      <Navbar.Link href="/my-strategies">My strategies</Navbar.Link>
    </>
  );
}

export function Nav() {
  return (
    <Navbar fluid className="sticky top-0 border-b z-[100]">
      <div className="flex items-center gap-x-8">
        <Navbar.Brand href="/flare">
          <img src="/_images/raindex-logo.png" className="h-10 mr-2" />
        </Navbar.Brand>
        <Navbar.Collapse className="hidden md:visible">
          <NavItems />
        </Navbar.Collapse>
      </div>
      <div className="flex gap-x-2 md:order-1">
        <ConnectButton label="connect" chainStatus="none" />
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse className="md:hidden visible">
        <NavItems />
      </Navbar.Collapse>
    </Navbar>
  );
}
