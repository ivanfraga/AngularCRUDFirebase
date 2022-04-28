import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//IMPORT MODEL
import { Post } from 'src/app/post.model';
//IMPORT SERVICE
import { PostService } from 'src/app/post.service';


@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  Post: Post[];
  

  constructor( private postService: PostService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.postService.getPost().subscribe((res) =>{
      this.Post = res.map((e) =>{
        return {
          id: e.payload.doc.id,
          ...(e.payload.doc.data() as Post)
        };
      });
    });
  }

  deleteRow = (post) => this.postService.deletePost(post);

  convertToArtist= (post) => this.postService.updateRol(post);

}
