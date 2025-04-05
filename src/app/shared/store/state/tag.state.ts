import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";

import { Tag } from "../../interface/tag.interface";

import { TagService } from "../../services/tag.service";

import { GetTags } from "../action/tag.action";

export class TagStateModel {
  tag = {
    data: [] as Tag[],
    total: 0
  }
}

@State<TagStateModel>({
  name: "tag",
  defaults: {
    tag: {
      data: [],
      total: 0
    }
  },
})
@Injectable()
export class TagState {

  constructor(private tagService: TagService) {}

  @Selector()
  static tag(state: TagStateModel) {
    return state.tag;
  }

  @Action(GetTags)
  getTags(ctx: StateContext<TagStateModel>, action: GetTags) {
    return this.tagService.getTags(action.payload).pipe(
      tap({
        next: result => {
          ctx.patchState({
            tag: {
              data: result.data,
              total: result?.total ? result?.total : result.data?.length
            }
          });
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

}
