import Head from 'next/head'
export default function Account({ query }) {
  React.useEffect(() => {
    // Call the Github API route to fetch user data
  }, [])
  return (
    <div>
      <Head>
        <title>Account</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Add logout button */}
      <main>
        <h1>Authenticated Account Page</h1>
        <section >
              <h2>Basic User Information</h2>
              <small>Since we know it's you.. here's your information!</small>
              {/* Display user information */}
        </section>
        <section>
          <h2>Github OAuth</h2>
          <small>Authorize this application to acces your Github information.</small>
          {/* Add Github component */}
        </section>
      </main>
      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo"/>
        </a>
      </footer>
    </div>
  )
}