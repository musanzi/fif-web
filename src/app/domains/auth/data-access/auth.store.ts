import { signalStore, withState, withMethods, patchState, withProps, withComputed } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap, catchError, of, exhaustMap, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '@/app/shared/interfaces';

interface IAuthStore {
  user: IUser | null;
}

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<IAuthStore>({ user: null }),
  withProps(() => ({
    _http: inject(HttpClient),
    _router: inject(Router)
  })),
  withComputed(({ user }) => ({
    hasRights: computed(() => {
      return user()?.role === 'ADMIN';
    })
  })),
  withMethods(({ _http, _router, ...store }) => ({
    initialize: () => {
      return _http.get<{ data: IUser }>('/admin/me').pipe(
        map(({ data }) => {
          patchState(store, { user: data });
          return data;
        }),
        catchError(() => {
          patchState(store, { user: null });
          return of(null);
        })
      );
    },
    signOut: rxMethod<void>(
      pipe(
        exhaustMap(() =>
          _http.post<{ success: true }>('/api/auth/sign-out', {}).pipe(
            tap(() => {
              patchState(store, { user: null });
              _router.navigate(['/auth/sign-in']);
            }),
            catchError(() => {
              return of(null);
            })
          )
        )
      )
    ),
    setUser: (user: IUser | null) => {
      patchState(store, { user });
    }
  }))
);
