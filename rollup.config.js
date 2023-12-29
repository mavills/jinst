import {nodeResolve} from "@rollup/plugin-node-resolve"
export default {
        input: 'src/main.mjs',
        watch: true,
        output: { file: 'src/main.bundle.js', format: 'iife' },
    plugins: [nodeResolve()]
};