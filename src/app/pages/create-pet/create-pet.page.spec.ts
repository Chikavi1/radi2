import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreatePetPage } from './create-pet.page';

describe('CreatePetPage', () => {
  let component: CreatePetPage;
  let fixture: ComponentFixture<CreatePetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
