// import dependencies
import React, {useState} from 'react'
import App from './App'
import AuthContext from './components/AuthContext';

// import API mocking utilities from Mock Service Worker
import {rest} from 'msw'
import {setupServer} from 'msw/node'

// import react-testing methods
import {render, fireEvent, waitFor, screen} from '@testing-library/react'

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom'
// the component to test
import Problems from './components/Problems'

const server = setupServer(
    rest.get('/problems', (req, res, ctx) => {
      return res(ctx.json({
        problemId: '4450934',
        title: 'Sub Array Sum',
        userHandle: 'Leela',
        category: ['Array', 'Stack'],
        createdAt: '1636725188109'
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
  
  /*test('handles server error', async () => {
    server.use(
      rest.get('/greeting', (req, res, ctx) => {
        return res(ctx.status(500))
      }),
    )
  
    render(<Fetch url="/greeting" />)
  
    fireEvent.click(screen.getByText('Load Greeting'))
  
    await waitFor(() => screen.getByRole('alert'))
  
    expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to fetch!')
    expect(screen.getByRole('button')).not.toBeDisabled()
  })*/