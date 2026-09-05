import { Link } from 'react-router'
import styles from './NotFound.module.css'
import { Button } from '../../components/ui/Button'

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.errorCode}>404</div>
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.desc}>
          The page you are looking for might have been moved or is temporarily unavailable. Explore our laptop inventory
          in Raipur or return to the home page.
        </p>
        <div className={styles.actions}>
          <Link to="/">
            <Button variant="primary" size="lg">
              Back to Home
            </Button>
          </Link>
          <Link to="/laptops">
            <Button variant="outline" size="lg">
              Browse All Laptops
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
