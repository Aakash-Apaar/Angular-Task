
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
;


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
    private service: AuthService,
    private router: Router,
    private route: ActivatedRoute,) {

    this.dataList = [
      { id: 1, name: "Mumbai" },
      { id: 2, name: "Thane" },
      { id: 3, name: "Satara" },
      { id: 4, name: "Bangalore" }
    ]
  }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({

      // id: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      fullName: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', Validators.required],
      zipcode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      cityName: ['', [Validators.required]],
    });

    this.getAllData();

    // this.route.params.subscribe(param => {
    //   console.log(param)
    //   if (param && param['id']) {
    //     let data = this.service.getUser(param['id']);
    //     if (data) {
    //       this.registerForm.setValue(data);
    //       this.isEdit = true;
    //     }
    //   }
    // })
  }

  get f() { return this.registerForm.controls; }

  onSubmit(data: any) {

    const id=this.IDno;

    console.log("data",data)

    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    this.service.GetAll().subscribe({
      next: (data: any) => {
        console.log(data)
      }
    })
   
    const param = {
      "fullName": data.fullName,
      "address": data.address,
      "cityName": Number(data.cityName),
      "zipcode": data.zipcode
    }
    if(id!=""){
      alert('Values Updated')
      this.service.putUser(param,id).subscribe((result) => {
        console.warn(result)
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

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 5));
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

  onDelete(element: any) {
    let rowData = this.datasource.filter((a: any) => a.id == element);
    this.datasource.rowData.slice(element.id);
  
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


