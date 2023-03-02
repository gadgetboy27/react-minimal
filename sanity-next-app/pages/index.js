import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useState, useEffect } from 'react'
import  imageUrlBuilder from '@sanity/image-url'
import { Toolbar } from '../components/toolbar'
import { useRouter } from 'next/router'


export default function Home({ posts }) {
  const router = useRouter();
  console.log([posts])
  const [mappedPosts, setMappedPosts] = useState([]);

  useEffect(() => {
    if (posts.length) {
      const imgBuilder = imageUrlBuilder({
        projectId: 'fcvw42nl',
        dataset: 'production',
      });
      setMappedPosts(
        posts.map(p => {
          return {
            ...p,
            mainImage: imgBuilder.image(p.mainImage),
          }
        })
      );
    }else {
      setMappedPosts([]);
    }
  }, [posts]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toolbar />
      <main className={styles.main}>
        <div className={styles.center}>
            <h1 className={styles.title}>dannii dyer</h1>
        </div>
        <div className={styles.center}>
            <h1 className={styles.title}>Recent Posts...</h1>
        </div>
          <div className={styles.container_all}>
            {mappedPosts.length ? mappedPosts.map((p, index) => (
              <div className={styles.container}>
              <div onClick={() => router.push(`/post/${p.slug.current}`)}>
                <div key={index} className={styles.img}>
                  <img src={p.mainImage}
                    alt=""
                    width={420}
                    height={340} />
                  <span className={styles.title}>{p.title}</span>
                  <span className={styles.feed}>{}</span>
                </div>
               </div>
              </div>
            )) : <>No Posts Yet</>}
          </div>
      </main>
    </>
  )
}

export const getServerSideProps = async pageContext => {
  const query = encodeURIComponent(`*[ _type == "post"]`);
  const url = `https://fcvw42nl.api.sanity.io/v1/data/query/production?query=${query}`;
  
  const result = await fetch(url)
  .then(res => res.json());

  if (!result.result || !result.result.length) {
      return {
          props: {
            posts: [],
          }
      }
  }else {
      return {
          props: {
            posts: result.result,
          }
      }
  }
};
