import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { ISignInPayload, ISignInResponse } from '../interfaces/sign-in.interface';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthStore } from './auth.store';
import { IAuthRequestState } from '../interfaces/auth-state.interface';

export const SignInStore = signalStore(
  withState<IAuthRequestState>({ isLoading: false, error: '' }),
  withProps(() => ({
    _http: inject(HttpClient),
    _router: inject(Router),
    _route: inject(ActivatedRoute),
    _authStore: inject(AuthStore)
  })),
  withMethods(({ _http, _authStore, _route, _router, ...store }) => ({
    signIn: rxMethod<ISignInPayload>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: '' })),
        switchMap((payload) => {
          return _http.post<ISignInResponse>('/api/auth/sign-in/email', { ...payload, rememberMe: true }).pipe(
            tap(({ user }) => {
              patchState(store, { isLoading: false });
              _authStore.setUser(user);
              const redirect = _route.snapshot.queryParamMap.get('redirect');
              _router.navigateByUrl(redirect?.startsWith('/admin') ? redirect : '/admin');
            }),
            catchError(() => {
              patchState(store, { isLoading: false, error: 'Adresse e-mail ou mot de passe incorrect.' });
              return of(null);
            })
          );
        })
      )
    ),
    clearError(): void {
      patchState(store, { error: '' });
    }
  }))
);
