import { useState } from "react";
import { Button, Dialog, RadioButton } from "../../win95";
import styles from "./System.module.css";

type Choice = "shutdown" | "restart" | "dos" | "logoff";

const CHOICES: { id: Choice; label: string }[] = [
  { id: "shutdown", label: "Shut down the computer?" },
  { id: "restart", label: "Restart the computer?" },
  { id: "dos", label: "Restart the computer in MS-DOS mode?" },
  { id: "logoff", label: "Close all programs and log on as a different user?" },
];

interface ShutDownProps {
  onCancel: () => void;
  /** Close every window (the log-off choice). */
  onLogOff: () => void;
}

/**
 * Start › Shut Down: the screen dims behind the Shut Down Windows dialog. Shutting
 * down ends on the black "safe to turn off" screen (a click boots back up);
 * restarting reloads the page; logging off closes every window.
 */
export default function ShutDown({ onCancel, onLogOff }: ShutDownProps) {
  const [choice, setChoice] = useState<Choice>("shutdown");
  const [off, setOff] = useState(false);

  if (off) {
    return (
      <div className={styles.safe} onClick={() => window.location.reload()} role="presentation">
        It's now safe to turn off
        <br />
        your computer.
      </div>
    );
  }

  function confirm() {
    if (choice === "shutdown") setOff(true);
    else if (choice === "logoff") onLogOff();
    else window.location.reload();
  }

  return (
    <Dialog title="Shut Down Windows" dimScreen onClose={onCancel} onSubmit={confirm}>
      <div className={styles.shutDown}>
        <img src="/img/win95/shutdown-32.png" alt="" width={32} height={32} />
        <div className={styles.shutDownBody}>
          <p className={styles.prompt}>Are you sure you want to:</p>
          <div className={styles.options}>
            {CHOICES.map((c) => (
              <RadioButton
                key={c.id}
                name="shutdown"
                checked={choice === c.id}
                onChange={() => setChoice(c.id)}
              >
                {c.label}
              </RadioButton>
            ))}
          </div>
          <div className={styles.buttons}>
            <Button type="submit" isDefault>
              Yes
            </Button>
            <Button onClick={onCancel}>No</Button>
            <Button disabled>Help</Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
