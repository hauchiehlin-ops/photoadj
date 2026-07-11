/* tslint:disable */
/* eslint-disable */

/**
 *
 * * Transforms sRGB pixel buffer (RGB) to CMYK using the provided target ICC Profile.
 * * If the profile is empty or invalid, falls back to a mathematical RGB->CMYK conversion.
 *
 */
export function convert_rgb_to_cmyk_wasm(rgb_data: Uint8Array, icc_profile_bytes: Uint8Array): Uint8Array;

/**
 *
 * * Encodes raw CMYK pixel data into a standard TIFF container.
 *
 */
export function encode_cmyk_tiff_wasm(cmyk_data: Uint8Array, width: number, height: number): Uint8Array;

/**
 *
 * * Encodes raw CMYK data into a PDF/X-1a compliant document with TrimBox, BleedBox, and OutputIntent.
 *
 */
export function generate_pdf_x_wasm(cmyk_data: Uint8Array, width: number, height: number, dpi: number, icc_profile_bytes: Uint8Array, bleed_mm: number): Uint8Array;

export function init_panic_hook(): void;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly convert_rgb_to_cmyk_wasm: (a: number, b: number, c: number, d: number) => [number, number, number, number];
    readonly encode_cmyk_tiff_wasm: (a: number, b: number, c: number, d: number) => [number, number, number, number];
    readonly generate_pdf_x_wasm: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => [number, number, number, number];
    readonly init_panic_hook: () => void;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __externref_table_dealloc: (a: number) => void;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
