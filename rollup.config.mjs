import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
    input: 'src/cli.ts',
    output: {
        file: 'dist/cli.js',
        format: 'es',
        banner: '#!/usr/bin/env node', // CRITICAL
    },
    plugins: [
        resolve({ preferBuiltins: true }),
        commonjs(),
        typescript(),
    ],
    external: ['fs-extra', 'path', 'url'], // Keep node-related libs external
};