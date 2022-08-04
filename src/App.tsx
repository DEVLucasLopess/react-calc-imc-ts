import styles from './App.module.css';
import { useState } from 'react';
import poweredImage from './assets/powered.png';
import { levels, calculateImc, Level} from './helpers/imc';
import { GridItem } from './components/GridItem';
import leftArrowImage from './assets/leftarrow.png';

function App() {
  const [heigtField, setHeigtField] = useState(0);
  const [weightField, setWeightField] = useState(0);
  const [toShow, setToShow ] = useState<Level | null>(null);

  const handleCalculateButton = () => {
    if (heigtField && weightField) {
      setToShow(calculateImc(heigtField, weightField))
    } else {
      alert("Você não informou os dados corretamente!");
    }
  }

  const handleBackButton = () => {
    setToShow(null);
    setHeigtField(0);
    setWeightField(0);
  }

  return (
    <div className={styles.main}>
        <header>
          <div className={styles.headerContainer}>
            <img src={poweredImage} alt="" width={150}/>
          </div>
        </header>
        <div className={styles.container}>
          <div className={styles.leftSide}>
            <h1>Calculando seu IMC.</h1>
            <p>IMC é a sigla para Ídice de Massa Corpórea, parâmetro adotado pela Organização Mundial de Saúde para calcular o peso ideal de cada pessoa.</p>

            <input
              type="number"
              placeholder="Informe sua altura. Ex: 1.5 (em metros)"
              value={heigtField > 0 ? heigtField : ''}
              onChange={e => setHeigtField(parseFloat(e.target.value))}
              disabled={toShow ? true : false}
            />

            <input
              type="number"
              placeholder="Informe seu peso. Ex: 75.4 kg (em kg)"
              value={weightField > 0 ? weightField : ''}
              onChange={e => setWeightField(parseFloat(e.target.value))}
              disabled={toShow ? true : false}
            />

            <button disabled={toShow ? true : false} onClick={handleCalculateButton}>Calcular</button>
          </div>
          <div className={styles.rightSide}>
            {!toShow &&
              <div className={styles.grid}>
                {levels.map((item, key) => (
                  <GridItem key={key} item={item} />
                ))}
              </div>
            }
            {toShow &&
              <div className={styles.rightBig}>
                <div className={styles.rightArrow} onClick={handleBackButton}>
                  <img src={leftArrowImage} alt="" width={25} />
                </div>
                <GridItem item={toShow}/>
              </div>
            }
          </div>
        </div>
    </div>
  );
}

export default App;
