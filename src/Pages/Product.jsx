import PageNav from '../components/PageNav'
import styles from './Product.module.css'

const Product = () => {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <img src="img-1.jpg" alt="" />
        <div>
          <h2>About Places Visited.</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo est
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo est
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo est
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo est
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo est
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo est
          </p>
        </div>
      </section>
    </main>
  )
}
export default Product
