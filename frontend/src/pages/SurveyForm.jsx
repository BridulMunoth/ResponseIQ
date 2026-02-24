import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Star,
  ChevronLeft,
  CheckCircle,
  AlertCircle,
  Loader,
} from "lucide-react";
import api from "../services/api";

/* ───── Reusable sub-components ───── */

const RadioGroup = ({ label, name, options, value, onChange, required }) => (
  <div className="sf-field">
    <p className="sf-label">
      {label} {required && <span className="sf-required">*</span>}
    </p>
    <div className="sf-radio-group">
      {options.map((opt) => (
        <label
          key={opt}
          className={`sf-radio-option ${value === opt ? "sf-radio-selected" : ""}`}
        >
          <input
            type="radio"
            name={name}
            value={opt}
            checked={value === opt}
            onChange={() => onChange(name, opt)}
            className="sf-radio-input"
          />
          <span className="sf-radio-dot" />
          <span className="sf-radio-text">{opt}</span>
        </label>
      ))}
    </div>
  </div>
);

const StarRating = ({ label, name, value, onChange, required }) => (
  <div className="sf-field">
    <p className="sf-label">
      {label} {required && <span className="sf-required">*</span>}
    </p>
    <div className="sf-stars">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          className={`sf-star-btn ${n <= value ? "sf-star-active" : ""}`}
          onClick={() => onChange(name, n)}
          aria-label={`${n} star`}
        >
          <Star
            size={28}
            fill={n <= value ? "#f59e0b" : "none"}
            color={n <= value ? "#f59e0b" : "#cbd5e1"}
          />
        </button>
      ))}
      <span className="sf-star-label">
        {value ? `${value}/5` : "Tap to rate"}
      </span>
    </div>
  </div>
);

/* ───── Main Survey Form ───── */

const INITIAL = {
  name: "",
  age: "",
  gender: "",
  occupationType: "",
  orderMethod: "",
  stockFrequency: "",
  operationalFactor: "",
  vehicleType: "",
  associationDuration: "",
  invoiceAccuracy: "",
  reverseLogisticsSmooth: "",
  appEaseOfUse: "",
  productFreshnessRating: 0,
  professionalismRating: 0,
  packagingQualityRating: 0,
  deliveryLeadTimeSatisfaction: "",
  stockAvailabilitySatisfaction: "",
  overallSatisfaction: "",
  suggestion: "",
};

const SurveyForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const set = (name, val) => setForm((f) => ({ ...f, [name]: val }));

  const handleInput = (e) => set(e.target.name, e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    const required = [
      "name",
      "age",
      "gender",
      "occupationType",
      "orderMethod",
      "stockFrequency",
      "operationalFactor",
      "vehicleType",
      "associationDuration",
      "invoiceAccuracy",
      "reverseLogisticsSmooth",
      "appEaseOfUse",
      "deliveryLeadTimeSatisfaction",
      "stockAvailabilitySatisfaction",
      "overallSatisfaction",
    ];
    for (const key of required) {
      if (!form[key]) {
        setError("Please fill in all required fields before submitting.");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
    }
    if (
      !form.productFreshnessRating ||
      !form.professionalismRating ||
      !form.packagingQualityRating
    ) {
      setError("Please provide all star ratings before submitting.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setLoading(true);
    try {
      await api.post("/survey", {
        ...form,
        age: Number(form.age),
        productFreshnessRating: Number(form.productFreshnessRating),
        professionalismRating: Number(form.professionalismRating),
        packagingQualityRating: Number(form.packagingQualityRating),
      });
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(
        err.response?.data?.message || "Submission failed. Please try again.",
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="sf-success-page">
        <div className="sf-success-card">
          <div className="sf-success-icon">
            <CheckCircle size={56} color="#10b981" />
          </div>
          <h2>Thank you! 🎉</h2>
          <p>
            Your survey response has been recorded successfully. Your feedback
            helps Foodsta improve its operations.
          </p>
          <button
            className="sf-back-btn"
            onClick={() => navigate("/customer-dashboard")}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="sf-page">
      {/* Top nav */}
      <header className="sf-nav">
        <button
          className="sf-nav-back"
          onClick={() => navigate("/customer-dashboard")}
        >
          <ChevronLeft size={18} /> Back to Dashboard
        </button>
        <img
          src="/logo.png"
          alt="ResponseIQ"
          className="sf-nav-logo"
          draggable="false"
        />
      </header>

      <div className="sf-wrapper">
        {/* Survey header */}
        <div className="sf-title-card">
          <h1 className="sf-title">
            A Study on Operations Management at Foodsta Supply Chain Pvt Ltd,
            Hubballi
          </h1>
          <p className="sf-desc">
            This academic survey evaluates the service quality and supply chain
            efficiency of Foodsta. Your responses will help improve service and
            product quality.
          </p>
        </div>

        {error && (
          <div className="sf-error">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* ── Section 1 ── */}
          <div className="sf-section">
            <div className="sf-section-header">
              <span className="sf-section-num">1</span>
              <h2>Basic Details</h2>
            </div>

            {/* Name */}
            <div className="sf-field">
              <label className="sf-label" htmlFor="name">
                Name <span className="sf-required">*</span>
              </label>
              <input
                id="name"
                type="text"
                name="name"
                className="sf-input"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleInput}
              />
            </div>

            {/* Age */}
            <div className="sf-field">
              <label className="sf-label" htmlFor="age">
                Age <span className="sf-required">*</span>
              </label>
              <input
                id="age"
                type="number"
                name="age"
                className="sf-input sf-input--short"
                placeholder="e.g. 35"
                min="1"
                max="100"
                value={form.age}
                onChange={handleInput}
              />
            </div>

            <RadioGroup
              label="Gender"
              name="gender"
              options={["Male", "Female"]}
              value={form.gender}
              onChange={set}
              required
            />

            <RadioGroup
              label="Company / Type of Store"
              name="occupationType"
              options={[
                "Kirana Store",
                "Supermarket",
                "Wholesaler",
                "General Merchant",
              ]}
              value={form.occupationType}
              onChange={set}
              required
            />
          </div>

          {/* ── Section 2 ── */}
          <div className="sf-section">
            <div className="sf-section-header">
              <span className="sf-section-num">2</span>
              <h2>Core Survey</h2>
            </div>

            <RadioGroup
              label="How do you place orders with Foodsta?"
              name="orderMethod"
              options={["Mobile App", "Phone Call", "Salesperson Visit"]}
              value={form.orderMethod}
              onChange={set}
              required
            />

            <RadioGroup
              label="What is the frequency of your stock delivery?"
              name="stockFrequency"
              options={["Daily", "Twice a week", "Weekly"]}
              value={form.stockFrequency}
              onChange={set}
              required
            />

            <RadioGroup
              label="Which operational factor is most important to you?"
              name="operationalFactor"
              options={[
                "Delivery Speed",
                "Product Freshness (FIFO)",
                "Accurate Billing",
              ]}
              value={form.operationalFactor}
              onChange={set}
              required
            />

            <RadioGroup
              label="What type of vehicle usually delivers your stock?"
              name="vehicleType"
              options={[
                "Small Electric Van",
                "Tata Ace / Tempo",
                "Large Truck",
              ]}
              value={form.vehicleType}
              onChange={set}
              required
            />

            <RadioGroup
              label="How long have you been associated with Foodsta?"
              name="associationDuration"
              options={["0-6 Months", "6-12 Months", "More than 1 Year"]}
              value={form.associationDuration}
              onChange={set}
              required
            />

            <RadioGroup
              label="Do you receive an advance digital bill/invoice with every delivery?"
              name="invoiceAccuracy"
              options={["Yes", "No"]}
              value={form.invoiceAccuracy}
              onChange={set}
              required
            />

            <RadioGroup
              label="Is the invoice helping you track movement of items/goods prices correctly?"
              name="reverseLogisticsSmooth"
              options={["Yes", "No"]}
              value={form.reverseLogisticsSmooth}
              onChange={set}
              required
            />

            <RadioGroup
              label="Is the Foodsta order app easy to use for your daily needs?"
              name="appEaseOfUse"
              options={["Yes", "No"]}
              value={form.appEaseOfUse}
              onChange={set}
              required
            />
          </div>

          {/* ── Section 3: Ratings ── */}
          <div className="sf-section">
            <div className="sf-section-header">
              <span className="sf-section-num">3</span>
              <h2>Ratings</h2>
            </div>

            <StarRating
              label='Rate the "Product Freshness / FIFO Management" of Foodsta'
              name="productFreshnessRating"
              value={form.productFreshnessRating}
              onChange={set}
              required
            />

            <StarRating
              label='Rate the "Professionalism and Behaviour" of the delivery staff'
              name="professionalismRating"
              value={form.professionalismRating}
              onChange={set}
              required
            />

            <StarRating
              label='Rate the "Packaging Quality" of the delivered goods'
              name="packagingQualityRating"
              value={form.packagingQualityRating}
              onChange={set}
              required
            />
          </div>

          {/* ── Section 4: Satisfaction ── */}
          <div className="sf-section">
            <div className="sf-section-header">
              <span className="sf-section-num">4</span>
              <h2>Satisfaction</h2>
            </div>

            <RadioGroup
              label='Satisfaction level regarding "Delivery Lead Time" (Speed)'
              name="deliveryLeadTimeSatisfaction"
              options={["Highly Satisfied", "Satisfied", "Not Satisfied"]}
              value={form.deliveryLeadTimeSatisfaction}
              onChange={set}
              required
            />

            <RadioGroup
              label='Satisfaction level regarding "Stock Availability"'
              name="stockAvailabilitySatisfaction"
              options={["Highly Satisfied", "Satisfied", "Not Satisfied"]}
              value={form.stockAvailabilitySatisfaction}
              onChange={set}
              required
            />

            <RadioGroup
              label="Overall satisfaction with Foodsta's Operations Management"
              name="overallSatisfaction"
              options={["Highly Satisfied", "Satisfied", "Not Satisfied"]}
              value={form.overallSatisfaction}
              onChange={set}
              required
            />
          </div>

          {/* ── Section 5: Suggestion ── */}
          <div className="sf-section">
            <div className="sf-section-header">
              <span className="sf-section-num">5</span>
              <h2>Additional Feedback</h2>
            </div>

            <div className="sf-field">
              <label className="sf-label" htmlFor="suggestion">
                Any specific suggestions to improve Foodsta's service quality in
                Hubballi?
              </label>
              <textarea
                id="suggestion"
                name="suggestion"
                className="sf-textarea"
                placeholder="Share your thoughts here..."
                rows={4}
                value={form.suggestion}
                onChange={handleInput}
              />
            </div>
          </div>

          {/* Submit */}
          <div className="sf-submit-row">
            <button type="submit" className="sf-submit-btn" disabled={loading}>
              {loading ? (
                <>
                  <Loader
                    size={18}
                    style={{ animation: "spin 0.8s linear infinite" }}
                  />
                  Submitting...
                </>
              ) : (
                "Submit Survey"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SurveyForm;
