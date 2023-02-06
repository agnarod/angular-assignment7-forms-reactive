import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectStatuses = [
    { "name": "Stable", "val": "stbl" },
    { "name": "Critical", "val": "critc" },
    { "name": "Finished", "val": "fin" }];
    
    
    form: FormGroup;
    
    ngOnInit(): void {
      this.form = new FormGroup({
        'projectName' : new FormControl(null, [Validators.required], this.asyncNoTest),
        'mail': new FormControl(null, [Validators.required, Validators.email]),
        'status': new FormControl(null)
      })
    }

    onSubmit(){
      console.log(this.form);
      
    }

    noTest(control:FormControl): { [s:string] : boolean} {
      if( control.value == 'test' ){
        return {'named': true};
      }
      return null;
    }

    asyncNoTest(control: FormControl) : Promise<any> | Observable<any>{
      const promise = new Promise<any>(
        (resolve, reject)=>{
          setTimeout(()=>{
            if(control.value=='test'){
              resolve({'asyncNamed':true})
            }
            else
            resolve(null);
          }
            ,1500);
        }
      );

      return promise;
    }

}
