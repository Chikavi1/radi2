import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectPetPage } from './select-pet.page';

describe('SelectPetPage', () => {
  let component: SelectPetPage;
  let fixture: ComponentFixture<SelectPetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectPetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectPetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
