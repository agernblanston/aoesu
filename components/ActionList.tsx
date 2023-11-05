// components/ActionList.tsx
'use client'
import React from 'react';

export type Coord = [number, number];
export type Entity = string;
export type Hotkey = string;
export type InputId = string;
interface Rect {
    lo: Coord;
    hi: Coord;
}
interface Loop {
    coords: Coord[];
}
interface Polygon {
    loops: Loop[];
}
interface ClickInput {
    type: 'click';
    target: Entity;
}
interface DragSelectInput {
    type: 'dragSelect';
    targets: Entity[];
}
interface HotkeyInput {
    type: 'hotkey';
    ctrl?: boolean; //default false;
    shift?: boolean; //default false;
    alt?: boolean; //default false;
    cmd?: boolean; //default false;
    sequence: Hotkey[]; // eg. `q` then `q` for build house
}
interface TimestampCondition {
  rel: 'after'|'before';
  timeMs: number;
}
interface AfterInputCondition {
    otherId: InputId;
}

type Condition = TimestampCondition | AfterInputCondition;

export interface RequiredInput {
  id?: InputId; // Only used for AfterInputCondition
  conditions: Condition;
  input: ClickInput | DragSelectInput | HotkeyInput;
}
export interface Action {
  
  description: string;
}

interface ActionListProps {
  actions: Action[];
  currentActionIndex: number;
}

const ActionList: React.FC<ActionListProps> = ({ actions, currentActionIndex }) => {
  return (
    <ul>
      {actions.map((action, index) => (
        <li key={index} style={{ fontWeight: index === currentActionIndex ? 'bold' : 'normal' }}>
          {action.description}
        </li>
      ))}
    </ul>
  );
};

export default ActionList;
