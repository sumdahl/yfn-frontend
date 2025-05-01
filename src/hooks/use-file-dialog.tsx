import { useCallback, useMemo, useRef, useState } from "react";
import { useIsomorphicEffect } from "./use-isomorphic-effect";


export interface UseFileDialogOptions {
  multiple?: boolean;
  accept?: string;
  capture?: string;
  directory?: boolean;
  resetOnOpen?: boolean;
  initialFiles?: FileList | File[];
  onChange?: (files: FileList | null) => void;
  onCancel?: () => void;
}

const defaultOptions: UseFileDialogOptions = {
  multiple: true,
  accept: "*",
};

function getInitialFilesList(
  files: UseFileDialogOptions["initialFiles"]
): FileList | null {
  if (!files) {
    return null;
  }

  if (files instanceof FileList) {
    return files;
  }

  const result = new DataTransfer();
  for (const file of files) {
    result.items.add(file);
  }

  return result.files;
}

function createInput({
  accept,
  capture,
  directory,
  multiple,
}: UseFileDialogOptions) {
  if (typeof document === "undefined") return null;

  const input = document.createElement("input");
  input.type = "file";

  if (accept) input.accept = accept;
  if (multiple) input.multiple = multiple;
  if (capture) input.capture = capture;
  if (directory) input.webkitdirectory = directory;

  input.style.display = "none";
  return input;
}

export function useFileDialog(input: UseFileDialogOptions = {}) {
  const options: UseFileDialogOptions = useMemo(
    () => ({ ...defaultOptions, ...input }),
    [input]
  );
  const { initialFiles, onChange, resetOnOpen } = options;
  const [files, setFiles] = useState<FileList | null>(
    getInitialFilesList(initialFiles)
  );
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = useCallback(
    (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target?.files) {
        setFiles(target.files);
        onChange?.(target.files);
      }
    },
    [onChange]
  );

  const createAndSetupInput = useCallback(() => {
    inputRef.current?.remove();
    inputRef.current = createInput(options);

    if (inputRef.current) {
      inputRef.current.addEventListener("change", handleChange, { once: true });
      document.body.append(inputRef.current);
    }
  }, [options, handleChange]);

  useIsomorphicEffect(() => {
    createAndSetupInput();
    return () => inputRef.current?.remove();
  }, []);

  const reset = useCallback(() => {
    setFiles(null);
    onChange?.(null);
  }, [onChange]);

  const open = useCallback(() => {
    if (resetOnOpen) {
      reset();
    }

    createAndSetupInput();
    inputRef.current?.click();
  }, [resetOnOpen, reset, createAndSetupInput]);

  return { files, open, reset } as const;
}
