import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { Notification } from "../../interface/notification.interface";
import { NotificationService } from "../../services/notification.service";
import { GetNotification, MarkAsReadNotification } from "../action/notification.action";

export class NotificationStateModel {
  notification = {
    data: [] as Notification[],
    total: 0
  }
}

@State<NotificationStateModel>({
  name: "notification",
  defaults: {
    notification: {
      data: [],
      total: 0
    },
  },
})

@Injectable()
export class NotificationState {

  constructor(private notificationService: NotificationService) {}

  @Selector()
  static notification(state: NotificationStateModel) {
    return state.notification.data;
  }

  @Action(GetNotification)
  getNotification(ctx: StateContext<NotificationStateModel>, action: GetNotification) {
    return this.notificationService.getNotifications(action?.payload).pipe(
        tap({
            next: result => {
                ctx.patchState({
                    notification: {
                        data: result.data,
                        total: result?.total ? result?.total : result.data.length
                    }
                });
            },
            error: err => {
                throw new Error(err?.error?.message);
            }
        })
    );
  }

  @Action(MarkAsReadNotification)
  markAsRead(ctx: StateContext<NotificationStateModel>) {
    // Notification Mark As Read Logic Here
  }

}
