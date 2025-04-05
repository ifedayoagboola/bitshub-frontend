import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { Attribute, AttributeValue } from "../../interface/attribute.interface";
import { AttributeService } from "../../services/attribute.service";
import { GetAttribute, GetAttributeValues, GetAttributes } from "../action/attribute.action";

export class AttributeStateModel {
  attribute = {
    data: [] as Attribute[],
    total: 0
  }
  attribute_values: AttributeValue[];
  selectedAttribute: Attribute | null;
}

@State<AttributeStateModel>({
  name: "attribute",
  defaults: {
    attribute: {
      data: [],
      total: 0
    },
    attribute_values: [],
    selectedAttribute: null
  },
})

@Injectable()
export class AttributeState{

  constructor(private attributeService: AttributeService) {}

  @Selector()
  static attribute(state: AttributeStateModel) {
    return state.attribute;
  }

  @Selector()
  static attribute_value(state: AttributeStateModel) {
    return (id: number | null) => {
      if(!id) return [];
      return state?.attribute_values.filter(attr_val => +attr_val.attribute_id === id)?.map((value: AttributeValue) => {
        return { label: value?.value, value: value?.id }
      });
    };
  }

  @Selector()
  static selectedAttribute(state: AttributeStateModel) {
    return state.selectedAttribute;
  }

  @Action(GetAttributes)
  getAttributes(ctx: StateContext<AttributeStateModel>, action: GetAttributes) {
    this.attributeService.skeletonLoader = true;
    return this.attributeService.getAttributes(action.payload).pipe(
      tap({
        next: result => {
          ctx.patchState({
            attribute: {
              data: result.data,
              total: result?.total ? result?.total : result.data.length
            }
          });
        },
        complete: () => {
          this.attributeService.skeletonLoader = false;
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(GetAttributeValues)
  getAttributeValues(ctx: StateContext<AttributeStateModel>, action: GetAttributeValues) {
    return this.attributeService.getAttributeValues(action.payload).pipe(
      tap({
        next: result => {
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            attribute_values: result.data
          });
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(GetAttribute)
  get(ctx: StateContext<AttributeStateModel>, { id }: GetAttribute) {
    return this.attributeService.getAttributes().pipe(
      tap({
        next: results => {
          if(results && results.data) {
            const state = ctx.getState();
            const result = results.data.find(blog => blog.id == id);
            ctx.patchState({
              ...state,
              selectedAttribute: result
            });
          }
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }
}
