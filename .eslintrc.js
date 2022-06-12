module.exports = {
    "extends": "standard",
    "plugins": [
        "standard",
        "promise"
    ],
    "rules": {
        "semi": [2, "always"],
        "max-len": ["error", 120, 2, {
            ignoreUrls: true,
            ignoreComments: false,
            ignoreRegExpLiterals: true,
            ignoreStrings: false,
            ignoreTemplateLiterals: false,
        }],
    }
};
