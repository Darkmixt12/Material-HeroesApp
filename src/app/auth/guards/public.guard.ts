import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, tap, map } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({providedIn: 'root'})
export class PublicGuard implements CanMatch, CanActivate{


	constructor(
		private router: Router,
		private authService: AuthService) {

	 }
	 
	private checkAuthStatus():boolean | Observable<boolean> {
		return this.authService.cheackAuthentication()
		.pipe(
			tap( isAuthenticated => {
				if(isAuthenticated)
					this.router.navigate(['./heroes/list'])
				
			}),
			map( isAuthenticated => !isAuthenticated)
		)
	}


	canMatch(route:Route, segments: UrlSegment[]): boolean | Observable<boolean>{
		// console.log('can Match', route);
		// console.log({ route, segments })

		//return true;
		return this.checkAuthStatus()
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
		// console.log('Can Activate');
		// console.log(route, state)
		//return true;
		return this.checkAuthStatus()
	}

}