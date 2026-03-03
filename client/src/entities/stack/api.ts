import { useState, useEffect, useCallback } from "react";
import type { Stack } from "./model";

const STORAGE_KEY = "int-explorer-stacks";

function readStacks(): Stack[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Stack[]) : [];
  } catch {
    return [];
  }
}

function writeStacks(stacks: Stack[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stacks));
}

export function useStacks() {
  const [stacks, setStacks] = useState<Stack[]>(readStacks);

  const refresh = useCallback(() => {
    setStacks(readStacks());
  }, []);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) refresh();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [refresh]);

  return { stacks, refresh };
}

export function useSaveStack(onDone?: () => void) {
  const saveStack = useCallback(
    (stack: Stack) => {
      const current = readStacks();
      const idx = current.findIndex((s) => s.id === stack.id);
      if (idx >= 0) {
        current[idx] = { ...stack, updatedAt: new Date().toISOString() };
      } else {
        current.push(stack);
      }
      writeStacks(current);
      onDone?.();
    },
    [onDone],
  );
  return { saveStack };
}

export function useDeleteStack(onDone?: () => void) {
  const deleteStack = useCallback(
    (id: string) => {
      writeStacks(readStacks().filter((s) => s.id !== id));
      onDone?.();
    },
    [onDone],
  );
  return { deleteStack };
}

export function useLoadStack(id: string | undefined) {
  const [stack, setStack] = useState<Stack | undefined>(undefined);
  useEffect(() => {
    if (!id) { setStack(undefined); return; }
    setStack(readStacks().find((s) => s.id === id));
  }, [id]);
  return { stack };
}
