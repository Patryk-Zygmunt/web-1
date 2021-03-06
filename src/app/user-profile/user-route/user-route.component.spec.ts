import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { UserRouteComponent } from './user-route.component';
import { MaterialModule } from '../../_modules/material.module';
import { RouteListComponent } from '../../route/route-list/route-list.component';
import { RouteComponent } from '../../route/route/route.component';
import { RouteService } from '../../_services/route.service';
import { CitySearchComponent } from '../../city-search/city-search.component';
import { CityService } from '../../_services/city.service';
import { CitiesProvider } from '../../_providers/cities-provider';
import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user.service';
import { PaginationComponent } from '../../shered/pagination/pagination.component';
import { DataProviderService } from '../../_services/data-provider.service';
import { SpinnerProvider } from '../../_providers/spinner-provider';
import { MatDialogModule } from '@angular/material';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { NgModule } from '@angular/core';


describe('UserRouteComponent', () => {
    let component: UserRouteComponent;
    let fixture: ComponentFixture<UserRouteComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                UserRouteComponent,
                RouteListComponent,
                RouteComponent,
                PaginationComponent
            ],
            imports: [
                HttpClientModule,
                RouterTestingModule,
                MaterialModule,
                DialogTestModule,
            ],
            providers: [
                RouteService,
                CityService,
                CitiesProvider,
                UserService,
                DataProviderService,
                SpinnerProvider
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserRouteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

@NgModule({
    declarations: [SpinnerComponent],
    imports: [
        MatDialogModule,
        MaterialModule
    ],
    entryComponents: [
        SpinnerComponent
    ],
})
class DialogTestModule { }
