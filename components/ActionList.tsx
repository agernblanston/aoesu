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
    coord: Coord;
    // target: Entity;
}
interface DragSelectInput {
    type: 'drag';
    box: Rect;
    // targets: Entity[];
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
    rel: 'after' | 'before';
    timeMs: number;
}
interface AfterInputCondition {
    otherId: InputId;
}

type Condition = TimestampCondition | AfterInputCondition;

export type RequiredInput = {
    id?: InputId; // Only used for AfterInputCondition
    afterMs?: number;
    //   conditions: Condition;

} & (ClickInput | DragSelectInput | HotkeyInput);
// export interface RequiredInput {
//   id?: InputId; // Only used for AfterInputCondition
// //   conditions: Condition;
//   input: ClickInput | DragSelectInput | HotkeyInput;
// }
export interface Action {

    description: string;
}

interface ActionListProps {
    actions: Action[];
    currentActionIndex: number;
}

export const requiredInputs: RequiredInput[] = [
    { id: "select vils", type: "drag", box: { lo: [.394, .552], hi: [.416, .598] }, afterMs: .494351 },
    { id: "build palisade", type: "hotkey", sequence: ['w', 's']},
    { id: "build palisade", type: "click", coord: [.429, .607] },
    { id: "attack militia", type: "click", coord: [.402, .607] },
    { id: "select vils", type: "drag", box: { lo: [.457, .465], hi: [.503, .548] } },
    { id: "attack scout", type: "click", coord: [.449, .643] },
    { id: "done.", type: "hotkey", sequence: ['1']},
];

// mousedown,0.4160346695557963,0.5521849042975804,0.494351
// mouseup,0.39436619718309857,0.5984109786926688,0.627177
// mousedown,0.42903575297941493,0.6070783676417479,0.759978
// mouseup,0.42903575297941493,0.6070783676417479,0.774481
// mousedown,0.40249187432286027,0.6070783676417479,1.507175
// mouseup,0.40249187432286027,0.6080414108583123,1.517543

// mousedown,0.5037919826652221,0.4645479715902251,1.892572
// mouseup,0.45666305525460454,0.548332731431323,2.024678
// mousedown,0.4485373781148429,0.6427109666546287,2.144815
// mouseup,0.4485373781148429,0.6427109666546287,2.158667
// mousedown,0.46153846153846156,0.4847718791380763,3.404569
// mouseup,0.41007583965330446,0.5560370771638377,3.526157
// mousedown,0.4550379198266522,0.6378957505718069,3.696637
// mouseup,0.4550379198266522,0.6378957505718069,3.70973
// mousedown,0.4209100758396533,0.5772240279282532,4.125295
// mouseup,0.40249187432286027,0.6167087998073914,4.199603
// mousedown,0.37378114842903576,0.6590827013362225,4.386117
// mouseup,0.37378114842903576,0.6590827013362225,4.402137
// mousedown,0.699349945828819,0.8969543758276153,4.822492
// mouseup,0.699349945828819,0.8969543758276153,4.830575
// mousedown,0.3808234019501625,0.6109305405080052,5.615205
// mouseup,0.3808234019501625,0.6109305405080052,5.628697
// mousedown,0.43499458288190684,0.6350066209221139,6.705775
// mouseup,0.4171180931744312,0.6677500902853015,6.777026
// mousedown,0.42741061755146265,0.6215240158902131,6.854616
// mouseup,0.42741061755146265,0.6215240158902131,6.86838
// mousedown,0.4712892741061755,0.6003370651257975,7.081899
// mouseup,0.43932827735644636,0.6533044420368364,7.20088
// mousedown,0.43499458288190684,0.6456000963043216,7.320707
// mouseup,0.43499458288190684,0.6456000963043216,7.331167
// mousedown,0.4014084507042254,0.6234501023233417,7.597613
// mouseup,0.3851570964247021,0.6610087877693511,7.668039
// mousedown,0.4057421451787649,0.6552305284699651,7.771022
// mouseup,0.4057421451787649,0.6552305284699651,7.786158
// mousedown,0.3494041170097508,0.6417479234380643,8.050796
// mouseup,0.3494041170097508,0.6417479234380643,8.0644
// mousedown,0.3781148429035753,0.6494522691705791,8.663071
// mouseup,0.3781148429035753,0.6494522691705791,8.68009
// mousedown,0.4268689057421452,0.6841218249668954,8.852909
// mouseup,0.41007583965330446,0.7149392078969543,8.911393
// mousedown,0.42524377031419286,0.6533044420368364,9.008455
// mouseup,0.42524377031419286,0.6533044420368364,9.018952
// mousedown,0.4712892741061755,0.6118935837245696,9.329019
// mouseup,0.447453954496208,0.6552305284699651,9.41974
// mousedown,0.43499458288190684,0.6581196581196581,9.481574
// mouseup,0.43499458288190684,0.6581196581196581,9.490899

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
