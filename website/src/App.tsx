import { ContextProvider } from './hooks/ContextProvider';
import { DefaultLayout } from './pages/layout/DefaultLayout';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/app.css';
import './styles/components.css'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function App() {
  const queryClinet = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: 1,
        staleTime: 5 * 60 * 1000,

      }
    }
  })


  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClinet}>
        <ContextProvider>
          <DefaultLayout />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
            theme="light"
          />
          <ReactQueryDevtools buttonPosition='bottom-left' />
        </ContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}