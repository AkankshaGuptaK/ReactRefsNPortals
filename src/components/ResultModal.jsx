import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(function ResultModal(
  { targetTime, remainingTime, handleReset },
  dialogRef
) {
  const dialog = useRef();

  useImperativeHandle(dialogRef, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  const userLost = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - (remainingTime / targetTime) * 1000) * 100);

  return createPortal(
    <dialog ref={dialog} className="result-modal" onClose={handleReset}>
      {userLost && <h2>You lost</h2>}
      {!userLost && <h2>Your score: {score}</h2>}
      <p>
        The target time was <strong>{targetTime} seconds </strong>
      </p>
      <p>
        You stopped the timer with{" "}
        <strong> {formattedRemainingTime} seconds left</strong>
      </p>
      <form method="dialog" onSubmit={handleReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById('modal')
  );
});

export default ResultModal;
