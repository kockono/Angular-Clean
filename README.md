[Example](https://github.com/kockono/Angular-Clean)

# Dependencías importantes (Angular 15.2.4)
1. [Arquitectura de inicio de proyecto](#arquitectura-de-inicio-de-proyecto)
2. [Models](#modelos)
3. [Interfaces](#interfaces)
4. [Types](#types)
5. [Resolvers](#resolvers)[(Documentacion-Oficial)](https://angular.io/api/router/Resolve)
6. [Guards](#guards)
7. [Helpers](#helpers)
8. [Utils](#utils)
9. [Interceptors](#interceptors)
5. [Eslint Prettier](#eslint-prettier) [(Documentación Prettier)](https://prettier.io/) [(Documentación Eslint)](https://eslint.org/)
6. [Automatic-Changelog](#Automatic-CHANGELOG) [(Documentacion Commits)](https://www.conventionalcommits.org/en/v1.0.0/)
7. [SonnarQube](#SonnarQube) [(Documentación Oficial)](https://docs.sonarqube.org/latest/)
8. [Sentry](#Sentry) [(Documentación Oficial)](https://sentry.io/for/angular/)
9. [Cypress](#Cypress) [(Documentación Oficial)](https://docs.cypress.io/guides/getting-started/installing-cypress)
10. [Karma](#karma-config) [(Documentación Oficial)](https://karma-runner.github.io/latest/index.html)

## Arquitectura de inicio de proyecto
```sh
frontend/src/
│      ├── app
│      │    ├── components
│      │    │     ├── component-name
│      │    │     │    ├── name.validation.component.ts
│      │    │     │    ├── name.component.ts
│      │    │     │    ├── name.component.html
│      │    │     │    └── name.component.scss
│      │    │     └── components.module.ts
│      │    ├── auth
│      │          └── auth.module.ts
│      │    ├── 404
│      │    ├── helpers
│      │    ├── services
│      │    ├── pipes
│      │    ├── utils
│      │          └── confirm-toast.ts
│      │    ├── interfaces
│      │    ├── resolvers
│      │          └── servicio.resolver.ts
│      │    ├── pages
│      │          ├── pages.routing.ts
│      │          └── pages.module.ts
│      │    ├── models
│      │    ├── shared
│      │          ├── navbar.ts
│      │          ├── breadcrumbs.ts
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
│      ├── app.component.ts
│      ├── app.module.ts
│      └── app.routing.module.ts
├── node_modules/
├── .github
│      └── workflows
│             ├── build.yml
│             └── lint.yml
├── sonar-project.properties
├── .eslintrc.json
├── .eslintignore
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── CHANGELOG.md
└── README.md
```

#### Si existe un componente complejo con demasiadas interfaces, se puede crear una carpeta de modelos y interfaces en el componente
```sh
├── components
│      ├── component-name
│      │    ├── models
│      │    ├── interfaces
│      │    ├── name.validation.component.ts
│      │    ├── name.component.ts
│      │    ├── name.component.html
│      │    └── name.component.scss
```
## Configuración Tsconfig
```sh
{
  "compileOnSave": false,
  "exclude": ["karma.conf.ts"],
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "ES2022",
    "module": "ES2022",
    "useDefineForClassFields": false,
    "lib": [
      "ES2022",
      "dom"
    ]
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  }
}
```
#### Usar Exclude para ignorar archivos

## Modelos
Se utilizan en formularios o se requiere una funcionalidad extra a solo la data, en este ejemplo con los datos obtenidos creamos el nombre completo del usuario
```ts
export class ProductosModel {
  
  constructor(
      public id        : number,
      public nombres   : string,
      public apellido  : string,
      public apellido2 : string,
  ) { }
  
  get nombreCompleto() {
    return `${nombres} ${apellido} ${apellido2}`
  }
}
```

## Interfaces
Cuando tus datos no se veran modificados, datos provinientes del backend, un ejemplo sería la una petición http
### Ejemplos
```ts
export interface UsuarioInterface {
  id        : number;
  nombres   : string;
  apellido  : string;
  apellido2 : string;
}
```

```ts
return this.http.get<UsuarioInterface>('http://localhost:3200/api/getUsuarios');
```

## Types
Utilizado cuando existe solo ciertos criterios o posibles casos
```ts
type EstadoCivil = 'soltero' | 'casado' | 'divorciado' | 'viudo' | 'union libre';
```
## Resolvers
Permite recuperar la informacion antes de que se cargue, un ejemplo es cuando hacemos click a un link y queremos precargar la información o en un buscador antes de hacer click al producto pre cargar la información del producto.
```ts
export class ProductosResolver implements Resolve<Observable<ProductosEntity>> {

  constructor( public service:EndpointsService) { }

  resolve(route: ActivatedRouteSnapshot ){
    return this.service.getProducto().pipe(
      catchError( error => of(error));
  }  
}
```

## Eslint Prettier

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

[Documentation Eslint](https://github.com/angular-eslint/angular-eslint#notes-for-eslint-plugin-prettier-users)

```json
{
  "root": true,
  "ignorePatterns": [
    "projects/**/*"
  ],
  "overrides": [
    {
      "files": [
        "*.ts"
      ],
      "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@angular-eslint/recommended",
        "plugin:@angular-eslint/template/process-inline-templates",
        "strict"
      ],
      "rules": {
        "@angular-eslint/directive-selector": [
          "error",
          {
            "type": "attribute",
            "prefix": "app",
            "style": "camelCase"
            
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
        "max-len": [
          "error",
          {
              "code": 130 ,
              "ignoreComments": true,
              "ignoreUrls": true,
              "ignoreStrings": true,
              "ignoreTemplateLiterals": true
          }
        ],
        "max-nested-callbacks": ["error", 3], // Maximo de anidación en Ifs, functions etc.
        "max-lines-per-function": [ "warn", { "max": 20, "skipBlankLines": true, "skipComments": true } ],
        "@typescript-eslint/no-inferrable-types": [
          2,
          {
            "ignoreParameters": true,
            "ignoreProperties": true
          }
        ]
      }
    },

    {
      "files": [
        "*.html"
      ],
      "extends": [
        "plugin:@angular-eslint/template/recommended"
      ],
      "rules": {}
    }
  ]
}

```

### Ignorar Archivos 
Filename `.eslintignore`
```sh
karma.conf.ts
.gitignore
.scannerwork/
.husky/
.eslintrc.json
.angular
.github
dist/
cypress/
```

### ESLint Action Yaml 
Nos permite validar el eslint a la hora de subir el proyecto o mergearlo a la arma main
</br>

Filename `liny.yml`
```yaml
name: CI

on: [push, pull_request]
# on:
#   push: # Any time you push in master will check de compile
#     branches: [ master ]
#   pull_request:
#     branches: [ master ]

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node: ['14.x']

    steps:
      - uses: actions/checkout@v1
      - name: Use Node.js
        uses: actions/setup-node@v1
        with:
          node-version: ${{ matrix.node }}
      - name: Install dependencies
        run: npm install
      - name: Lint
        run: npm run lint
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
echo > CHANGELOG.md && mkdir .husky && cd .husky && echo npx commitlint --edit > commit-msg && cd ..
```

### Configuración basica en package.json
```sh
npm init
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

## Guards
```ts

```

## Helpers
Las funciones helpers resuelven, son  una forma de agrupar funciones de uso común, destinadas a servir de ayuda a otros procesos, como lo son son formularios entre otros.
En este ejemplo valida un formulario que sea valido y tambien toca todos los campos inputs para validar que no esten vacios
```ts
export function isValidForm2(simpleForm:any):boolean {
  
  if ( simpleForm.invalid ) { return false; }

    Object.values(simpleForm.controls).forEach((control) => {
      if (control instanceof FormGroup) 
        Object.values(control.controls).forEach((control) => control.markAsTouched());
      else 
        simpleForm.markAllAsTouched();
    });
    return true;
}
```

## Utils
```ts

```

## SonnarQube
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

## Karma Config

Filename: `karma.conf.ts`
```ts
// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/flash'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome','ChromeHeadless'],
    customLaunchers: {
      ChromeHeadlessCI: { 
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'],
      }
    },
    singleRun: false,
    restartOnFileChange: true
  });
};
```
#### Importar karma en el archivo de configuración de angular

filename: `angular.json`
```json
"test": {
  "builder": "@angular-devkit/build-angular:karma",
  "options": {
    "karmaConfig": "karma.conf.js",
    "main": "src/test.ts",
    "polyfills": "src/polyfills.ts",
    "tsConfig": "tsconfig.spec.json",
    "assets": [
      "src/favicon.ico",
      "src/assets"
    ],
    "styles": [
      "src/styles.scss"
    ],
    "scripts": []
  }
}
```


## Modulos importantes
#### Formularios, Formularios reactivos, Manejo de peticiones de backend
filename: `app.module.ts`
```typescript
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule  } from '@angular/forms';
```

# CleanArquitecture

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
