module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "jest/globals": true,
        "cypress/globals": true
    },
    "extends": [
        "standard",
        "plugin:react/recommended"
    ],
    "overrides": [
        {      
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",  "cypress", "jest"
    ],
    "rules": {
      "indent": [
          "error",
          2
      ],
      "quotes": [
          "error",
          "single"
      ],
      "semi": [
          "error",
          "never"
      ],
      "eqeqeq": "error",
      "no-trailing-spaces": "error",
      "object-curly-spacing": [
          "error", "always"
      ],
      "arrow-spacing": [
          "error", { "before": true, "after": true }
      ],
      "no-console": 0,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": 0,
      "no-unused-vars": 0    
    },
}
