import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <img
          src="img-1.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2>About WorldWise</h2>
          <p>
            The company itself is a very successful company. It was said to him
            that the fault when he asked the wise architect that it was not
            resolved, that there was no trouble, that he should please you, that
            you see the laborious but fleeting flight?
          </p>
          <p>
            Hello,its very difficult to get rid of the fat. of the body free
            from pains, they are expedient with just reason, great, that is wise
            to follow the duties and.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Product;
