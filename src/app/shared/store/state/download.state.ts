import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { Download } from "../../interface/download.interface";
import { DownloadsService } from "../../services/downloads.service";
import { DownloadFiles, DownloadLicense, Downloads } from "../action/download.action";
 

export class DownloadStateModel {
  download = {
    data: [] as Download[],
    total: 0
  }
}

@State<DownloadStateModel>({
  name: "download",
  defaults: {
    download: {
      data: [],
      total: 0
    },
  },
})

@Injectable()
export class DownloadState {

  constructor(private downloadService: DownloadsService) {}

  @Selector()
  static download(state: DownloadStateModel) {
    return state.download;
  }
 
  @Action(Downloads)
  downloads(ctx: StateContext<DownloadStateModel>, action: Downloads) {
    return this.downloadService.downloads(action.payload).pipe(
      tap({
        next: result => { 
          ctx.patchState({
            download: {
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

  @Action(DownloadFiles)
  downloadFiles(ctx: StateContext<DownloadStateModel>, action: DownloadFiles) {
    //  Download Files Logic Here
  }

  @Action(DownloadLicense)
  downloadLicense(ctx: StateContext<DownloadStateModel>, action: DownloadFiles) {
    //  Download License Logic Here
  }

}