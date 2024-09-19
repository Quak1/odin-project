import PropTypes from "prop-types";

import MinusIcon from "./icons/MinusIcon";
import PlusIcon from "./icons/PlusIcon";

import styles from "./styles/NumberInput.module.css";

const NumberInput = ({ id, value, setValue, min, max }) => {
  return (
    <div className={styles.container}>
      <button onClick={() => setValue(value - 1)} disabled={value <= min}>
        <MinusIcon />
      </button>
      <input
        className={styles.input}
        id={id}
        type="number"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        min={min}
        max={max}
      />
      <button onClick={() => setValue(value + 1)} disabled={value >= max}>
        <PlusIcon />
      </button>
    </div>
  );
};

NumberInput.propTypes = {
  id: PropTypes.string,
  value: PropTypes.number.isRequired,
  setValue: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
};

export default NumberInput;
