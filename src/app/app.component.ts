import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'
import { Ng2FittextModule } from "ng2-fittext";
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Ng2FittextModule, FormsModule, MatInputModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',

})
export class AppComponent {
  title = 'Time to Midsummer Eve'
  countdown = '20 days, 3 h, 15m, 10s'
  date = '2024-06-21'
  onSubmit(){
    console.log(2134)
  }

}


