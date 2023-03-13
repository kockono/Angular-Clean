# Arquitectura de inicio de proyecto
[Example](https://github.com/kockono/Angular-Clean)
```
<a href="https://github.com/kockono/Angular-Clean">Example</a>
frontend/src
│      ├── app
│      │    ├── components
│      │          └── components.module.ts
│      │    ├── auth
│      │          └── auth.module.ts
│      │    ├── 404
│      │    ├── helpers
│      │    ├── services
│      │    ├── pipes
│      │    ├── utils
│      │    ├── interfaces
│      │    ├── pages
│      │          ├── pages.routing.ts
│      │          └── pages.module.ts
│      │    ├── models
│      │    ├── shared
│      │          ├── navbar
│      │          ├── breadcrumbs
│      │          └── shared.module.ts
│      │    ├── interceptors
│      │    └── guards
│      ├── assets
│      │    ├── dictionarios
│      │    ├── images
│      │    ├── icons
│      │    ├── js
│      │    ├── mock
│      │    └── css
│      └── app.routing.module.ts
├── node_modules
├── .github
│      └── workflows
│             └── push.yml
├── sonar-project.properties
├── .eslintrc.json
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── CHANGELOG.md
└── README.md
```

# Dependencías importantes
1. [Eslint/Prettier]()
2. [Automatic-Changelog](#Automatic-CHANGELOG)
3. [SonnarQube](#SonnarQube) [(Documentación Oficial)](https://docs.sonarqube.org/latest/)
4. [Sentry](https://sentry.io/welcome/)

<br/>

# Eslint/Prettier
### For Most Recent Version
```sh
ng add @angular-eslint/schematics
```
### For Outdated Versions
```sh
ng add @angular-eslint/schematics@next
```

### Install Prettier and Prettier-ESLint dependencies
```sh
npm i prettier prettier-eslint eslint-config-prettier eslint-plugin-prettier -D
```

### ESLint configuration 
filename: `.eslintrc.json`

[Documentation Eslint ](https://github.com/angular-eslint/angular-eslint#notes-for-eslint-plugin-prettier-users)

```json
{
  "root": true,
  "ignorePatterns": ["projects/**/*"],
  "overrides": [
    {
      "files": ["*.ts"],
      "parserOptions": {
        "project": ["tsconfig.json"],
        "createDefaultProgram": true
      },
      "extends": [
        "plugin:@angular-eslint/recommended",
        "plugin:@angular-eslint/template/process-inline-templates",
        "plugin:prettier/recommended"
      ],
      "rules": {
        "@angular-eslint/component-class-suffix": [
          "error",
          {
            "suffixes": ["Page", "Component"]
          }
        ],
        "@angular-eslint/component-selector": [
          "error",
          {
            "type": "element",
            "prefix": "app",
            "style": "kebab-case"
          }
        ],
        "@angular-eslint/directive-selector": [
          "error",
          {
            "type": "attribute",
            "prefix": "app",
            "style": "camelCase"
          }
        ],
        "@angular-eslint/use-lifecycle-interface": [
          "error"
        ],
        "@typescript-eslint/member-ordering": 0,
        "@typescript-eslint/naming-convention": 0
      }
    },
    {
      "files": ["*.html"],
      "extends": ["plugin:@angular-eslint/template/recommended"],
      "rules": {}
    },
    {
      "files": ["*.html"],
      "excludedFiles": ["*inline-template-*.component.html"],
      "extends": ["plugin:prettier/recommended"],
      "rules": {
        "prettier/prettier": ["error", { "parser": "angular" }]
      }
    }
  ]
}

```


### Prettier Configuration
Filename: `.prettierrc`
```json
{
  "tabWidth": 2,
  "useTabs": false,
  "singleQuote": true,
  "semi": true,
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "trailingComma": "es5",
  "bracketSameLine": true,
  "printWidth": 80
}
```

Filename: `.prettierignore`
```
dist
node_modules
```


### VSCode extensions:
```
dbaeumer.vscode-eslint
esbenp.prettier-vscode
```

### Add the following to your .vscode/settings.json file:
```json
{
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    },
    "editor.formatOnSave": false
  },
  "[typescript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint",
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    },
    "editor.formatOnSave": false
  },
},
"editor.suggest.snippetsPreventQuickSuggestions": false,
"editor.inlineSuggest.enabled": true
```

### añadir en scripts para hacer posibles soluciones
filename: `package.json`
```json
"scripts": {
  "lint:fix": "ng lint --fix"
}
```

<br/>

# Automatic CHANGELOG
### Estructura de proyecto
```
root/
├── .husky/commit-msg
├── CHANGELOG.md
└── package.json
```
### Crea el CHANGELOG.md y guarda el comando .husky/commit-msg en la carpeta .husky
```sh
echo > CHANGELOG.md && mkdir .husky && cd .husky && echo npx commitlint --edit > commit-msg
```

### Configuración basica en package.json
```sh
echo > package.json
```
filename: `package.json`
```json
{
  "name": "nombre_de_la_app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "release": "release-it"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/nombre_del_repositorio.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/nombre_del_repositorio/issues"
  },
  "homepage": "https://github.com/nombre_del_repositorio#readme",
  "dependencies": {
    "@commitlint/cli": "^17.0.3",
    "@commitlint/config-conventional": "^17.0.3",
    "@release-it/conventional-changelog": "^5.0.0",
    "husky": "^8.0.1",
    "release-it": "^15.1.1"
  },
  "release-it": {
    "git": {
      "commitMessage": "chore: release v${version}"
    },
    "github": {
      "release": true
    },
    "npm": {
      "publish": false
    },
    "plugins": {
      "@release-it/conventional-changelog": {
        "infile": "CHANGELOG.md",
        "preset": {
          "name": "conventionalcommits",
          "types": [
            {
              "type": "feat",
              "section": "Features"
            }
          ]
        }
      }
    }
  }
}
```

### SonnarQube
Requisitos: [JDK 11]
#### 1. Pullear la imagen para crear un servidor de sonnarqube
```sh
Server docker run -d --name sonarqube -e SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true -p 9000:9000 sonarqube:latest
```
#### 2. Loguearte en el localhost con en http://localhost:9000/
```sh
user: admin | pass: admin
```
#### 3. Instalar sonar-scanner como dependencias de developer
```sh
npm i sonar-scanner --save-dev
```
#### 4. Agregar en la sección de scripts de package.json el comando
`file: package.json`
```json
"scripts": {
   "sonar": "sonar-scanner"
}
```

#### 5. Crear archivo de configuración en angular en la raíz /
```sh
echo > sonar-project.properties
```
`file: sonar-project.properties`
```sonar-project
# must be unique in a given SonarQube instance
sonar.projectKey=_nameapp
sonar.login=admin
sonar.password=root
# --- optional properties ---

# defaults to project key
sonar.projectName=_nameproyect
# defaults to 'not provided'
sonar.projectVersion=1.0
 
# Path is relative to the sonar-project.properties file. Defaults to .
sonar.sources=src
 
# Encoding of the source code. Default is default system encoding
sonar.sourceEncoding=UTF-8

sonar.exclusions=**/node_modules/**

sonar.test=src
```

#### 6. Correr pruebas de testing
```sh
npm run sonar
```

## Modulos importantes
#### Formularios, Formularios reactivos, Manejo de peticiones de backend
filename: `app.module.ts`
```typescript
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule  } from '@angular/forms';
```
