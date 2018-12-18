import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService, AuthenticationService } from '../services';
import { AuthenticationServiceMock } from '../core/mock/AuthenticationServiceMock';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;


 beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule, 
          FormsModule,
          RouterTestingModule
        ], 
        declarations: [LoginComponent],
        providers: [
            {provide: RouterTestingModule},
            {provide: AuthenticationService , useClass: AuthenticationServiceMock},
            {provide:AlertService }
        ]
    })
    .compileComponents();


    // create component and test fixture
    fixture = TestBed.createComponent(LoginComponent);

    // get test component from the fixture
    component = fixture.componentInstance;
    
    component.ngOnInit(); 
  });

  it('should render title in a h2 tag', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Login');
  }));

  it('form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('username field validity', () => {
    let errors = {};
    let username = component.loginForm.controls['username'];
    expect(username.valid).toBeFalsy();

    // username field is required
    errors = username.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set email to something
    username.setValue("test");
    errors = username.errors || {};
    expect(errors['required']).toBeFalsy();
  
    // Set username to something correct
    username.setValue("lilan");
    errors = username.errors || {};
    expect(errors['required']).toBeFalsy();

  });

  it('password field validity', () => {
    let errors = {};
    let password = component.loginForm.controls['password'];

    // password field is required
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set password to something
    password.setValue("admin1");
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();


    // Set password to something correct
    password.setValue("lilan123");
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();

  });

  it('submitting the form with incorrect credentials', () => {
    expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.controls['username'].setValue("lilan");
    component.loginForm.controls['password'].setValue("lilan");
    expect(component.loginForm.valid).toBeTruthy(); 
    
    const authService = fixture.debugElement.injector.get(AuthenticationService);
    spyOn(authService, 'login');
    fixture.detectChanges();
    expect(component.onSubmit()).toBeFalsy();

  });

  it('submitting the form with correct credentials', () => {
    expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.controls['username'].setValue("lilan");
    component.loginForm.controls['password'].setValue("lilan123");
    expect(component.loginForm.valid).toBeTruthy();
    const authService = fixture.debugElement.injector.get(AuthenticationService);
    spyOn(authService, 'login');
    fixture.detectChanges();
    let user:any;
    expect(component.onSubmit()).toBe(user)

  });
});
