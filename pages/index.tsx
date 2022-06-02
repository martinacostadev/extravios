import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Extravíos</title>
        <meta name="description" content="Extravíos de objetos, documentación o llaves" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Extravíos
        </h1>

        <p className={styles.description}>
          Publicá si extraviaste o encontraste algo
        </p>

        <div className={styles.grid}>

        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://twitter.com/martinacostadev"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made by{' '}
          <span className={styles.logo}>
            @martinacostadev
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
