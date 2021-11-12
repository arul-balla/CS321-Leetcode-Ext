// import dependencies
import React from 'react'
import App from './App'
import AuthContext from './components/AuthContext';

// import API mocking utilities from Mock Service Worker
import {rest} from 'msw'
import {setupServer} from 'msw/node'

// import react-testing methods
import {render, fireEvent, screen, getByText} from '@testing-library/react'

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

  //Mock data to test rendering objects
  const server = setupServer(
    rest.get('/problem', (req, res, ctx) => {
      return res(ctx.json({
        title: "Sub-array Matching",
        time: "3",
        userHandle: "User",
        categories: ["Array", "Stack", "Hash Table"]
      }))
    }),
  )

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('Displays Login Button', async () => {
    const loggedIn = false;
    const setLoggedIn = false;
    render(<AuthContext.Provider value = {{loggedIn, setLoggedIn}}>
      <App/>
    </AuthContext.Provider>);
    expect(screen.getByText('Login')).toBeInTheDocument();
  })
  test('Displays Logout Button', async () => {
    const loggedIn = true;
    const setLoggedIn = true;
    render(<AuthContext.Provider value = {{loggedIn, setLoggedIn}}>
      <App/>
    </AuthContext.Provider>);
    expect(screen.getByText('Logout')).toBeInTheDocument();
  })

  test('Login opens Dialog', async() => {
    const loggedIn = false;
    const setLoggedIn = false;
    render(<AuthContext.Provider value = {{loggedIn, setLoggedIn}}>
      <App/>
    </AuthContext.Provider>)

    const loginButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(loginButton)
    expect(await screen.getByText('Password')).toBeInTheDocument();
  })

  test('Logout Appears + removes Button', async() => {
    const loggedIn = true;
    render(<AuthContext.Provider value = {{loggedIn}}>
      <App/>
    </AuthContext.Provider>)

    const logoutButton = screen.getByRole("button", { name: /logout/i });
    fireEvent.click(logoutButton)
    expect(logoutButton).toBeNull();
    await waitForElement(() => getByText('Password'));
  })
  
  