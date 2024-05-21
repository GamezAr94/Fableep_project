import styles from "./pricingTable.module.css";

export default function PricingTable() {
    return (
        <div className={styles.pricing_table}>
            <div className={styles.tier}>
                <h3>Free (1 month trial)</h3>
                <ul>
                    <li>Feature 1</li>
                    <li>Feature 2</li>
                </ul>
                <button>Try Free</button>
            </div>

            <div className={styles.tier}>
                <h3>Basic</h3>
                <p>$XX/month</p>
                <ul>
                    <li>All Free Features</li>
                    <li>Feature 3</li>
                    <li>Feature 4</li>
                </ul>
                <button>Get Started</button>
            </div>

            <div className={styles.tier}>
                <h3>Advanced</h3>
                <p>$XX/month</p>
                <ul>
                    <li>All Basic Features</li>
                    <li>Feature 5</li>
                    <li>Feature 6</li>
                </ul>
                <button>Get Started</button>
            </div>
        </div>
    );
}
