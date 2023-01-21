import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AccountService } from '../services/account.service';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private router: Router, private tokenService: TokenService, private accountService: AccountService) { }

  public async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const result = await this.tokenService.tokenVerify();
    if (!result) this.router.navigate(["/"])
    else {
      await this.accountService.getAuthorizeModel().subscribe(data => {
        this.accountService.authorize = data;
        this.accountService.userFlag = true;
        if (this.router.url == "/user-control" && data.type != "admin") {
          this.router.navigate(["request-action"]);
        }
      });
      return result;
    }
    return result;
  }
}