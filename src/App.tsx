import { Suspense, useState } from 'react';
import style from './App.module.scss';
import Card from './components/Card';
import Formulario from './components/Formulario';
import Calendario from './components/Calendario';
import ListaDeEventos from './components/ListaDeEventos';
import { RecoilRoot } from 'recoil';
import DebugObserver from './components/DebugObserver';

function App() {
  const [filtro, setFiltro] = useState<Date | null>()

  const aplicarFiltro = (data: Date | null) => {
    setFiltro(data)
  }

  return (
    <RecoilRoot>
      <DebugObserver />
      <Suspense fallback='Está carregando.'>
        <div className={style.App}>
          <div className={style.Coluna}>
            <Card>
              <Formulario />
            </Card>
            <hr />
            <Card>
              <ListaDeEventos />
            </Card>
          </div>
          <div className={style.Coluna}>
            <Calendario />
          </div>
        </div>
      </Suspense>
    </RecoilRoot>
  );
}

export default App;
