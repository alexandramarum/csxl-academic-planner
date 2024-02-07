import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductivityFormComponent } from './productivity-form.component';

describe('ProductivityFormComponent', () => {
  let component: ProductivityFormComponent;
  let fixture: ComponentFixture<ProductivityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductivityFormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductivityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
