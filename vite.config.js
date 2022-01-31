import { defineConfig } from 'vite';
const path = require('path');

export default defineConfig({
    resolve: {
        alias: [
            { find: '@', replacement: './src' },
            { find: '@styles', replacement: path.resolve(__dirname, './src/styles/') },
            { find: '@constants', replacement: path.resolve(__dirname, './src/scripts/constants') },
            { find: '@controllers', replacement: path.resolve(__dirname, './src/scripts/controllers') },
            { find: '@modules', replacement: path.resolve(__dirname, './src/scripts/modules') },
            { find: '@utils', replacement: path.resolve(__dirname, './src/scripts/utils') },
            { find: '@modulesStyles', replacement: path.resolve(__dirname, './src/styles/modules') },
        ],
    },
});
