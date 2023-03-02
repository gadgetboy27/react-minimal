import { useRouter } from 'next/router';
import styles from '../styles/Toolbar.module.css';
// import { SiFacebook, SiInstagram, SlHome } from 'react-icons/si'

export const Toolbar = () => {
    const router = useRouter();

    return (
        <div className= {styles.main}>
          <div>
            <h2 className={styles.title}>
              DANIELLE DYER - Photographer</h2>
        
            <ul className={styles.ul}>
                <li className={styles.li}>FACEBOOK</li>
                <li className={styles.li}>INSTAGRAM</li>
                <li className={styles.li}>TWITTER</li>
            </ul>
          </div>
            
        </div>
    )
}