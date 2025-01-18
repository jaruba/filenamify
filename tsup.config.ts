import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['index.d.ts'],
    format: ['esm', 'cjs'],
    splitting: true,
    sourcemap: true,
    clean: true,
    dts: true,
})