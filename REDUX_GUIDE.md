# Redux Toolkit - Руководство по использованию

## Структура проекта

``` ts
src/
  store/
    index.ts           # Конфигурация store
    hooks.ts           # Типизированные хуки
    slices/
      authSlice.ts     # Пример slice для аутентификации
```

## Основные концепции

### 1. Store (src/store/index.ts)

Центральное хранилище состояния приложения.

```typescript
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### 2. Slice (src/store/slices/authSlice.ts)

Slice содержит reducer и actions для определенной части состояния.

```typescript
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
```

### 3. Типизированные хуки (src/store/hooks.ts)

Всегда используйте эти хуки вместо обычных `useDispatch` и `useSelector`.

```typescript
import { useAppDispatch, useAppSelector } from "@/store/hooks";
```

## Примеры использования

### Пример 1: Использование в LoginView

```typescript
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCredentials } from "@/store/slices/authSlice";

const LoginView: FC = () => {
  const dispatch = useAppDispatch();

  // Получение данных из store
  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = await login({ variables: { username, password } });

    if (result.data?.signIn) {
      const token = result.data.signIn.accessToken;

      // Сохраняем в Redux
      dispatch(setCredentials({
        user: { username },
        token
      }));

      // Также сохраняем в localStorage через authService
      authService.setToken(token);
      router.navigate("/");
    }
  };

  return (
    <div>
      {isAuthenticated && <p>Logged in as: {user?.username}</p>}
      {/* ... форма логина */}
    </div>
  );
};
```

### Пример 2: Использование в App.tsx

```typescript
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser, logout } from "@/store/slices/authSlice";
import { useEffect } from "react";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const hasToken = authService.hasToken();

  const { data, error } = useQuery(WHO_AM_I_QUERY, {
    skip: !hasToken,
  });

  // Обновляем Redux после успешного запроса
  useEffect(() => {
    if (data?.whoAmI) {
      dispatch(setUser(data.whoAmI));
    }
  }, [data, dispatch]);

  // Очищаем Redux при ошибке
  useEffect(() => {
    if (error && hasToken) {
      dispatch(logout());
      authService.clear();
    }
  }, [error, hasToken, dispatch]);

  return <RouterProvider router={router} />;
};
```

### Пример 3: Создание нового slice (Counter)

```typescript
// src/store/slices/counterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions;
export default counterSlice.reducer;
```

Затем добавьте в store:

```typescript
// src/store/index.ts
import counterReducer from "./slices/counterSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer, // Добавили новый reducer
  },
});
```

### Пример 4: Использование counter в компоненте

```typescript
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { increment, decrement, incrementByAmount, reset } from "@/store/slices/counterSlice";

const Counter: FC = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.counter.value);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );
};
```

### Пример 5: Сложный selector с вычислениями

```typescript
// Можно создавать производные значения
const MyComponent: FC = () => {
  const dispatch = useAppDispatch();

  // Простой selector
  const user = useAppSelector((state) => state.auth.user);

  // Selector с вычислениями
  const userDisplayName = useAppSelector((state) => {
    const user = state.auth.user;
    return user ? `@${user.username}` : 'Guest';
  });

  // Можно выбирать несколько значений
  const { isAuthenticated, token } = useAppSelector((state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    token: state.auth.token,
  }));

  return (
    <div>
      <p>{userDisplayName}</p>
      {isAuthenticated && <p>Token present: {!!token}</p>}
    </div>
  );
};
```

## Основные правила Redux

1. **Всегда используйте типизированные хуки**: `useAppDispatch` и `useAppSelector`
2. **Не мутируйте state напрямую** - Redux Toolkit использует Immer, поэтому можно писать "мутирующий" код
3. **Используйте actions для изменения состояния**: `dispatch(actionName(payload))`
4. **Селекторы** - функции для получения данных: `useAppSelector((state) => state.auth.user)`
5. **Один источник правды** - храните данные в одном месте

## Интеграция с Apollo Client

Redux и Apollo Client могут работать вместе:

- **Apollo Client** - для GraphQL запросов и кэширования
- **Redux** - для глобального состояния приложения (UI state, auth state, etc.)

Пример совместного использования:

```typescript
const LoginView: FC = () => {
  const dispatch = useAppDispatch();
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);

  const handleLogin = async () => {
    // Apollo Client делает запрос
    const result = await login({ variables: { username, password } });

    if (result.data?.signIn) {
      // Redux сохраняет состояние
      dispatch(setCredentials({
        user: { username },
        token: result.data.signIn.accessToken
      }));
    }
  };
};
```

## Отладка

Установите Redux DevTools Extension для браузера:

- [Chrome](https://chrome.google.com/webstore/detail/redux-devtools/)
- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/)

После установки вы сможете видеть все actions и изменения state в реальном времени.

## Полезные ссылки

- [Redux Toolkit документация](https://redux-toolkit.js.org/)
- [React Redux документация](https://react-redux.js.org/)
- [Redux DevTools](https://github.com/reduxjs/redux-devtools)
- [Redux Style Guide](https://redux.js.org/style-guide/)
