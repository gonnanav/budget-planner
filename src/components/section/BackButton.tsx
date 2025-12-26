"use client";

import Link from "next/link";
import { Button } from "@heroui/button";
import { ArrowLeft } from "lucide-react";

export function BackButton() {
  return (
    <Button
      as={Link}
      href="/"
      size="sm"
      variant="light"
      isIconOnly
      aria-label="Back to overview"
    >
      <ArrowLeft size={16} />
    </Button>
  );
}
