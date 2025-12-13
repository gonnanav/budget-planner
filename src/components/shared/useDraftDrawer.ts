import { useDraft } from "@/components/shared";
import { useDisclosure } from "@heroui/react";

interface UseDrawerParams<T extends { id?: string }> {
  headingTexts: { create: string; edit: string };
  defaultDraft: T;
}

export function useDraftDrawer<T extends { id?: string }>({
  headingTexts,
  defaultDraft,
}: UseDrawerParams<T>) {
  const { isOpen, onOpen: open, onClose: close } = useDisclosure();
  const { draft: value, updateDraft, resetDraft } = useDraft<T>(defaultDraft);

  const headingText = value.id ? headingTexts.edit : headingTexts.create;

  return {
    drawer: {
      isOpen,
      open,
      close,
      headingText,
    },
    draft: {
      value,
      update: updateDraft,
      reset: resetDraft,
    },
  };
}
