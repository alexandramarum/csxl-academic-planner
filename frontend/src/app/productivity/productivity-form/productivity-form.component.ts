import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductivityService } from '../productivity.service';
import { Router, ActivatedRoute } from '@angular/router';

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
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onSubmit(): void {
    // Create new timer object, assign values, increment timerCount, and add new object to list of timers.
    if (this.createForm.valid) {
      const name = this.createForm.value.name || '';
      const description = this.createForm.value.description || '';
      const workLength = this.createForm.value.workLength || 1;
      const breakLength = this.createForm.value.breakLength || 0;

      // Extract the ID from the current route
      const id = this.route.snapshot.paramMap.get('id');

      // Check if the ID matches the length of timers array
      if (Number(id) < ProductivityService.timers.length) {
        // If a timer already exists at the specified index, call changeTimer
        this.productivityService.changeTimer(
          Number(id),
          name,
          description,
          workLength,
          breakLength
        );
      } else {
        // If the ID doesn't match, add a new timer
        this.productivityService.addTimer(
          name,
          description,
          workLength,
          breakLength
        );
      }
      console.log(ProductivityService.timers);
      console.log(ProductivityService.timerCount);
      // Route back to /productivity
      this.router.navigate(['/productivity']);
      window.alert('New pomodoro timer has been created!');
    }
  }
}
