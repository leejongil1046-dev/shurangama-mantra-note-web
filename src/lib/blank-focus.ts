export function focusFirstBlankInContainer(
  container: HTMLElement | null,
): void {
  const input = container?.querySelector<HTMLInputElement>(
    "input[data-blank-global-index]",
  );
  input?.focus();
}

export function focusLastBlankInContainer(
  container: HTMLElement | null,
): void {
  const inputs = container?.querySelectorAll<HTMLInputElement>(
    "input[data-blank-global-index]",
  );
  const last = inputs?.item(inputs.length - 1);
  if (last) {
    last.focus();
    last.setSelectionRange(last.value.length, last.value.length);
  }
}
