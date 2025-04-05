import { Routes } from "@angular/router";
import { BlogComponent } from "./blog.component";
import { BlogDetailsComponent } from "./blog-details/blog-details.component";
import { BlogResolver } from "../../shared/resolver/blog.resolver";

export const blog: Routes = [
  {
    path: 'blogs',
    component: BlogComponent
  },
  {
    path: 'blog/:slug',
    component: BlogDetailsComponent,
    resolve: {
      data: BlogResolver
    }
  }
];
