import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { Blog } from "../../interface/blog.interface";
import { BlogService } from "../../services/blog.service";
import { GetBlogBySlug, GetBlogs, GetRecentBlog, GetSelectedBlogs } from "../action/blog.action";

export class BlogStateModel {
  blog = {
    data: [] as Blog[],
    total: 0
  }
  selectedBlog: Blog | null;
  recentBlog: Blog[] | [];
  selectedBlogs: Blog[] | [];
}

@State<BlogStateModel>({
  name: "blog",
  defaults: {
    blog: {
      data: [],
      total: 0
    },
    selectedBlog: null,
    recentBlog: [],
    selectedBlogs: [],
  },
})

@Injectable()
export class BlogState{
  constructor(private router: Router,
    private blogService: BlogService) {}

  @Selector()
  static blog(state: BlogStateModel) {
    return state.blog;
  }

  @Selector()
  static selectedBlog(state: BlogStateModel) {
    return state.selectedBlog;
  }

  @Selector()
  static resentBlog(state: BlogStateModel) {
    return state.recentBlog;
  }

  @Selector()
  static selectedBlogs(state: BlogStateModel) {
    return state.selectedBlogs;
  }

  @Action(GetBlogs)
  getBlogs(ctx: StateContext<BlogStateModel>, action: GetBlogs) {
    this.blogService.skeletonLoader = true;
    return this.blogService.getBlogs(action.payload).pipe(
      tap({
        next: result => {
          ctx.patchState({
            blog: {
              data: result.data,
              total: result?.total ? result?.total : result.data?.length
            }
          });
        },
        complete: () => {
          this.blogService.skeletonLoader = false;
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(GetBlogBySlug)
  getBlogBySlug(ctx: StateContext<BlogStateModel>, { slug }: GetBlogBySlug) {
    return this.blogService.getBlogs().pipe(
      tap({
        next: results => {
          if(results && results.data) {
            const state = ctx.getState();
            const result = results.data.find(blog => blog.slug == slug);
            ctx.patchState({
              ...state,
              selectedBlog: result
            });
          }
        },
        error: err => {
          this.router.navigate(['/404']);
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(GetRecentBlog)
  getRecentBlogs(ctx: StateContext<BlogStateModel>, action: GetRecentBlog) {
    return this.blogService.getBlogs(action.payload).pipe(
      tap({
        next: result => {
          ctx.patchState({
            recentBlog: result.data,
          });
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(GetSelectedBlogs)
  getSelectedBlogs(ctx: StateContext<BlogStateModel>, action: GetSelectedBlogs) {
    return this.blogService.getBlogs(action.payload).pipe(
      tap({
        next: result => {
          ctx.patchState({
            selectedBlogs: result.data,
          });
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

}
