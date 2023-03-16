[Example](https://github.com/kockono/Angular-Clean)

# Dependencías importantes
1. [Arquitectura de inicio de proyecto](#Arquitectura-de-inicio-de-proyecto)
2. [Models](#Modelos)
3. [Interfaces](#Interfaces)
4. [Types](#Types)
5. [Resolvers]
6. [Guards]
7. [Helpers]
8. [Utils]
5. [Eslint/Prettier](#Eslint/Prettier) [(Documentación Prettier)](https://prettier.io/) [(Documentación Eslint)](https://eslint.org/)
6. [Automatic-Changelog](#Automatic-CHANGELOG) [(Documentacion Commits)](https://www.conventionalcommits.org/en/v1.0.0/)
7. [SonnarQube 9.9](#SonnarQube) [(Documentación Oficial)](https://docs.sonarqube.org/latest/)
8. [Sentry](#Sentry) [(Documentación Oficial)](https://sentry.io/for/angular/)
9. [Cypress](#Cypress) [(Documentación Oficial)](https://docs.cypress.io/guides/getting-started/installing-cypress)

## Arquitectura de inicio de proyecto
```
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
│      │    ├── resolver
│      │          └── servicio.resolver.ts
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

<br/>

# Modelos
#### 
```ts
export class ProductosModel {
  
  constructor(
      public id        : number,
      public nombres   : apellido;
      public apellido  : string;
      public apellido2 : string;
  ) { }
  
  get nombreCompleto() {
    return `${nombres} ${apellido} ${apellido2}`
  }
}
```

# Interfaces
#### Cuando tus datos no se veran modificados, datos provinientes del backend, o no requieras instanceas, un ejemplo sería la una petición http
### Ejemplos
```ts
export interface UsuarioInterface {
  id        : number;
  nombres   : apellido;
  apellido  : string;
  apellido2 : string;
}
```

```ts
return this.http<UsuarioInterface>('http://localhost:3200/api/getUsuarios');
```

# Types
#### Utilizado cuando existen ciertos tipos del campo 
```ts
type EstadoCivil = 'soltero' | 'casado' | 'divorciado' | 'viudo' | 'union libre'
```

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
            },
            {
              "type": "fix",
              "section": "Bug Fixes"
            }
          ]
        }
      }
    }
  }
}
```
#### Crear release
```sh
npm run release
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
## Sentry
### for Angular 12 or newer:
```sh
npm install @sentry/angular-ivy
```
### for Angular 10 and 11:
```sh
npm install @sentry/angular
```

```ts
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { NgModule, ErrorHandler } from "@angular/core";
// import * as Sentry from "@sentry/angular"; // for Angular 10 and 11 instead
import * as Sentry from "@sentry/angular-ivy";

Sentry.init({
  dsn: "https://<key>@sentry.io/<project>"
});

@NgModule({
  // ...
  providers: [
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: true,
      }),
    },
  ],
  // ...
})
class AppModule {}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(success => console.log('Bootstrap success'))
  .catch(err => console.error(err));
```

## Cypress
```sh
npm install cypress --save-dev
```

## Modulos importantes
#### Formularios, Formularios reactivos, Manejo de peticiones de backend
filename: `app.module.ts`
```typescript
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule  } from '@angular/forms';
```
