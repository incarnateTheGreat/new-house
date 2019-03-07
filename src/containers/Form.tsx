import React, { useEffect, useState } from "react";

const initialFormState = {
  condoSalePrice: 670000,
  housePurchasePrice: 900000,
  landTransferTax: 0,
  lawyerFees: 1000,
  realtorFeePercentage: 2.5,
  remainingMortgage: 193370.96,
  savings: 0
};

const initialResultState = {
  downPayment: 0
};

const formatter = new Intl.NumberFormat("en-US", {
  currency: "USD",
  style: "currency"
});

const Form = () => {
  const handleInputChange = event => {
    const { name, value } = event.target;
    let inputValue: any = "";

    // Parse to Float with no commas and rounded to two decimals.
    if (value.length > 0) {
      inputValue = parseFloat(value.replace(",", ""));
      inputValue = Math.round(inputValue * 100) / 100;
    }

    setForm({ ...form, [name]: inputValue });
  };

  const calcLTT = () => {
    const landTransferTax =
      form.housePurchasePrice === 0
        ? 0
        : (275 + 1950 + 2250 + (form.housePurchasePrice - 400000) * 0.02) * 2;

    setForm({ ...form, landTransferTax });
  };

  const calcCondoSalePrice = () => {
    const {
      condoSalePrice,
      landTransferTax,
      lawyerFees,
      realtorFeePercentage,
      remainingMortgage
    } = form;

    return Math.floor(
      condoSalePrice / (1 + realtorFeePercentage / 100) -
        remainingMortgage -
        lawyerFees -
        landTransferTax -
        savings
    );
  };

  // Set States
  const [form, setForm] = useState(initialFormState);
  const [result, setResult] = useState(initialResultState);

  const {
    condoSalePrice,
    housePurchasePrice,
    landTransferTax,
    lawyerFees,
    realtorFeePercentage,
    remainingMortgage,
    savings
  } = form;

  const { downPayment } = result;

  // Only Calculate LLT when the House Purchase Price has been updated.
  useEffect(() => {
    calcLTT();
  }, [form.housePurchasePrice]);

  // Update the Down Payment calculation based on updates to the Form State variables.
  useEffect(() => {
    const downPayment = calcCondoSalePrice();

    setResult({ ...result, downPayment });
  }, [
    condoSalePrice,
    housePurchasePrice,
    landTransferTax,
    lawyerFees,
    realtorFeePercentage,
    remainingMortgage,
    savings
  ]);

  console.log(form);

  return (
    <section className="form-section">
      <form className="form">
        <div className="form_fields">
          <span className="form_fields_container">
            <label className="form_fields_container_label">
              Condo Sale Price
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              pattern="\d+"
              name="condoSalePrice"
              value={condoSalePrice}
              onChange={handleInputChange}
            />
          </span>
          <span className="form_fields_container">
            <label className="form_fields_container_label">
              Realtor Fee (%)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              pattern="\d+"
              name="realtorFeePercentage"
              value={realtorFeePercentage}
              onChange={handleInputChange}
            />
          </span>
          <span className="form_fields_container">
            <label className="form_fields_container_label">
              Remaining Mortgage
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              pattern="\d+"
              name="remainingMortgage"
              value={remainingMortgage}
              onChange={handleInputChange}
            />
          </span>
          <span className="form_fields_container">
            <label className="form_fields_container_label">Lawyer Fees</label>
            <input
              type="number"
              min="0"
              step="0.01"
              pattern="\d+"
              name="lawyerFees"
              value={lawyerFees}
              onChange={handleInputChange}
            />
          </span>
          <span className="form_fields_container">
            <label className="form_fields_container_label">
              Planned Savings
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              pattern="\d+"
              name="savings"
              value={savings}
              onChange={handleInputChange}
            />
          </span>
          <span className="form_fields_container">
            <label className="form_fields_container_label">
              Land Transfer Tax
            </label>
            <span>{formatter.format(landTransferTax)}</span>
          </span>
        </div>
        <div className="form_fields">
          <span className="form_fields_container">
            <label className="form_fields_container_label">
              House Purchase Price
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              pattern="\d+"
              name="housePurchasePrice"
              value={housePurchasePrice}
              onChange={handleInputChange}
            />
          </span>
        </div>
      </form>
      <section className="results">
        <div>
          <span className="results_label">Down Payment</span>
        </div>
        <div>
          <span className="results_result">
            {formatter.format(downPayment)}
          </span>
        </div>
      </section>
    </section>
  );
};

export default Form;
