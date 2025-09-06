# PruebaQA_Artificial_Nerds
Guía rápida: Clonar el proyecto y ejecutar el pipeline (Cypress + GitHub Actions)
================================================================================

1) Requisitos
-------------
- Node.js 18+ (recomendado 20)
- Git
- Cuenta de GitHub con acceso al repositorio

2) Clonar el repositorio
------------------------
# Reemplaza <USUARIO>/<REPO> por el tuyo
git clone https://github.com/<USUARIO>/<REPO>.git
cd <REPO>

3) Instalar dependencias
------------------------
npm ci || npm install

4) Ejecutar pruebas localmente
---------------------------------------------------------------------
# Corre todas las pruebas en modo headless
npm test

# Para ejecutar solo un spec:
# npx cypress run --browser chrome --headless --spec "cypress/e2e/pruebaQA.cy.js"

# Para abrir la UI de Cypress (modo interactivo):
# npx cypress open

5) ¿Cómo se ejecuta el pipeline en GitHub Actions?
--------------------------------------------------
El workflow vive en .github/workflows/ci-tests.yml y se ejecuta automáticamente cuando:
- Haces push a la rama main
- Abres un Pull Request hacia main
- (Opcional) Lo lanzas manualmente desde la pestaña Actions (si el workflow tiene 'workflow_dispatch')

6) Disparar el pipeline con un push
-----------------------------------
# Agrega tus cambios
git add -A
git commit -m "Mis cambios"

# Sube a la rama main o a tu rama personalizada
git push origin "rama"

7) Lanzarlo manualmente desde GitHub
------------------------------------
- Ve a tu repositorio en GitHub
- Abre la pestaña "Actions"
- Selecciona "CI • Tests"
- Presiona el botón "Run workflow" y elige la rama

8) ¿Dónde veo los resultados?
-----------------------------
- En la ejecución (Actions → el run más reciente) verás los logs paso a paso
- En un Pull Request, entra a la pestaña "Checks" para ver el resumen
- En "Artifacts" puedes descargar:
  - junit-results (reportes JUnit XML)
  - cypress-artifacts (videos y screenshots si falló algo)

9) Estructura mínima esperada
-----------------------------
cypress.config.js
cypress/
  e2e/
    ChatbotQA.cy.js
    pruebaQA.cy.js
  fixtures/
    flordeprueba.jpeg   
  support/
    e2e.js              
    commands.js
.github/workflows/
  ci-tests.yml
package.json  

10) Comandos útiles de Git
--------------------------
# Ver estado
git status

# Traer cambios del remoto y re-aplicar los tuyos encima (rebase)
git pull --rebase origin main

# Resolver conflictos: edita archivos marcados, luego
# git add <archivo>
# git rebase --continue

11) Problemas comunes y soluciones rápidas
------------------------------------------
- Error: "npm error Missing script: \"test\""
  -> Agrega el script de test:
     npm pkg set scripts.test="cypress run --browser chrome --headless --reporter junit --reporter-options mochaFile=reports/junit-[hash].xml,toConsole=true"

- Error: "cy.selectFile(...): file does not exist"
  -> Asegúrate de subir el fixture a cypress/fixtures/ y que el nombre/ruta coincida exactamente.

- Error 403 en cy.visit() (sitio del chatbot)
-> Es un WAF/CDN que bloquea CI. Opciones:
     a) Usar Chrome con user-agent “normal” (configurado en cypress.config.js) y, si es necesario, modo headed.
     b) Pedir un entorno de staging o un bypass/whitelist para el runner de CI.
     c) Como plan B, saltar ese suite en CI con una variable (CYPRESS_SKIP_CHATBOT=1) y seguir ejecutándolo localmente.

- Cache de npm no funciona
  -> Asegúrate de commitear package-lock.json.

12) Subir un proyecto local a un repo nuevo (si partes de cero)
---------------------------------------------------------------
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<USUARIO>/<REPO>.git
git push -u origin main

Listo.
