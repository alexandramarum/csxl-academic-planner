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
    breakLength: [0, [Validators.required, Validators.min(1)]]
  });

  constructor(
    private productivityService: ProductivityService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onSubmit(): void {
    /* Validates form inputs, checks if to call changeTimer or addTimer,
    navigates back to productivity and notifies about timer creation. */
    // Validate form inputs.
    if (this.createForm.valid) {
      const name = this.createForm.value.name || '';
      const description = this.createForm.value.description || '';
      const workLength = this.createForm.value.workLength || 1;
      const breakLength = this.createForm.value.breakLength || 1;

      // Extract id from the current route.
      const id = this.route.snapshot.paramMap.get('id');

      var inUse: boolean = false;

      ProductivityService.timers.forEach((timer) => {
        if (timer.name === name) {
          inUse = true;
          return;
        }
      });

      // Check if the id matches the length of timers array.
      if (Number(id) < ProductivityService.timers.length && !inUse) {
        // If a timer already exists at the specified index, call changeTimer.
        this.productivityService.changeTimer(
          Number(id),
          name,
          description,
          workLength,
          breakLength
        );
        this.router.navigate(['/productivity']);
        window.alert('Pomodoro timer has been changed!');
      } else if (!inUse) {
        // If the id doesn't match, call addTimer.
        this.productivityService.addTimer(
          name,
          description,
          workLength,
          breakLength
        );
        this.router.navigate(['/productivity']);
        window.alert('New pomodoro timer has been created!');
      } else {
        window.alert('Name already in use!');
      }
      // Route back to /productivity
      // Notify
    }
  }
}
