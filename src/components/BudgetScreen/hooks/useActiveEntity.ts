import { useState } from "react";
import type { Entity } from "domain/types";

export type UseActiveEntityResult = {
  activeEntity: Entity;
  toggleEntity: () => void;
};

export const useActiveEntity = (
  initialActiveEntity: Entity = "item",
): UseActiveEntityResult => {
  const [activeEntity, setActiveEntity] = useState<Entity>(initialActiveEntity);

  const toggleEntity = () => {
    setActiveEntity((prevActiveEntity) =>
      prevActiveEntity === "item" ? "category" : "item",
    );
  };

  return {
    activeEntity,
    toggleEntity,
  };
};
