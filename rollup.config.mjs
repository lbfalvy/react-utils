import peerDepsExternal from "rollup-plugin-peer-deps-external";
import commonjs from "@rollup/plugin-commonjs";
import ts from 'rollup-plugin-ts';
import dts from 'rollup-plugin-dts';
import { dirname } from 'path';
import pkg from './package.json' assert { type: "json" };

const baseConfig = {
    input: 'src/index.ts'
}

export default [{
    ...baseConfig,
    output: [{
        dir: dirname(pkg.main),
        format: 'cjs',
        sourcemap: 'inline',
        preserveModules: true
    }, {
        dir: dirname(pkg.module),
        format: 'esm',
        sourcemap: 'inline',
        preserveModules: true
    }],
    plugins: [
        peerDepsExternal(), // React
        ts(),
        commonjs(),
    ]
}, {
    ...baseConfig,
    output: {
        dir: dirname(pkg.types),
        format: 'esm',
        preserveModules: true
    },
    plugins: [dts()]
}]