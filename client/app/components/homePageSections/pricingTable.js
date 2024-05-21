"use client";
import styles from "./pricingTable.module.css";
import { useState } from "react";

export default function PricingTable() {
    const [isYearly, setIsYearly] = useState(false);

    const togglePricing = () => {
        setIsYearly(!isYearly);
    };

    const monthlyPrices = {
        basic: 20,
        intermediate: 30,
        advanced: 50,
    };

    const yearlyPrices = {
        basic: 200, // Example: Discounted annual price
        intermediate: 300,
        advanced: 500,
    };

    return (
        <div className={styles.pricing_table}>
            <div className={styles.header}>
                <h4>The Right plan for your family</h4>
                <p>Choose the plan that works best for you and your family.</p>
                <button className={styles.price_type} onClick={togglePricing}>
                    {isYearly ? "Show Monthly Pricing" : "Show Yearly Pricing"}
                </button>
            </div>

            {/* Rest of the pricing table structure */}
            <div className={styles.prices_container}>
                <div className={styles.tier}>
                    <h3>Basic</h3>
                    <p>
                        ${isYearly ? yearlyPrices.basic : monthlyPrices.basic}/
                        {isYearly ? "year" : "month"}
                    </p>
                    {/* ... (features list) */}
                </div>
                <div className={styles.tier}>
                    <h3>Intermediate</h3>
                    <p>
                        $
                        {isYearly
                            ? yearlyPrices.intermediate
                            : monthlyPrices.intermediate}
                        /{isYearly ? "year" : "month"}
                    </p>
                    {/* ... (features list) */}
                </div>
                <div className={styles.tier}>
                    <h3>Advanced</h3>
                    <p>
                        $
                        {isYearly
                            ? yearlyPrices.advanced
                            : monthlyPrices.advanced}
                        /{isYearly ? "year" : "month"}
                    </p>
                    {/* ... (features list) */}
                </div>
            </div>
        </div>
    );
}
