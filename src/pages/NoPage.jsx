import { Link } from 'react-router-dom'

const NoPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="sp-text text-4xl font-bold">Page not found</h1>
      <p className="max-w-md text-gray-400">
        The page you are looking for does not exist. Return to the generator to keep building.
      </p>
      <Link
        to="/"
        className="rounded-lg bg-purple-600 px-5 py-3 font-semibold text-white transition hover:bg-purple-500"
      >
        Back to generator
      </Link>
    </main>
  )
}

export default NoPage
