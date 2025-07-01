import { Injectable } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { ApiService } from '../service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async () => {
  const api = inject(ApiService);
  const router = inject(Router);
  try {
    await firstValueFrom(api.getLvlAndXp());
    return true;
  } catch {
    router.navigate(['/login']);
    return false;
  }
};