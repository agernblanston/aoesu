// hooks/useActionManager.ts
import { useState } from 'react';

interface Action {
  type: 'click' | 'keypress';
  x?: number;
  y?: number;
  key?: string;
}

const useActionManager = (requiredActions: Action[]) => {
  const [currentActions, setCurrentActions] = useState<Action[]>([]);
  const [isActionMissed, setIsActionMissed] = useState(false);

  const performAction = (action: Action) => {
    const currentRequiredAction = requiredActions[currentActions.length];

    // Check if the performed action is the same as the required action
    let isValid = action.type === currentRequiredAction.type;

    if (isValid && action.type === 'click') {
      // Check if the click is near the x, y coordinates (within a threshold)
      const threshold = 10; // Threshold for the click area
      isValid =
        isValid &&
        Math.abs(action.x! - currentRequiredAction.x!) <= threshold &&
        Math.abs(action.y! - currentRequiredAction.y!) <= threshold;
    }

    if (isValid && action.type === 'keypress') {
      // Check if the key pressed is the required one
      isValid = isValid && action.key === currentRequiredAction.key;
    }

    if (isValid) {
      // Add the performed action to the currentActions
      setCurrentActions((prev) => [...prev, action]);
      setIsActionMissed(false);
    } else {
      // Set the flag for a missed action
      setIsActionMissed(true);
    }

    return isValid;
  };

  return { currentActions, performAction, isActionMissed };
};

export default useActionManager;
