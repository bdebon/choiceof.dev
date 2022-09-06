// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import NxWelcome from './nx-welcome';
import CardChoice from "../../../../libs/shared/ui/src/lib/card-choice/card-choice";

export function App() {
  return (
    <>
      <NxWelcome title="devchoices" />
      <CardChoice title="test" img_url="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" />
      <div />
    </>
  );
}

export default App;
