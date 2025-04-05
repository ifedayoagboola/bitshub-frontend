import { Component, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ThemeOptionState } from '../../../shared/store/state/theme-option.state';
import { Observable } from 'rxjs';
import { AboutUs, Option } from '../../../shared/interface/theme-option.interface';
import { breadcrumb } from '../../../shared/interface/breadcrumb.interface';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { teamSlider, testimonialSlider } from '../../../shared/data/owl-carousel';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';
import { ThemeServicesComponent } from '../../home/widgets/theme-services/theme-services.component';

@Component({
    selector: 'app-about-us',
    imports: [CommonModule, CarouselModule, TranslateModule, BreadcrumbComponent],
    templateUrl: './about-us.component.html',
    styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {

  themeOptions$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;

  public aboutUs?: AboutUs;
  public testimonialOptions = testimonialSlider;
  public teamOptions = teamSlider;
  public StorageURL = environment.storageURL;

  public breadcrumb: breadcrumb = {
    title: "About Us",
    items: [{ label: 'About Us', active: true }]
  }

  constructor( private store: Store){
    this.themeOptions$.subscribe(option =>{
      this.aboutUs = option?.about_us;
    })
  }
}
