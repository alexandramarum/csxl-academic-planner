import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductivityService } from '../productivity.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-productivity-form',
  templateUrl: './productivity-form.component.html',
  styleUrls: ['./productivity-form.component.css']
})
export class ProductivityFormComponent {
  public static Route = {
    path: 'productivity/edit/:id',
    title: 'Productivity',
    component: ProductivityFormComponent
  };

  createForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.min(1), Validators.max(15)]],
    description: ['', [Validators.required, Validators.max(50)]],
    workLength: [0, [Validators.required, Validators.min(1)]],
    breakLength: [0, [Validators.required, Validators.min(0)]]
  });

  constructor(
    private productivityService: ProductivityService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  onSubmit(): void {
    // Create new timer object, assign values, increment timerCount, and add new object to list of timers.
    if (this.createForm.valid) {
      ProductivityService.timerCount++;
      this.productivityService.addTimer(
        this.createForm.value.name || '',
        this.createForm.value.description || '',
        this.createForm.value.workLength || 1,
        this.createForm.value.breakLength || 0
      );
      console.log(ProductivityService.timers);
      // Route back to /productivity
      this.router.navigate(['/productivity']);
      window.alert('New pomodoro timer has been created!');
    }
  }
}
