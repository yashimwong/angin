module.exports = {
    addons: ['@storybook/addon-essentials'],
    core: {
        builder: 'webpack5',
    },
    stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx)'],
};
