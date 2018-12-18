import { TestBed, async,ComponentFixture} from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AlertComponent } from './shared/directives/index';
import { AlertService } from './services';
import { AlertServiceMock } from './core/mock/AlertServiceMock';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

  const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full'}
  ];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        AlertComponent
      ],
      imports: [
        RouterModule.forRoot(routes)
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: AlertService, useClass: AlertServiceMock}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);

    // get test component from the fixture
    component = fixture.componentInstance;
  }));

  
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Login SSNet'`, async(() => {
    const app = fixture.debugElement.componentInstance;
    console.log(app.title);
    expect(app.title).toEqual('Login SSNet');
  }));

  it('should render title in a h3 tag', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('Welcome to SSNet!');
  }));
});