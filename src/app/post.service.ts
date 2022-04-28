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
  //traemos todos los post
  getPost(){
      return this.angularFirestore
      .collection("citizen", ref => ref.where('rol', '==', 'no artist')) //filtrado de usuarios no artistas
      .snapshotChanges()
  }
  //traer un perfil en especifico
  getPostById(id){
    return this.angularFirestore
      .collection("citizen")
      .doc(id)
      .valueChanges()

  }
  //crear un perfil
  createPost(post: Post){
    return new Promise<any> ((resolve, reject) => {
      this.angularFirestore
      .collection("citizen")
      .add({
        birthdate: post.birthdate,
        mail: post.mail,
        name: post.name,
        password: post.password,
        rol: post.rol= 'no artist'
      })
      .then((response) => {
        console.log(response)
      },
      (error) => {
        reject(error)
      })
      })

  }
  //actualizar perfil
  updatePost(post: Post, id){
    return this.angularFirestore
      .collection("citizen")
      .doc(id)
      .update({
        birthdate: post.birthdate,
        mail: post.mail,
        name: post.name,
        password: post.password
    });

  }

  //cambiar de rol
  updateRol(post: Post){
    return this.angularFirestore
      .collection("citizen")
      .doc(post.id)
      .update({
        rol: post.rol= 'artist'
      })
  }
  //eliminar perfil
  deletePost(post){
    return this.angularFirestore
    .collection("citizen")
    .doc(post.id)
    .delete();
  }
}
