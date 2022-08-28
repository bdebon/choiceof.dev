const path = require("path");
const rootMain = require('../../../../.storybook/main');


module.exports = {
  stories: [
    ...rootMain.stories,
    '../src/lib/**/*.stories.mdx',
    '../src/lib/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    ...rootMain.addons,
    '@nrwl/react/plugins/storybook',
    "@storybook/addon-links",
    "@storybook/addon-interactions",
  ],
  staticDirs: ['../src/lib'],
  framework: "@storybook/react",
  core: { ...rootMain.core, builder: 'webpack5' },
  webpackFinal: async (config, { configType }) => {
    if (rootMain.webpackFinal) {
      config = await rootMain.webpackFinal(config, { configType });
    }

    console.log('and here ?')
    // main.js copied pasted from here https://github.com/tailwindlabs/tailwindcss/discussions/6570
    // but it does not seems to work with my project configuration. As soon as I uncomment the below lines
    // the compilation crash and I can't find why.

    // config.module.rules.push({
    //   test: /\.css$/,
    //   use: [
    //     {
    //       loader: "postcss-loader",
    //       options: {
    //         postcssOptions: {
    //           plugins: [require("tailwindcss"), require("autoprefixer")],
    //         },
    //       },
    //     },
    //   ],
    //   include: path.resolve(__dirname, "../"),
    //
    // });

    return config;
  },
};
