// Uses the same styles as Product
import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

const Product = () => {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <div>
          <h2>
            Simple pricing.
            <br />
            $100 annually
          </h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </p>
        </div>
        <img src="img-2.jpg" alt="" />
      </section>
    </main>
  );
}

export default Product;