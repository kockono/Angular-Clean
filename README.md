[Example](https://github.com/kockono/Angular-Clean)

#  Angular 20 LTS (RxJS 7.x)
1. [Arquitectura de inicio de proyecto](#arquitectura-de-inicio-de-proyecto)
2. [Models](#modelos)
3. [Interfaces](#interfaces)
4. [Types](#types)
5. [Directives](#Directives)
6. [Resolvers](#resolvers)
7. [Guards](#guards)
8. [Helpers](#helpers)
9. [Utils](#utils)
10. [Interceptors](#interceptors)
11. [Signals](#Signals) ⭐ nuevo
12. [Control-Flow](#Control-Flow) ⭐ nuevo
13. [Eslint Prettier](#eslint-prettier) [(Documentación Prettier)](https://prettier.io/) [(Documentación Eslint)](https://eslint.org/)
14. [Automatic-Changelog](#Automatic-CHANGELOG) [(Documentacion Commits)](https://www.conventionalcommits.org/en/v1.0.0/)
15. [SonnarQube](#SonnarQube) [(Documentación Oficial)](https://docs.sonarqube.org/latest/)
16. [Sentry](#Sentry) [(Documentación Oficial)](https://sentry.io/for/angular/)
17. [Cypress](#Cypress) [(Documentación Oficial)](https://docs.cypress.io/guides/getting-started/installing-cypress)
18. [Karma](#karma-config) [(Documentación Oficial)](https://karma-runner.github.io/latest/index.html)
19. [Documentacion-codigo](#Documentacion-codigo)
20. [Performance](#Performance)
21. [Bundle](#Bundle)

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
```json
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
    "experimentalDecorators": true,
    "moduleResolution": "bundler",
    "importHelpers": true,
    "verbatimModuleSyntax": true,
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
> `"moduleResolution": "bundler"` — reemplaza `"node"` en Angular 17+, optimizado para bundlers modernos (esbuild/Vite).
> `"verbatimModuleSyntax": true` — fuerza el uso de `import type` cuando corresponde, mejorando el bundle automáticamente.

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
> ⚠️ `Resolve<T>` (clase) fue deprecado en Angular 14.2. Usá **functional resolvers** con `inject()`.

Permite recuperar la información antes de que el componente se cargue. Ideal para precargar datos de un producto antes de navegar a su detalle.

### Functional Resolver (Angular 15+, recomendado)
```ts
// products.resolver.ts
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import type { ProductInterface } from '../interfaces/product.interface';

export const productsResolver: ResolveFn<ProductInterface[]> = (route, state) => {
  return inject(ProductsService).getAll();
};
```

### Implementación en el routing
```ts
// app.routing.ts
{
  path: 'products',
  component: ProductsComponent,
  resolve: { products: productsResolver }
}
```

### Consumir la data en el componente
```ts
// products.component.ts
import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import type { ProductInterface } from '../interfaces/product.interface';

export class ProductsComponent {
  private route = inject(ActivatedRoute);
  products: ProductInterface[] = this.route.snapshot.data['products'];
}
```

# Signals

Los Signals son el nuevo sistema reactivo de Angular (estable desde v17). Reemplazan gradualmente a `@Input`, `@Output`, `@ViewChild` y el modelo basado en Zone.js.

## signal() — estado local
```ts
import { signal, computed, effect } from '@angular/core';

count = signal(0); // WritableSignal<number>

increment() {
  this.count.update(v => v + 1); // actualiza con función
  // o: this.count.set(5);       // reemplaza el valor
}
```

## computed() — valores derivados
```ts
price    = signal(100);
quantity = signal(3);
total    = computed(() => this.price() * this.quantity()); // solo recalcula si sus dependencias cambian
```

## effect() — efectos secundarios
```ts
constructor() {
  effect(() => {
    console.log('El total cambió:', this.total()); // se ejecuta cada vez que total() cambia
  });
}
```

## input() — reemplaza @Input
```ts
import { input } from '@angular/core';

// Opcional con valor por defecto
title = input('Sin título');

// Requerido — lanza error en compilación si no se pasa
productId = input.required<number>();
```

## output() — reemplaza @Output + EventEmitter
```ts
import { output } from '@angular/core';

productSelected = output<number>();

select(id: number) {
  this.productSelected.emit(id);
}
```

## model() — two-way binding con signals
```ts
import { model } from '@angular/core';

// En el componente hijo
value = model<string>('');

// En el template del padre
<app-input [(value)]="mySignal" />
```

## viewChild() / viewChildren() — reemplaza @ViewChild
```ts
import { viewChild, viewChildren, ElementRef } from '@angular/core';

inputRef   = viewChild<ElementRef>('inputRef');           // Signal<ElementRef | undefined>
listItems  = viewChildren<ElementRef>('item');            // Signal<readonly ElementRef[]>
```

## linkedSignal() — signal derivado y modificable (Angular 19+)
```ts
import { linkedSignal } from '@angular/core';

// Se recalcula cuando source cambia, pero también puede modificarse manualmente
selectedIndex = linkedSignal(() => this.items().length > 0 ? 0 : -1);
```

## resource() y httpResource() — datos async como signals (Angular 19+)
```ts
import { resource, httpResource } from '@angular/core';

// httpResource — petición HTTP directa como signal
products = httpResource<ProductInterface[]>('/api/products');

// En el template
@if (products.isLoading()) { <span>Cargando...</span> }
@for (p of products.value() ?? []; track p.id) { <li>{{ p.name }}</li> }
```

---

# Control-Flow

Angular 17+ reemplaza `*ngIf`, `*ngFor` y `*ngSwitch` con una nueva sintaxis de control de flujo nativa. Es más legible y tiene mejor rendimiento.

## @if / @else if / @else — reemplaza *ngIf
```html
<!-- ❌ Antes -->
<div *ngIf="isLogged; else guestBlock">Bienvenido</div>
<ng-template #guestBlock><div>Invitado</div></ng-template>

<!-- ✅ Ahora -->
@if (isLogged) {
  <div>Bienvenido</div>
} @else if (isPending) {
  <div>Verificando...</div>
} @else {
  <div>Invitado</div>
}
```

## @for — reemplaza *ngFor (track es OBLIGATORIO)
```html
<!-- ❌ Antes -->
<li *ngFor="let product of products; trackBy: trackById">{{ product.name }}</li>

<!-- ✅ Ahora — track es parte de la sintaxis, no opcional -->
@for (product of products; track product.id) {
  <li>{{ product.name }}</li>
} @empty {
  <li>No hay productos.</li>
}
```
> `@empty` es un bloque nuevo que se muestra cuando el array está vacío — en *ngFor necesitabas un *ngIf extra.

## @switch — reemplaza ngSwitch
```html
<!-- ❌ Antes -->
<div [ngSwitch]="status">
  <span *ngSwitchCase="'active'">Activo</span>
  <span *ngSwitchCase="'inactive'">Inactivo</span>
  <span *ngSwitchDefault>Desconocido</span>
</div>

<!-- ✅ Ahora -->
@switch (status) {
  @case ('active')   { <span>Activo</span>   }
  @case ('inactive') { <span>Inactivo</span> }
  @default           { <span>Desconocido</span> }
}
```

## @defer — carga diferida declarativa
Cargá componentes pesados solo cuando sean necesarios. Angular crea un chunk separado automáticamente.
```html
<!-- Carga cuando el bloque entra en el viewport -->
@defer (on viewport) {
  <app-heavy-chart />
} @placeholder {
  <div class="skeleton">Cargando gráfico...</div>
} @loading (minimum 300ms) {
  <app-spinner />
} @error {
  <p>Error al cargar el componente.</p>
}
```

### Triggers disponibles para @defer
| Trigger | Descripción |
|---|---|
| `on viewport` | Cuando el placeholder entra en el viewport |
| `on idle` | Cuando el browser está ocioso |
| `on interaction` | Al hacer click o focus |
| `on hover` | Al hacer hover |
| `on timer(2s)` | Después de X tiempo |
| `when condition` | Cuando una condición es `true` |

---

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
> ⚠️ `HttpInterceptor` (clase) fue deprecado en Angular 18. Usá **functional interceptors** con `HttpInterceptorFn`.

### Functional Interceptor (Angular 15+, recomendado)
```ts
// error-handler.interceptor.ts
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const messages: Record<number, string> = {
        400: error.error?.[0] ?? 'Bad Request',
        401: `Error de autorización: ${error.error?.message}`,
        404: 'Recurso no encontrado (404)',
        422: error.error?.errors,
        499: `Error de tiempo: ${error.error?.message}`,
        500: `Error del servidor: ${error.message}`,
      };

      const message = messages[error.status] ?? `Error inesperado (${error.status}): ${error.message}`;
      console.error(message);
      return throwError(() => new Error(message));
    })
  );
};
```

### Auth Interceptor (adjuntar token)
```ts
// auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).getToken();

  if (!token) return next(req);

  return next(req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  }));
};
```

### Registrar interceptores en app.config.ts
```ts
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';
import { errorHandlerInterceptor } from './interceptors/error-handler.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor, errorHandlerInterceptor])
    ),
  ]
};
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
> ⚠️ `NgModule` y `HttpClientModule` fueron deprecados en Angular 19. En Angular 20 usá **Standalone Components** con `provideHttpClient`.

### app.config.ts (reemplaza AppModule)
```ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideZonelessChangeDetection(), // Angular 20 — sin Zone.js
  ]
};
```

### main.ts
```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig).catch(console.error);
```

### Standalone Component
```ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {}
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

# Performance

## Zoneless Change Detection (Angular 20 — recomendado)
En Angular 20, Zone.js es opcional. Sin Zone.js, Angular solo actualiza el DOM cuando un Signal cambia — sin overhead de monkey-patching de toda la plataforma. Es la estrategia más eficiente disponible.
```ts
// app.config.ts
import { provideZonelessChangeDetection } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection()
  ]
};
```
> Remové `zone.js` de los `polyfills` en `angular.json` cuando uses zoneless.

## OnPush Change Detection (con Zone.js)
Si todavía usás Zone.js, `OnPush` es el mínimo recomendado. Solo re-renderiza cuando cambia un `@Input` por referencia o se emite un Observable.
```ts
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {}
```

## TrackBy en *ngFor
Sin `trackBy`, Angular destruye y recrea TODOS los nodos del DOM cuando cambia el array. Con `trackBy` solo actualiza los elementos que realmente cambiaron.
```ts
// ❌ Sin trackBy — recrea todos los nodos
<li *ngFor="let product of products">{{ product.name }}</li>

// ✅ Con trackBy — solo actualiza lo que cambió
<li *ngFor="let product of products; trackBy: trackById">{{ product.name }}</li>
```
```ts
trackById(index: number, product: ProductInterface): number {
  return product.id;
}
```

## Pure Pipes en lugar de métodos en templates
Los métodos en el template se ejecutan en CADA ciclo de detección de cambios. Un `pipe` puro solo se recalcula cuando cambia su input.
```ts
// ❌ Método en template — se ejecuta constantemente
<span>{{ formatPrice(product.price) }}</span>

// ✅ Pure pipe — solo cuando cambia product.price
<span>{{ product.price | formatPrice }}</span>
```
```ts
@Pipe({ name: 'formatPrice', pure: true })
export class FormatPricePipe implements PipeTransform {
  transform(value: number): string {
    return `$${value.toFixed(2)}`;
  }
}
```

## Lazy Loading de Módulos
Cargá los módulos solo cuando el usuario navega a esa ruta.
```ts
// app.routing.ts
const routes: Routes = [
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
  }
];
```

## Defer Blocks (Angular 17+)
Con `@defer` podés posponer la carga de componentes pesados hasta que sean visibles o necesarios.
```html
@defer (on viewport) {
  <app-heavy-chart />
} @placeholder {
  <div>Cargando gráfico...</div>
}
```

---

# Bundle

## `import type` para importaciones de solo tipos
Cuando importás una interfaz o tipo, usá `import type`. TypeScript lo elimina completamente del bundle en tiempo de compilación porque no genera código JavaScript.
```ts
// ❌ Import normal — puede incluirse en el bundle
import { ProductsOrder } from "../interfaces/products-order-interface";

// ✅ import type — TypeScript lo elimina del bundle, cero overhead
import type { ProductsOrder } from "../interfaces/products-order-interface";
```
> **Habilitalo automáticamente** con `"verbatimModuleSyntax": true` en `tsconfig.json` — TypeScript te va a forzar a usar `import type` cuando corresponda.

```json
// tsconfig.json
{
  "compilerOptions": {
    "verbatimModuleSyntax": true
  }
}
```

## Importaciones específicas en lugar de barrel imports
Un barrel export (`index.ts`) puede hacer que el bundler incluya más código del necesario si no tiene buena capacidad de tree-shaking.
```ts
// ❌ Barrel import — puede traer todo el módulo
import { formatDate, formatCurrency, formatNumber } from '@angular/common';

// ✅ Solo importá lo que usás — facilita el tree-shaking
import { formatDate } from '@angular/common';
```

## Tree Shakeable Providers
Usá `providedIn: 'root'` en lugar de declarar el servicio en `providers[]` del módulo. Si el servicio no se usa, Angular lo elimina del bundle.
```ts
// ❌ Declarado en el módulo — siempre se incluye en el bundle
@NgModule({
  providers: [ProductService]
})

// ✅ Tree-shakeable — solo se incluye si hay un consumidor
@Injectable({
  providedIn: 'root'
})
export class ProductService {}
```

## Analizar el Bundle con source-map-explorer
```sh
npm install source-map-explorer --save-dev
```
```json
// package.json
"scripts": {
  "analyze": "ng build --source-map && source-map-explorer dist/**/*.js"
}
```
```sh
npm run analyze
```
Esto abre un mapa visual para ver qué librerías están ocupando más espacio en tu bundle.

## Standalone Components (Angular 14+)
Los standalone components eliminan la necesidad de `NgModule`, lo que mejora el tree-shaking porque Angular solo incluye las dependencias que el componente declara explícitamente.
```ts
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],  // solo lo que usa este componente
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {}
```

---

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
