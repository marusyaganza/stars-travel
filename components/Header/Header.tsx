"use client";
import { MobileHeader } from "./MobileHeader";
import { DesktopHeader } from "./DesktopHeader";

interface HeaderProps {
  isMobile: boolean;
}

export function Header({ isMobile }: HeaderProps) {
  const HeaderComponent = isMobile ? MobileHeader : DesktopHeader;

  return <HeaderComponent />;
}
