
import 'cypress-file-upload';

describe('Automation OrangeHRM', () => {
  const urlBase = 'https://opensource-demo.orangehrmlive.com/';
  const user = 'Admin';
  const pass = 'admin123';
  const empNumber = 7;
  const personalDetailsUrl = `${urlBase}web/index.php/pim/viewPersonalDetails/empNumber/${empNumber}`;


// Función helper para login
  const login = (username, password) => {
    cy.visit(urlBase);
    cy.get('input[name="username"]', { timeout: 10000 }).should('be.visible').type(username);
    cy.get('input[name="password"]', { timeout: 10000 }).should('be.visible').type(password);
    cy.get('button[type="submit"]').should('be.visible').click();
  };

// Borrar cache
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

// Login Incorrecto
  it('Log in incorrecto', () => {
    login('aaadmin', 'admin345');
    cy.contains('Invalid credentials', { timeout: 10000 }).should('be.visible');
  });

// Login Correcto
  it('Log in correcto', () => {
    login(user, pass);
    cy.url({ timeout: 10000 }).should('include', '/dashboard');
    cy.contains('Dashboard', { timeout: 10000 }).should('be.visible');
  });

// Apartado My Info
  it('Acceder a My Info', () => {
    login(user, pass);
    cy.visit(personalDetailsUrl);
    cy.contains('Personal Details', { timeout: 10000 }).should('be.visible');
  });

// Agregar y guardar personal details
  it('Agregar y guardar Personal Details', () => {
    login(user, pass);
    cy.visit(personalDetailsUrl);
    cy.contains('Personal Details', { timeout: 10000 }).should('be.visible');

// First Name, middle name y Last Name
    
    cy.get('input[name="firstName"]', { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type('John');
   
    cy.get('input[name="middleName"]', {timeout: 10000})
      .should('be.visible')
      .clear()
      .type('Michael');

    cy.get('input[name="lastName"]', { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type('Smith');
    
// Other ID     
    cy.contains('Other Id')                
      .parents('.oxd-input-group')         
      .find('input.oxd-input')            
      .should('be.visible')
      .clear()
      .type('98765');

// License Number
    cy.contains("Driver's License Number")   
      .parents('.oxd-input-group')            
      .find('input.oxd-input')                
      .should('be.visible')
      .clear()
      .type('DL123456');

// License Expiry Date
    cy.get('form .oxd-input[placeholder="yyyy-dd-mm"]')
      .first()  
      .scrollIntoView()
      .should('be.visible')
      .clear()
      .type('2030-12-31');

// Cerrar calendario

    cy.get('body').click(0,0, { force: true });

// Nationality

    cy.get('i.oxd-icon.bi-caret-down-fill.oxd-select-text--arrow').first().click({ force: true });
    cy.contains('div[role="option"]', 'American', { timeout: 10000 }).click({ force: true });

// Date of Birth

    cy.get('input[placeholder="yyyy-dd-mm"]')
      .eq(1) 
      .scrollIntoView()
      .clear({ force: true })
      .type('1995-08-15', { force: true })
      .blur();

// Gender

    cy.get('input[type="radio"][value="1"]')
      .scrollIntoView()
      .check({ force: true });

    cy.get('button[type="submit"]')
      .contains('Save')
      .scrollIntoView()
      .click({ force: true });
  });
// Custom Fields
  it('Custom Fields', () => {
    login(user, pass);
    cy.visit(personalDetailsUrl);
//Blood Type
    cy.contains('Custom Fields')
      .parent() 
      .find('div.oxd-select-text.oxd-select-text--active') 
      .first() 
      .click({ force: true }); 

// Seleccionar la opción B+
    cy.get('div[role="option"]').contains('B+').click({ force: true });

// Test_Field

    cy.contains('h6', 'Custom Fields')
      .scrollIntoView({ offset: { top: -50, left: 0 } }); 

// Test_Field
    cy.contains('label', 'Test_Field')
      .parent()                    
      .siblings('div')             
      .find('input, div[contenteditable="true"]') 
      .scrollIntoView()
      .click({ force: true })
      .clear({ force: true })
      .type('12345', { force: true });

// Guardar
    cy.get('button[type="submit"]')
      .contains('Save')
      .scrollIntoView()
      .click({ force: true });
  
  });

  it('Gestion de imagenes (Attachments)', () => {
    const firstFile = 'flordeprueba.jpeg';
    const newFile = 'nuevaImagen.png';

    login(user, pass);
    cy.visit(personalDetailsUrl);

    // Click en "+ Add" para subir el primer archivo
    cy.contains('button', 'Add', { timeout: 10000 }).click({ force: true });

    // Subir primer archivo
    cy.get('input[type="file"]', { timeout: 10000 })
      .should('exist')
      .selectFile(`cypress/fixtures/${firstFile}`, { force: true });

    cy.get('.oxd-file-input-div', { timeout: 10000 })
      .should('contain.text', firstFile);

    cy.get('textarea').type('Test', { force: true });

    // Guardar el primer archivo
    cy.get('div.orangehrm-attachment')
      .find('button[type="submit"]')
      .contains('Save')
      .click({ force: true });
    // Verificamos que el archivo se haya guardado en la tabla
    cy.get('.oxd-table-row', { timeout: 10000 })
      .contains('.oxd-table-cell', firstFile)
      .parents('.oxd-table-row')
      .within(() => {
    
// Descargar
    cy.get('i.bi-download').click({ force: true });
  });

// Paso 1: Buscar la fila con el archivo
    cy.contains('.oxd-table-cell', firstFile, { timeout: 15000 })
      .parents('.oxd-table-row')
      .within(() => {
    // Paso 2: Clic en la papelera
    cy.get('i.bi-trash').click({ force: true });
  });

// Paso 3: Confirmar en el modal
cy.get('.oxd-button--label-danger', { timeout: 10000 })
  .should('be.visible')
  .click();

  // Click en "+ Add" para subir el primer archivo
    cy.contains('button', 'Add', { timeout: 10000 }).click({ force: true });

    // Subir primer archivo
    cy.get('input[type="file"]', { timeout: 10000 })
      .should('exist')
      .selectFile(`cypress/fixtures/${firstFile}`, { force: true });

    cy.get('.oxd-file-input-div', { timeout: 10000 })
      .should('contain.text', firstFile);

    cy.get('textarea').type('Test', { force: true });

    // Guardar el primer archivo
    cy.get('div.orangehrm-attachment')
      .find('button[type="submit"]')
      .contains('Save')
      .click({ force: true });

});
  //  cy.contains('.oxd-table-cell', firstFile, { timeout: 15000 })
  //    .parents('.oxd-table-row')
   //   .within(() => {
   //     cy.get('i.bi-pencil-fill').click({ force: true });
  it('Cerrar sesion', () => {
    login(user, pass);
    cy.visit(personalDetailsUrl);

  // Clic en el botón del usuario (John Smith arriba a la derecha)
  cy.contains('p.oxd-userdropdown-name', 'John Smith', { timeout: 10000 })
    .should('be.visible')
    .click();

  // Clic en Logout
  cy.contains('a', 'Logout', { timeout: 10000 })
    .should('be.visible')
    .click();

  // Verificación: volver a la pantalla de login
  cy.url({ timeout: 10000 }).should('include', '/auth/login');
});
});

