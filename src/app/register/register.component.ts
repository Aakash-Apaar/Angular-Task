
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {


  datasource: any;
  registerForm !: FormGroup;
  submitted = false;
  columnsToDisplay = ['fullName', 'address', 'cityName', 'zipcode', 'action'];
  dataList: Array<any> = [];
  isEdit: Boolean = false;
  IDno:string='';

  constructor(private formBuilder: FormBuilder, 
    private service: AuthService) {

    this.dataList = [
      { id: 1, name: "Mumbai" },
      { id: 2, name: "Thane" },
      { id: 3, name: "Satara" },
      { id: 4, name: "Bangalore" }
    ]
  }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({

      fullName: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', Validators.required],
      zipcode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      cityName: ['', [Validators.required]],
    });

    this.getAllData();
  }

  get f() { return this.registerForm.controls; }

  onSubmit(data: any) {

  debugger
   const id=this.IDno;

    console.log("data",data)
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    const param = {
      "fullName": data.fullName,
      "address": data.address,
      "cityName": Number(data.cityName),
      "zipcode": data.zipcode
    }
  
    
    if(id!="")
    {
      this.service.putUser(param,id).subscribe((result) => {
        console.warn(result)
        alert('Values Updated')
        this.getAllData();
        this.onReset();
      })
    }
   else{
    this.service.saveUsers(param).subscribe((result) => {
      console.warn(result)
    })
  }
    this.getAllData();
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  changeCity(e: any) {
    console.log(e.value)
    this.registerForm.get('cityName')?.setValue(e.target.value, {
      onlySelf: true
    })
  }

  onEdit(element: any) {
    console.log("element",element)

    let rowData = this.datasource.filter((a: any) => a._id == element);

    this.IDno=element;

    this.registerForm.controls["fullName"].setValue(rowData[0].fullName);
    this.registerForm.controls["address"].setValue(rowData[0].address);
    this.registerForm.controls["zipcode"].setValue(rowData[0].zipcode);
    this.registerForm.controls["cityName"].setValue(rowData[0].cityName);
   
  }

  getAllData() {
    this.service.GetAll().subscribe({
      next: (res) => {
        this.datasource = res;
        console.log(res);
      }
    })
  }
}


