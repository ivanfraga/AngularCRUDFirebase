import { Injectable } from '@angular/core';

//import modules to firestore
import { AngularFirestore } from '@angular/fire/compat/firestore';

//import the class creaded
import { Post } from './post.model';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private angularFirestore: AngularFirestore) { }
  //Create CRUD METHODS
  getPost(){
      return this.angularFirestore
      .collection("citizen")
      .snapshotChanges()
  }
  getPostById(id){
    return this.angularFirestore
    .collection("citizen")
    .doc(id)
    .valueChanges()

  }
  createPost(post: Post){
    return new Promise<any> ((resolve, reject) => {
      this.angularFirestore
      .collection("citizen")
      .add(post)
      .then((response) => {
        console.log(response)
      },
      (error) => {
        reject(error)
      })
      })

  }
  updatePost(post: Post, id){
    return this.angularFirestore
    .collection("citizen")
    .doc(id)
    .update({
      id: post.id,
      birthdate: post.birthdate,
      mail: post.mail,
      name: post.name,
      password: post.password
    });

  }
  deletePost(post){
    return this.angularFirestore
    .collection("citizen")
    .doc(post.id)
    .delete();
  }
}
