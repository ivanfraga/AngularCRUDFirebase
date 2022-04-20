import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {  Router, ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  public editForm: FormGroup;
  posRef: any
  constructor(
    public postService: PostService,
    public formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.formBuilder.group({
      name: [''],
      birthdate:[''],
      mail:[''],
      password:['']
    })
   }

  ngOnInit(): void {
    const id = this.activeRoute.snapshot.paramMap.get('id')
    this.postService.getPostById(id).subscribe( res =>{
      this.posRef = res;
      this.editForm = this.formBuilder.group({
        name: [this.posRef.name],
        birthdate: [this.posRef.birthdate],
        mail: [this.posRef.mail],
        password: [this.posRef.password]
      })
    })
  }

  onSubmit() {
    const id = this.activeRoute.snapshot.paramMap.get('id');   
    this.postService.updatePost(this.editForm.value, id);
    this.router.navigate(['']);
    console.log(this.editForm.value) //podemos ver los valores capturados
  }

}
