[Example](https://github.com/kockono/Angular-Clean)

#  Angular 17.0.1 (Rxjs 7.0)
1. [Arquitectura de inicio de proyecto](#arquitectura-de-inicio-de-proyecto)
2. [Models](#modelos)
3. [Interfaces](#interfaces)
4. [Types](#types)
5. [Directives](#Directives)
6. [Resolvers](#resolvers)[(Documentacion-Oficial)](https://angular.io/api/router/Resolve)
7. [Guards](#guards)
8. [Helpers](#helpers)
9. [Utils](#utils)
10. [Interceptors](#interceptors)
11. [Eslint Prettier](#eslint-prettier) [(Documentación Prettier)](https://prettier.io/) [(Documentación Eslint)](https://eslint.org/)
12. [Automatic-Changelog](#Automatic-CHANGELOG) [(Documentacion Commits)](https://www.conventionalcommits.org/en/v1.0.0/)
13. [SonnarQube](#SonnarQube) [(Documentación Oficial)](https://docs.sonarqube.org/latest/)
14. [Sentry](#Sentry) [(Documentación Oficial)](https://sentry.io/for/angular/)
15. [Cypress](#Cypress) [(Documentación Oficial)](https://docs.cypress.io/guides/getting-started/installing-cypress)
16. [Karma](#karma-config) [(Documentación Oficial)](https://karma-runner.github.io/latest/index.html)
17. [Documentacion-codigo](#Documentacion-codigo)

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
│      │    │     └── servicio.resolver.ts
│      │    ├── pages
│      │    │     ├── pages.routing.ts
│      │    │     └── pages.module.ts
│      │    ├── models
│      │    ├── shared
│      │    │     ├── navbar.ts
│      │    │     ├── breadcrumbs.ts
│      │    │     └── shared.module.ts
│      │    ├── guards
│      │    ├── app.module.ts
│      │    ├── app.routing.module.ts
│      │    ├── interceptors
│      │    └── app.component.ts
│      ├── enviroments
│      └── assets
│      │    ├── dictionarios
│      │    ├── images
│      │    ├── icons
│      │    ├── js
│      │    ├── mock
│      │    └── css
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
  "exclude": ["karma.conf.js"],
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
## Resolvers (Deprecrate 6.4 Rxjs)
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
### Implementacion en tu component.ts
```ts
  private carritoSubscription !: Subscription;

  this.carritoSubscription = this.route.data.subscribe((data: any) => {
          // Manejo de logica aquí
    })
```
Obtenemos la data de `route.data.subscribe()`, como si fuera un observador

### Implementación en tu app.routing.ts
```ts
  {
    path : 'carrito-paso-uno', 
    data: { title: 'Carrito' },
    component: CarritoPasoUnoComponent,
    resolve: [() => inject(CarritoResolver).resolve()]
  },
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
karma.conf.js
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
### Crear .gitignore
```sh
echo > .gitignore "node_modules/ \n.husky \npackage-lock.json" 
```
### Instalar Husky
```sh
npm i -D husky
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
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthUserGuard {
export class AuthUserGuard {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return true;
  }
}

export const IsAuthUserGuard: CanActivateFn = ( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ):boolean => {
  return inject(AuthUserGuard).canActivate(route, state);
}
```
`note:` CanActivate fue depreciado en la versión 15 de Angular

###### Simple Mode
```ts
export const IsAuthUserGuard: CanActivateFn = ( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ):boolean => {
  return true;
}
```

## Helpers
Las funciones helpers resuelven, son  una forma de agrupar funciones de uso común, destinadas a servir de ayuda a otros procesos, como lo son son formularios entre otros.
En este ejemplo valida un formulario que sea valido y tambien toca todos los campos inputs para validar que no esten vacios
```ts
import { FormGroup } from '@angular/forms';

export function isValidForm(simpleForm:FormGroup):boolean {
  
  if ( !simpleForm.invalid ) { return false; }

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
Son generalmente utilidades con proposito de crear cosas genericas que pueden ser utilizadas en múltiples áreas del código. Un ejemplo claro podría ser alertas globales, toas globales que solo reciban como parametro algun mensaje, alguna promesa etc.
```ts
export class SweetAlertUtil {

  successNotification( { title = 'Operación exitosa', html = '' } = {}) {
    Swal.fire({
      icon: 'success',
      title,
      html,
      showConfirmButton: false,
      timer: 1500
    })
  }

  alertConfirmation(
    title               : string = '¿Deseas continuar con esta acción?',
    text                : string = 'Este proceso es irreversible.',
    imageUrl            : string = 'assets/icons2/verify.svg',
    imageWidth          : number =  400,
    imageHeight         : number =  200,
    confirmButtonText   : string = 'Aceptar',
    cancelButtonText    : string = 'Cancelar',
  ) : Promise<boolean> {
      return new Promise( resolve => { 
          Swal.fire({
            title,
            text,
            imageUrl,
            imageWidth,
            imageHeight,
            showCancelButton: true,
            reverseButtons: true,
            cancelButtonText,
            confirmButtonText,
            cancelButtonColor: 'transparent',
            confirmButtonColor: '#A8227F',
            customClass: {
              cancelButton: 'btn-outline-blue'
            }
          }).then((result) => {
            if (result.value) {
              Swal.fire({
                icon: 'success',
                title: 'Acción Realizada!',
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 1500
              })
              resolve(true);
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire({
                icon: 'error',
                title: 'Cancelado',
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 1500
              })
              resolve(false);
            }
    });
});
}

  errorNotification(message:string = 'Error 404') {
    Swal.fire('Error', message, 'error');
  }

}
```

## Interceptors
Permite interceptar la informacion de las peticiones http, util para el manejo de errores de manera global
file: ````
```ts
import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler,  HttpInterceptor, HttpRequest } from '@angular/common/http';

// Rxjs
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorHandleErrorsService implements HttpInterceptor {

 /**
 *  En esta sección tenemos el manejo de errores antes de que se haga la petición, este interceptor afecta a todos los.
 *  servicios de la aplicación
 */
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const cloneRequest = req.clone();

    return next.handle( cloneRequest ).pipe(
      catchError( this.handleError )
    );
  }


private handleError(error: HttpErrorResponse, caught: Observable<HttpEvent<any>>) {
  console.log(error)
  let message:string;

  if (error.status == 400) {
    message = error.error[0];
  }
  else if (error.status == 422) {
    // A client-side or network error occurred. Handle it accordingly.
    message = error.error.errors;
    console.error(error.error.errors);
  }
  else if(error.status == 401) {
    message = 'Se ha presentado un error de autorización: '+ error.error.message;
    console.error(message);
  }
  else if(error.status == 499) {
    // A timeout error
    message = 'Se ha presentado un error de tiempo: '+ error.error.message;
    console.error(message);
  }
  else if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    message = 'Se ha presentado un error: ' + error.error.message;
    console.error(message);
  }
  else if (error.status == 404) {
    // A client-side or network error occurred. Handle it accordingly.
    message = 'Se ha presentado un error, por favor intente más tarde. (00):';
    console.error('El servicio devolvió un error código ' + error.status + ' con mensaje: ' + error.message);
  }
  else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    message = 'Se ha presentado un error, por favor intente más tarde. error code: ' + error.status + ' error: ' + error.message;
    console.error('El servicio devolvió un error código ' + error.status + ' con mensaje: ' + error.message);
  }
  if(error.status == 500) {
    message = 'Se ha presentado un error en el servidor, intentelo mas tarde: ' + error.status + ' error: ' + error.message;
  }
  return throwError(( ) => new Error(message));

}

}
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
#### Importante importarlo en 
Filename: Angular.json`
```json
 "test": {
          "builder": "@angular-devkit/build-angular:karma",
          "options": {
            "karmaConfig": "karma.conf.js",
            "polyfills": [
              "zone.js",
              "zone.js/testing"
            ],
            "tsConfig": "tsconfig.spec.json"
```
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
# Documentacion
La documentación permite tener comprensión en los procesos, metodos, variables etc.
referencia: https://tsdoc.org/

### Documentación de variables
En esta sección permite saber que tipos de usuario existen y donde se obtiene el tipo del usuario linkeando al metodo tambien podemos poner un @example
```ts
  /** 
   * @property {string} tipoUsuario : Guarda el tipo de usuario {@link getUserInfo()}
   * @example 'cliente' | 'marca'
   */
  public tipoUsuario  : string  = '';
```

### Documentación en 1 sola linea
```ts
/** Guarda el estado del usuario {@link isLogged()} */
```

### Documentación de metodos
Podemos utilizar @author para saber quien creo la sección, la versión comunmente es mas utilizada en clases o componentes globales, un dato importante
el @link solo funcionara si se encuentra dentro de la clase o si es una function fuera de la clase, también podemos usar function si no esta dentro de una clase
```ts
  /**
  * @author Chris Cobos
  * @version 1.0.0
  * 
  * @method {@link buscarProducto()}      - Busca producto por evento change
  * @method {@link obtenerProductos()}    - Obtiene los productos por nombre con un limitante de 1 busqueda cada 1.5 segundos
  * @method {@link buscarProductoEnter()} - Busca productos por evento de key press {enter}
  * @method {@link navigate()}            - Navega a la categoria seleccionada
  */
```
### Documentación de parametros
```ts
 /**
 * @param {CuponInterface} cupon            - Cupon a aplicar
 * @param {ProductoInterface[]} dataCarrito - Productos del carrito, se usaran para ver el descuento que tendra
 * @param {MessageService} messageService   - Servicio de mensajes de primeng
 */
```
### Documentación de componentes
Podemos dar una descripción y los casos de usos que pueden existir en el componente
```ts
 /**
 * @author Chris Cobos
 * @version 1.0.0
 * ------------------------------------- DESCRIPCION -----------------------------------------------------------------------------
 * se encarga de aplicar los descuentos de los cupones a los productos del carrito de compras
 * 
 * ------------------------------------- ALCACNCE DE LOS CUPONES -----------------------------------------------------------------
 * 1. Descuento por todos los productos marca, solo aplicara en productos de la marca
 * 2. Descuento por producto especifico marca, solo aplicara en el producto especifico de la marca
 * 3. Descuento por categoria, solo aplicara en productos de la categoria
 */
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
